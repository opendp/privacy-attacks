---
layout: main
title: Privacy Attacks Repository
order: 1
class: privacy-attacks
permalink: /privacy-attacks/
---

<div class="home-page privacy-attacks-page">
<div class="main-content" markdown="1">

{% assign attacks = site.data.attacks | default: site.data.privacy_attacks | default: site.data %}

{% if page.icon %}
    <i class="fa-solid fa-2xl {{ page.icon }} page-icon"></i>
{% endif %}
{% if page.title %}
<header>
    <h1 class="post-title">{{ page.title | escape }}</h1>
</header>
{% endif %}

<script type="module" src="{{ '/assets/js/download-tsv.js' | relative_url }}"></script>
<script type="module" src="{{ '/assets/js/filter-attacks.js' | relative_url }}"></script>

<div class="filters-container" style="display: flex; justify-content: space-between; align-items: center;">
    
    <div class="filter-actions">
        <button>
            <a download="privacy-attacks.tsv" id="download-tsv">Download TSV</a>
        </button>
    </div>

    <div class="filter-row" style="display: flex; align-items: center; gap: 0.5rem;">
        <div class="filter-group">
            <input type="text" id="search-filter" placeholder="Search">
        </div>
        <div class="filter-group">
            <select id="visible-filters">
                <option value="">Filters</option>
            </select>
        </div>
        <div class="filter-actions">
            <button id="clear-filters" title="Clear all filters">Clear</button>
        </div>
    </div>
</div>

<div class="filters-container" style="margin-top: 0.5rem">
    <div class="filter-row">
        <div class="filter-group" id="datatype-filter-group" style="display: none;">
            <label for="datatype-filter">Data Type (Inputs):</label>
            <select id="datatype-filter">
                <option value="">All Data Types</option>
            </select>
        </div>
        <div class="filter-group" id="release-filter-group" style="display: none;">
            <label for="release-filter">Type of Data Release (Outputs):</label>
            <select id="release-filter">
                <option value="">All Release Types</option>
            </select>
        </div>
        <div class="filter-group" id="objective-filter-group" style="display: none;">
            <label for="objective-filter">Attacker Objectives:</label>
            <select id="objective-filter">
                <option value="">All Objectives</option>
            </select>
        </div>
        <div class="filter-group" id="researchtype-filter-group" style="display: none;">
            <label for="researchtype-filter">Research Type:</label>
            <select id="researchtype-filter">
                <option value="">All Research Types</option>
            </select>
        </div>
        <div class="filter-group" id="year-filter-group" style="display: none;">
            <label for="year-filter">Year:</label>
            <select id="year-filter">
                <option value="">All Years</option>
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
            <td><div style="color: #181818; font-weight: 500; margin-bottom: 4px">{{ a.Title }}</div></td>
            <td>{{ a.Authors }}</td>
            <td class="year-cell">{{ a["Publication Year"] }}</td>
            <td>{{ a["Data Type"] }}</td>
            <td>{{ a["Type of Release"] }}</td>
            <td>{{ a["Threat Model --- Attacker Objective"] }}</td>
            <td>{{ a["Research Type"] }}</td>
            <td class="bibtex-cell">
                {% assign bibtex_raw = a["BibTex (Please add a bibtex entry for this paper to facilitate easy citations)"] %}
                {% capture bibtex_str %}{{ bibtex_raw }}{% endcapture %}
                {% assign bibtex_str_down = bibtex_str | downcase %}
                {% if bibtex_str and bibtex_str != '' and bibtex_str_down != 'nan' %}
                    <a href="data:text/plain;charset=utf-8,{{ bibtex_str | uri_escape }}" download="{{ a.Title | default: 'citation' | slugify }}.bib">Download</a>
                {% endif %}
            </td>
            <td class="code-cell">
                {% assign code_raw = a["Code"] | default: a["Links to Artifacts"] %}
                {% capture code_str %}{{ code_raw | strip }}{% endcapture %}
                {% assign code_str_down = code_str | downcase %}
                {% if code_str and code_str != '' and code_str_down != 'nan' and code_str_down != '.nan' %}
                    <a href="{{ code_str }}" target="_blank">Code</a>
                {% endif %}
            </td>
            <td>{% if a.URL %}<a href="{{ a.URL }}" target="_blank">Paper</a>{% endif %}</td>
            <td class="submitter-cell">
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