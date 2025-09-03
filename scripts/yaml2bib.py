#!/usr/bin/env python3
import yaml
import os

bibtex_entries = []

for filename in os.listdir('../attacks'):
    if filename.endswith('.yaml'):
        with open(f'../attacks/{filename}') as f:
            data = yaml.safe_load(f)

        bibtex = data.get('BibTex (Please add a bibtex entry for this paper to facilitate easy citations)')

        if bibtex and isinstance(bibtex, str):
            bibtex = bibtex.replace('\\n', '\n').replace('\\ ', ' ')
            bibtex_entries.append(bibtex.strip())
        else:
            print(f"Failed to parse bibtex entry for {filename}")

with open('../refs.bib', 'w') as f:
    f.write('\n\n'.join(bibtex_entries))

print(f"Created refs.bib with {len(bibtex_entries)} entries")
