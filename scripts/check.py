#!/usr/bin/env python3
from pathlib import Path
from sys import exit
from yaml import load, Loader, dump, scan
import re
from jsonschema import validate, Draft7Validator
import requests

root = Path(__file__).parent.parent
schema = load((root / "schemas/attacks-schema.yaml").open(), Loader=Loader)

known_bad_urls = []


def check_name(yaml_path: Path):
	errors = []
	if not re.fullmatch(r"[a-z0-9_]+\.yaml", yaml_path.name):
		errors.append(
			"File names should be lowercase letters, numbers, and underscores."
		)
	return errors


def check_schema(yaml_path: Path):
	instance = load(yaml_path.open(), Loader=Loader)
	validator = Draft7Validator(schema, format_checker=Draft7Validator.FORMAT_CHECKER)
	return [
		f'{".".join(error.path)}: {error.message}'
		for error in validator.iter_errors(instance)
	]


_checked_urls = set()

def _iter_values(node):
	if isinstance(node, dict):
		for value in node.values():
			yield from _iter_values(value)
	elif isinstance(node, list):
		for value in node:
			yield from _iter_values(value)
	else:
		yield node


def check_urls(yaml_path: Path):
	record = load(yaml_path.open(), Loader=Loader)
	texts = list(_iter_values(record))
	errors = []
	for text in texts:
		if not isinstance(text, str):
			continue
		urls = re.findall(r'https?://[^ \t\n,;)"\']+', text)
		for url in urls:
			if url in known_bad_urls or url in _checked_urls:
				continue
			try:
				request = requests.get(url, timeout=5)
				_checked_urls.add(url)
				if not request.ok:
					errors.append(f"HTTP {request.status_code} for {url}")
			except Exception as e:
				errors.append(f"Error for {url}: {e}")
	return errors


def check_quoting(yaml_path: Path):
	errors = []
	for token in scan(yaml_path.open(), Loader=Loader):
		if hasattr(token, "style"):
			style = token.style
			if style is None or style in ["|", '"', "'"]:
				continue
			errors.append(
				f'instead of "{style}", use "|" to preserve whitespace in "{getattr(token, "value", "")}"'
			)
	return errors


checks = {name for name in globals().keys() if name.startswith("check_")}


def check(yaml_path: Path, only=checks):
	detail_checks = [
		function
		for name, function in globals().items()
		if name.startswith("check_") and name in only
	]
	errors = {}
	for detail_check in detail_checks:
		name = detail_check.__name__.replace("_", " ")
		print(f"\t{name}...")
		error = detail_check(yaml_path)
		assert isinstance(error, list), f"Expected list, not {error}"
		if error:
			errors[name] = error
	return errors


if __name__ == "__main__":
	import argparse

	parser = argparse.ArgumentParser()
	parser.add_argument(
		"--yaml_paths",
		nargs="*",
		help="If empty, checks all attacks.",
		type=Path,
	)
	mutex = parser.add_mutually_exclusive_group()
	mutex.add_argument(
		"--skip",
		nargs="*",
		choices=checks,
		help="Checks to skip",
		default=[],
	)
	mutex.add_argument(
		"--only",
		nargs="*",
		choices=checks,
		help="Only do these checks",
		default=[],
	)
	args = parser.parse_args()
	yaml_paths = args.yaml_paths
	if not yaml_paths:
		yaml_paths = list(Path(__file__).parent.parent.glob("attacks/*.yaml"))
	if not yaml_paths:
		print("No files selected")
		exit(1)
	errors = {}
	for yaml_path in yaml_paths:
		print(f"Validating {yaml_path.name}...")
		error = check(yaml_path, only=args.only or (checks - set(args.skip)))
		assert isinstance(error, dict), f"Expected list, not {error}"
		if error:
			errors[yaml_path.name] = error
	if errors:
		print(dump(errors))
		exit(1)
	print("No errors!") 