# privacy-attacks-data

This repository provides backing data for a repository of privacy attacks. It is intended to be an open resource for the community, cataloging scientific papers that explore various privacy attacks. The data classifies papers according to dimensions like the type of data, the adversarial threat model, and the attack's objectives.

This repo is intended to be referenced by a front-end which is responsible for display.

---

## How to Contribute

New records of privacy attacks should be submitted as Pull Requests (PRs).

-   **If you are outside the core team**, you should first create a [fork of this repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository) and then make a [local clone](https://docs.github.com/en/get-started/getting-started-with-git/cloning-a-repository) of your fork.
-   **If you are a member of the core team**, you can simply make a local clone of this repository.

In your local clone:

1.  Copy `templates/attack.yaml` to the `attacks/` directory.
2.  Rename the file to be distinctive. Including the first author, title, and year is a good practice (e.g., `dwork_et_al_2008_revealing_information.yaml`).
3.  Fill in the fields inside the new file. See the **Schema Reference** below for details on each field.
4.  Commit your changes and push them to your fork.
    ```bash
    git add .
    git commit -m 'feat: Add new attack paper TITLE_HERE'
    git push
    ```
5.  After pushing, your terminal will provide a URL to open a pull request. Follow the link and provide any helpful information for the reviewers.

Your PR will be reviewed, and the team may merge it directly or provide feedback. Automated tests will run on your PR to validate the format; please correct any reported errors.

---

## Schema Reference

Each paper in the repository is cataloged with the following fields. Fields marked with an asterisk (*) are the primary classification columns with specific, defined terminology.

-   **URL**: A direct link to the paper.
-   **Bibtex Entry**: A complete BibTeX citation for the paper.
-   **Authors**: The paper's authors.
-   **Title**: The paper's full title.
-   **Short Description**: A brief, one-or-two-sentence summary of the paper's contribution.
-   **Type of Data (Inputs)**: The kind of input data the attack targets. Common values include:
    -   `Tabular`: Data in a table format with rows and columns.
    -   `Image`: Pixel data, such as from datasets like ImageNet or CIFAR-10.
    -   `Text`: Sequences of characters or tokens, often represented numerically.
-   **Type of Data Release (Outputs)**: The form of output the privacy mechanism produces from the dataset. Common values include:
    -   `Counts and Linear Queries`: Statistical summaries of a dataset (e.g., "How many elements of this dataset are voting-age, hispanic, males living in Massachusetts?").
    -   `Predictive Model`: A model trained to map inputs to outputs, such as linear regression or neural networks.
    -   `Generative Model`: A model that produces new synthetic data resembling the training data, such as LLMs or diffusion models.
-   **Threat Model --- Attacker Objectives**: What the attacker aims to achieve. Common values include:
    -   `Data Reconstruction`
    -   `Membership Inference`
    -   `Data Extraction`
    -   `Attribute Inference`
-   **Threat Model --- Attacker Capabilities**: A free-text description of the attacker's assumed knowledge or abilities (e.g., access to a subset of data, ability to issue queries).
-   **Research Type**: The nature of the research contribution. Common values include:
    -   `Theoretical`
    -   `Empirical`
    -   `Applications`
-   **Link to Artifacts**: A URL to any code or data artifacts associated with the paper.
-   **Additional Comments**: Any other relevant notes.
-   **Submitter Information**: Your name and affiliation.

### Scope

Please note the repository currently focuses on **"output privacy"** papers. We do not currently catalog:

-   Pure security violations like timing attacks or other system breaks.
-   Record linkage or re-identification attacks that are tied to tabular microdata releases.

---

## Reviewing PRs

Tests will validate the file format, so reviewers should focus on content:

-   Is the short description accurate and readable?
-   Are the classification fields (`Type of Data`, `Type of Release`, etc.) correctly applied according to the schema definitions?
-   Does the paper fall within the stated scope of the repository?

---
