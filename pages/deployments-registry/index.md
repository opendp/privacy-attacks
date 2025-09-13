---
layout: main
title: Privacy Attacks Repository
order: 1
class: deployments-registry
permalink: /deployments-registry/
---

<div class="home-page">
<div class="main-content" markdown="1">

{% if page.icon %}
    <i class="fa-solid fa-2xl {{ page.icon }} page-icon"></i>
{% endif %}
{% if page.title %}
<header>
    <h1 class="post-title">{{ page.title | escape }}</h1>
</header>
{% endif %}

Inspired by [Differential Privacy in Practice: Expose your Epsilons!](https://journalprivacyconfidentiality.org/index.php/jpc/article/view/689) by Cynthia Dwork, Nitin Kohli, and Deirdre Mulligan, this registry provides: 

> A publicly available communal body of knowledge about differential privacy implementations that can be used by various stakeholders to drive the identification and adoption of judicious differentially private implementations -Dwork Kohli Mulligan 2019

<button>
    <a download="registry.tsv" id="download-tsv">Download TSV</a>
</button>
<script>
    const deployments = {{ site.data.deployments | jsonify }};
</script>
<script type="module" src="{{ '/assets/js/download-tsv.js' | relative_url }}"></script>

<!-- Filters Section -->
<div class="filters-container">
    <div style="white-space: nowrap">Privacy Attacks Repository</div>
    <div class="filter-row" style="justify-content: right">
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
        <div class="filter-group" id="curator-filter-group" style="display: none;">
            <label for="curator-filter">Curator:</label>
            <select id="curator-filter">
                <option value="">All Curators</option>
            </select>
        </div>
        <div class="filter-group" id="model-filter-group" style="display: none;">
            <label for="model-filter">Model:</label>
            <select id="model-filter">
                <option value="">All Models</option>
            </select>
        </div>
        <div class="filter-group" id="product-filter-group" style="display: none;">
            <label for="product-filter">Product:</label>
            <select id="product-filter">
                <option value="">All Products</option>
            </select>
        </div>
        <div class="filter-group" id="flavor-filter-group" style="display: none;">
            <label for="flavor-filter">Flavor:</label>
            <select id="flavor-filter">
                <option value="">All Flavors</option>
            </select>
        </div>
        <div class="filter-group" id="privacy-unit-filter-group" style="display: none;">
            <label for="privacy-unit-filter">Privacy Unit:</label>
            <select id="privacy-unit-filter">
                <option value="">All Privacy Units</option>
            </select>
        </div>
        <div class="filter-group" id="tier-filter-group" style="display: none;">
            <label for="tier-filter">Tier:</label>
            <select id="tier-filter">
                <option value="">All Tiers</option>
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
<table id="deployments-table">
    <thead>
        <tr>
            <th style="text-align: center; width: 35px;">Tier</th>
            <th style="width: 20%;">Product</th>
            <th style="width: 20%;">Description</th>
            <th style="min-width: 60px;">Year</th>
            <th style="width: 15%; min-width: 100px">Flavor name</th>
            <th style="width: 15%; min-width: 100px">Privacy Loss</th>
            <th style="min-width: 70px">Model</th>
            <th style="width: 10%; min-width: 80px">Accounting</th>
            <th style="width: 10%; min-width: 80px">Implementation</th>
        </tr>
    </thead>
    <tbody>
    {% for deployment in site.data.deployments %}
        {% assign d = deployment[1].deployment %}
        <tr class="deployment-row" data-index="{{ forloop.index0 }}">
            <td class='tier-column' data-tier="{{ deployment[1].tier }}">
                <div class='tiers'>
                    {% if deployment[1].tier == 1 %}
                        <i class="fa-solid fa-circle"></i>
                        <i class="fa-regular fa-circle"></i>
                        <i class="fa-regular fa-circle"></i>
                    {% elsif deployment[1].tier == 2 %}
                        <i class="fa-solid fa-circle"></i>
                        <i class="fa-solid fa-circle"></i>
                        <i class="fa-regular fa-circle"></i>
                    {% elsif deployment[1].tier == 3 %}
                        <i class="fa-solid fa-circle"></i>
                        <i class="fa-solid fa-circle"></i>
                        <i class="fa-solid fa-circle"></i>
                    {% else %}
                        {{ deployment[1].tier }}
                    {% endif %}
                </div>
            </td>
            <td style="width: 15%;">
                <div style="color: #181818; font-weight: 500; margin-bottom: 4px">{{ d.name }}</div>
                <div>by {{ d.data_curator }}</div>
            </td>
            <td class="product-description">
                <span class="description-text">{{ d.description }}</span>
                {% if d.description.size > 0 %}
                    <div class="description-window">
                        {{ d.description }}
                    </div>
                {% endif %}
            </td>
            <td style="min-width: 60px;">{{ d.publication_date | date: "%Y" }}</td>
            <td>{{ d.dp_flavor.name }}</td>
            <td>
                {% if d.privacy_loss.privacy_unit %}
                    <div style="font-weight: 500; margin-bottom: 4px; font-size: 12px">{{ d.privacy_loss.privacy_unit }}</div>
                {% endif %}
                {% if d.privacy_loss.privacy_parameters.epsilon %}
                    ε:&nbsp;{{ d.privacy_loss.privacy_parameters.epsilon }}<br>
                {% endif %}
                {% if d.privacy_loss.privacy_parameters.delta %}
                    δ:&nbsp;{{ d.privacy_loss.privacy_parameters.delta }}<br>
                {% endif %}
                {% if d.privacy_loss.privacy_parameters.rho %}
                    ρ:&nbsp;{{ d.privacy_loss.privacy_parameters.rho }}<br>
                {% endif %}
            </td>
            <td>{{ d.model.model_name }}</td>
            <td> - </td>
            <td> - </td>
        </tr>
    {% endfor %}
    </tbody>
</table>
</div>

</div>

<div class="side-panel-container">
    <div class="side-panel">
        <div class="side-panel-content" id="deployment-details">
        </div>
    </div>
</div>
</div>

<!-- Hidden deployment data for JavaScript -->
<script type="application/json" id="deployments-data">
[
{% for deployment in site.data.deployments %}
    {% assign d = deployment[1].deployment %}
    {{ d | jsonify }}{% unless forloop.last %},{% endunless %}
{% endfor %}
]
</script>

{% include filter-script.html %}
