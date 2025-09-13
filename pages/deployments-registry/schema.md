---
title: Schema
layout: docs
order: 5
---

Entries in the registry conform to a standard schema. The summary below may be slightly behind the latest version of the [JSON Schema](https://github.com/opendp/deployments-registry-data/blob/main/schemas/deployments-schema.yaml) and [data entry template](https://github.com/opendp/deployments-registry-data/blob/main/tests/good_deployments/template.yaml).

<style>
    #schema-table td {
        vertical-align: top;
    }
</style>
<table id="schema-table"></table>
<script>
const schema = {{ site.data.schemas.deployments-schema | jsonify }};
</script>
<script type="module" src="{{ '/assets/js/schema-table.js' | relative_url }}"></script>