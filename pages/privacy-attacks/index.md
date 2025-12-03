---
layout: main
title: Privacy Attacks Repository
icon: fa-table
order: 1
class: privacy-attacks
permalink: /privacy-attacks/
---

<div class="home-page privacy-attacks-page">
<div class="main-content" markdown="0">

{% assign attacks = site.data.attacks | default: site.data.privacy_attacks | default: site.data %}


<script>
</script>
<script type="module" src="{{ '/assets/js/download-tsv.js' | relative_url }}"></script>

<!-- Filters Section -->
<div class="filters-container">
    <div style="white-space: nowrap">
        <button>
            <a download="privacy-attacks.tsv" id="download-tsv">Download TSV</a>
        </button>
    </div>
    <div class="filter-row" style="justify-content: right">
        <div class="filter-group">
            <input type="text" id="search-filter" placeholder="Search">
        </div>
        <div class="filter-group">
            <button id="filters-button">Filters</button>
        </div>
        <div class="filter-actions">
            <button id="clear-filters" title="Clear all filters">Clear</button>
        </div>
    </div>
</div>

<div id="filters-dropdown" class="filters-container" style="display: none; margin-top: 0.5rem">
    <div class="filter-row">
        <div class="filter-group" id="datatype-filter-group">
            <select id="datatype-filter">
                <option value="">Data Type (Inputs)</option>
            </select>
        </div>
        <div class="filter-group" id="release-filter-group">
            <select id="release-filter">
                <option value="">Type of Data Release (Outputs)</option>
            </select>
        </div>
        <div class="filter-group" id="objective-filter-group">
            <select id="objective-filter">
                <option value="">Attacker Objectives</option>
            </select>
        </div>
        <div class="filter-group" id="researchtype-filter-group">
            <select id="researchtype-filter">
                <option value="">Research Type</option>
            </select>
        </div>
        <div class="filter-group" id="year-filter-group">
            <select id="year-filter">
                <option value="">Year</option>
            </select>
        </div>
    </div>
</div>

<div class="table-container">
<table id="attacks-table">
    <thead>
        <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Year</th>
            <th>Data Type (Inputs)</th>
            <th>Type of Data Release (Outputs)</th>
            <th>Attacker Objectives</th>
            <th>Research Type</th>
            <th>BibTeX</th>
            <th>Code</th>
            <th>Links</th>
            <th>Submitter</th>
        </tr>
    </thead>
    <tbody>
    {% for rec in attacks %}
        {% assign a = rec[1] | default: rec %}
        <tr class="attack-row" data-index="{{ forloop.index0 }}">
            <td data-label="Title" class="cell-title"><div style="color: #181818; font-weight: 500; margin-bottom: 4px">{{ a.Title }}</div></td>
            <td data-label="Authors" class="attack-authors">
                {% if a.Authors %}
                <div class="expandable-authors">{{ a.Authors }}</div>
                {% endif %}
            </td>
            <td data-label="Year" class="year-cell">{{ a["Publication Year"] }}</td>
            <td data-label="Data Type (Inputs)">{{ a["Data Type"] }}</td>
            <td data-label="Type of Data Release (Outputs)">{{ a["Type of Release"] }}</td>
            <td data-label="Attacker Objectives">{{ a["Threat Model --- Attacker Objective"] }}</td>
            <td data-label="Research Type">{{ a["Research Type"] }}</td>
            <td data-label="BibTeX" class="bibtex-cell">
                {% assign bibtex_raw = a["BibTex (Please add a bibtex entry for this paper to facilitate easy citations)"] %}
                {% capture bibtex_str %}{{ bibtex_raw }}{% endcapture %}
                {% assign bibtex_str_down = bibtex_str | downcase %}
                {% if bibtex_str and bibtex_str != '' and bibtex_str_down != 'nan' %}
                    <a href="data:text/plain;charset=utf-8,{{ bibtex_str | uri_escape }}" download="{{ a.Title | default: 'citation' | slugify }}.bib">Download</a>
                {% endif %}
            </td>
            <td data-label="Code" class="code-cell">
                {% assign code_raw = a["Code"] | default: a["Links to Artifacts"] %}
                {% capture code_str %}{{ code_raw | strip }}{% endcapture %}
                {% assign code_str_down = code_str | downcase %}
                {% if code_str and code_str != '' and code_str_down != 'nan' and code_str_down != '.nan' %}
                    <a href="{{ code_str }}" target="_blank">Code</a>
                {% endif %}
            </td>
            <td data-label="Links">{% if a.URL %}<a href="{{ a.URL }}" target="_blank">Paper</a>{% endif %}</td>
            <td data-label="Submitter" class="submitter-cell">
                {% assign submitter_raw = a["Submitter (your name, affiliation)"] %}
                {% capture submitter_str %}{{ submitter_raw | strip }}{% endcapture %}
                {% assign submitter_down = submitter_str | downcase %}
                {% if submitter_str and submitter_str != '' and submitter_down != 'nan' and submitter_down != '.nan' %}
                    {% assign normalized = submitter_str | replace: ' (', ', ' | replace: ')', '' | replace: ' - ', ', ' %}
                    {{ normalized }}
                {% endif %}
            </td>
        </tr>
    {% endfor %}
    </tbody>

</table>
</div>

</div>

<div class="side-panel-container">
    <div class="side-panel">
        <div class="side-panel-content" id="attack-details">
        </div>
    </div>
</div>
</div>

{% include attack-filter-script.html %}
<script type="module" src="{{ '/assets/js/sort-table.js' | relative_url }}"></script>
<script src="{{ '/assets/js/expand-text.js' | relative_url }}"></script>
