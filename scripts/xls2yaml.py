#!/usr/bin/env python3
import argparse
from pathlib import Path

import pandas as pd
import yaml


def convert_xls_to_yaml(input_path: Path, output_dir: Path) -> None:
    df = pd.read_excel(input_path, header=3)
    output_dir.mkdir(parents=True, exist_ok=True)
    columns = list(df.columns)

    for idx, row in df.iterrows():

        record = {col: row[col] for col in columns}

        filename = str(record.get("id")) if "id" in df.columns else f"row_{idx + 1}"
        with (output_dir / f"{filename}.yaml").open("w", encoding="utf-8") as fh:
            yaml.safe_dump(
                record,
                fh,
                sort_keys=False,
                allow_unicode=True,
                default_flow_style=False,   # block style: one key per line
            )

    print(f"Wrote {len(df)} YAML files to {output_dir}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert a .xls/.xlsx spreadsheet to one YAML per row."
    )
    parser.add_argument("xls_path", type=Path, help="Path to the input .xls or .xlsx file")
    parser.add_argument("output_directory", type=Path, help="Directory that will receive the YAML files")
    args = parser.parse_args()

    convert_xls_to_yaml(args.xls_path, args.output_directory)


if __name__ == "__main__":
    main()
