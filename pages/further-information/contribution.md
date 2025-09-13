---
title: Contributing
order: 3
class: contributing
layout: docs
---

This project is the product of community collaboration. We welcome updates and additions, whether you are a new contributor, a task force member, or someone who has made contributions to the repository before. Contributions can be both new elements in the privacy attacks repository or corrections and additions to the existing ones.

New records of privacy attacks or edits to existing ones should be submitted as Pull Requests (PRs) by creating a [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository) of the [attacks repo](https://github.com/opendp/privacy-attacks) and then make a [local clone](https://docs.github.com/en/get-started/getting-started-with-git/cloning-a-repository) of your fork. In your local clone, to add a new paper to the repository:
1.  Copy `templates/attack.yaml` to the `attacks/` directory.
2.  Rename the file to be distinctive. Including the first author, title, and year is a good practice (e.g., `dwork_et_al_2008_revealing_information.yaml`).
3.  Fill in the fields inside the new file. See the **How to use the repository** page for details on how to fill the template.
4.  Commit your changes and push them to your fork.
    ```bash
    git add .
    git commit -m 'feat: Add new attack paper TITLE_HERE'
    git push
    ```
5.  After pushing, your terminal will provide a URL to open a pull request. Follow the link and provide any helpful information for the reviewers.


In the case of editing an existing paper, please justify why those changes are needed.

Your PR will be reviewed, and the team may merge it directly or provide feedback. Automated tests will run on your PR to validate the format; please correct any reported errors.
