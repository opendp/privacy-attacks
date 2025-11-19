---
title: The Hitchhiker's Guide to Attacks on Output Privacy
layout: docs
permalink: /
icon: 'fa-house'
---

### Overview

This document serves as a guide for understanding and using the [repository](https://opendp.github.io/privacy-attacks/privacy-attacks/) on output privacy attacks and auditing. The repository is designed to be an open resource for the community, cataloging a wide range of scientific papers that explore various output privacy attacks. The repository classifies papers according to various dimensions such as:
* the type of data targeted
* the adversarial threat model employed
* the success metrics used to evaluate the effectiveness of these attacks

See the page on [How to use the repository](https://opendp.github.io/privacy-attacks/how_to_use_the_repository/) for detailed instructions and an overview of the rationale behind its design.

**NOTE**: This repository is a living resource. We aim to keep it up to date, but relevant work may occasionally be missing. If you notice an omission, we welcome your contributions to help improve and expand this collection.


### What is output privacy?   

Privacy is multifaceted, with many qualitatively different types of attacks being described as “privacy violations.”  Our repository, and this document, only consider what we call “**output privacy**” in the context of “**statistical data releases**.”  These are privacy violations that arise when an attacker uses the intentional outputs of some kind of statistical system (e.g. summary statistics or predictive models) to make inferences about individuals.  Examples of some of the attacks on output privacy that we consider in this work include:

* **_Reconstruction attacks_** that use the summary statistics released by the Census to recover information about specific individuals in the population  
* **_Membership-inference attacks_** that can determine if a given image was used in training a photo-tagging model  
* **_Data extraction attacks_** that cause a language model like ChatGPT to output specific sensitive information from its training data

Attacks outside the scope of this repository include those that do not rely on the _intended_ outputs of the system, such as re-identification of anonymized microdata, system-level exploits, and side-channel attacks.
