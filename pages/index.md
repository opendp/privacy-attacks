---
title: The Hitchhiker's Guide to Attacks on Output Privacy
layout: docs
permalink: /
icon: 'fa-house'
---

This document serves as a guide for understanding and using the [repository](https://docs.google.com/spreadsheets/d/1yG-B58i29vz0xp-yKjFPy1yj6fchGfp4keASS-zXdq8/edit#gid=0) on output privacy attacks and auditing. The repository is designed to be an open resource for the community, cataloging a wide range of scientific papers that explore various output privacy attacks. The repository classifies papers according to various dimensions such as the type of data targeted, the adversarial threat model employed, and the success metrics used to evaluate the effectiveness of these attacks. 

This document will also include the necessary information to navigate the repository, and should offer a rationale for the repository’s design, explaining the thought process behind the categorization of the papers. Additionally, we can include examples to illustrate how researchers and practitioners can effectively use the repository to advance their work. 

**This repository is a living resource.** We aim to keep it up to date, but relevant work may occasionally be missing. If you notice an omission, we welcome your contributions to help improve and expand this collection.


### What is output privacy?   

Privacy is multifaceted, with many qualitatively different types of attacks being described as “privacy violations.”  Our repository, and this document, only consider what we call “output privacy” in the context of “statistical data releases.”  These are privacy violations that arise when an attacker uses the intentional outputs of some kind of statistical system (e.g. summary statistics or predictive models)  to make inferences about individuals.  Examples of some of the attacks on “output privacy” that we consider in this work include:

* Reconstruction attacks that use the summary statistics released by the Census to recover information about specific individuals in the population  
* Membership-inference attacks that can determine if a given image was used in training a photo-tagging model  
* Data extraction attacks that cause a language model like ChatGPT to output specific sensitive information from its training data

There are many types of privacy attacks that aren’t in scope for this repository, either because they are not “statistical” or because the use something other than the “intended output” to violate privacy.  While there is some room for gray area, some representative examples include;

* Re-identification attacks that link anonymized tabular microdata to specific individuals (these are not “statistical” in our terminology)  
* System-level attacks and side-channel attacks that allow an attacker to gain access to restricted information (these are not “output privacy” in our terminology)
