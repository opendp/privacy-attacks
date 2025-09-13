---
title: Official Standards and Guidance
order: 1
class: standards-and-guidance
layout: docs
---

Before diving into the main document, it is important to note that the two prominent standardization bodies, NIST and ISO/IEC, have been active in providing guidance and standardization in the space of data anonymization, and in particular differential privacy.

<div style="margin-bottom: 0.5rem;"><strong>ISO/IEC 20889:2018</strong> ({%-include bib-link.html key="ISO"-%}): This standard by the ISO/IEC focuses broadly on de-identification techniques, including synthetic data and randomization techniques. Despite being a normative standard in part, differential privacy is introduced as a formal privacy measure in the style of an informative standard. Only ϵ-differential privacy is considered with Laplace, Gaussian and Exponential mechanisms and the concept of cumulative privacy loss. Interestingly, despite Gaussian noise typically being associated with (ϵ, δ)-differential privacy and zero-concentrated differential privacy, as will be introduced in section <span markdown=1>[(ϵ, δ)-Differential Privacy](/intro-to-dp/#ε-δ-differential-privacy)</span>, these more nuanced privacy models are not defined.</div>


<div style="margin-bottom: 0.5rem;"><strong>NIST SP 800-226 ipd</strong> ({%-include bib-link.html key="NIST"-%}): The guidance paper extends far beyond ISO/IEC 20889:2018, considering multiple privacy models, considerations with regard to the conversion between privacy models, basic mechanisms, threat models in terms of local and central models and more. This is an excellent resource for understanding the nomenclature, security model and goals of applying differential privacy in practice. Throughout this document we endeavor to align the terminology with the NIST guidance paper, leaving formal definitions to the original source.</div>

While the aforementioned resources are useful, neither explicitly provide guidelines on how to choose reasonable parameterization of differential privacy models in terms of privacy budgets, nor do they point to public benchmarks to help the community arrive at industry norms over the medium to long term. In the case of the ISO/IEC 20889:2018, the definitions are also limited to the most standard case which is often an oversimplification for real-world applications. In the course of this document, and where applicable, we will link to the terminology of the standard to provide a level of consistency for the reader. 



