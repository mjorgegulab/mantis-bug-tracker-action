<p align="center">
  <img alt="Mantis Bug Tracker Issue Creation" src="https://i.imgur.com/t2uIzKn.gif">
</p>

Automate issue creation on Mantis Bug Tracker with this GitHub action. **It's free!**

## [![Test Code](https://github.com/mjorgegulab/mantis-bug-tracker-action/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/mjorgegulab/mantis-bug-tracker-action/actions/workflows/tests.yml) [![CodeQL](https://github.com/mjorgegulab/mantis-bug-tracker-action/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/mjorgegulab/mantis-bug-tracker-action/actions/workflows/github-code-scanning/codeql) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/e822fd93d7ee45d1856054062c86cbfc)](https://app.codacy.com/gh/mjorgegulab/mantis-bug-tracker-action/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade) [![Known Vulnerabilities](https://snyk.io/test/github/mjorgegulab/mantis-bug-tracker-action/badge.svg)](https://snyk.io/test/github/mjorgegulab/mantis-bug-tracker-action)

### Usage Example

Place the following in `/.github/workflows/mantisbt.yml`

```yml
on:
  issues:
    types: [opened]
name: 🚀 Open Mantis Bug Tracker Issue
jobs:
  open-issue:
    name: 🎉 Open MantisBT issue
    runs-on: ubuntu-latest
    steps:
      - name: 📂 Open issue
        uses: mjorgegulab/mantis-bug-tracker-action@v1.0.0
        with:
          base-url: 'https://bt.mantis.com'
          url: '/mantis/api/rest/issues'
          token: ${{ secrets.MANTIS_BT_API_KEY }}
          summary: ${{ github.event.issue.title }}
          description: ${{ github.event.issue.body }}
          project-id: '11'
          category-id: '4'
```

### Setup Steps

1. Select the repository you want to add the action to
2. Select the `Actions` tab
3. Select `Blank workflow file` or `Set up a workflow yourself`, if you don't see these options manually create a yaml file `Your_Project/.github/workflows/mantisbt.yml`
4. Paste the example above into your yaml file and save
5. Now you need to add a key to the `secrets` section in your project. To add a `secret` go to the `Settings` tab in your project then select `Secrets`. Add a new `Secret` for `password`
6. Update your yaml file settings
7. If you appreciate this github action give it a :star: or show off with one of the [badges below](#badge).

---

### Settings

Keys can be added directly to your .yml config file or referenced from your project `Secrets` storage.

To add a `secret` go to the `Settings` tab in your project then select `Secrets`.
I strongly recommend you store your `token` as a secret.

#### _Action options_

| Key Name         | Required | Example | Default Value | Description                               |
| ---------------- |----------|---------|---------------|-------------------------------------------|
| `skip-required`  | No       | `true`  | `false`       | Allow to skip the action required options |

#### _HTTP client options_

| Key Name         | Required | Example                   | Default Value | Description                                  |
| ---------------- | -------- | ------------------------- | ------------- | -------------------------------------------- |
| `base-url`       | Yes      | `https://bt.mantis.com`   | `null`        | The base url of the MantisBT instance        |
| `url`            | Yes      | `/mantis/api/rest/issues` | `/`           | The url resource of the MantisBT API         |
| `timeout`        | No       | `4000`                    | `5000`        | The http request timeout (ms)                |
| `proxy-type`     | No       | `https`                   | `null`        | The proxy protocol to use: _HTTP_ or _HTTPS_ |
| `proxy-host`     | No       | `127.0.0.1`               | `null`        | The proxy ip/address to use                  |
| `proxy-port`     | No       | `8080`                    | `8080`        | The proxy port to use                        |
| `proxy-username` | No       | `root`                    | `null`        | The proxy username                           |
| `proxy-password` | No       | `toor`                    | `null`        | The proxy password                           |

#### _MantisBT issue information_

| Key Name                 | Required | Example                            | Default Value | Description                                     |
|--------------------------|----------|------------------------------------| ------------- |-------------------------------------------------|
| `token`                  | Yes      | `s7dgs8s6a8fa8d68sdgdgi`           | `null`        | The MantisBT API token                          |
| `summary`                | Yes      | `Super Issue Title ✨`             | `null`        | The MantisBT issue summary field                |
| `pre-summary`            | No       | `SuperProject [FRONT] >`           | `null`        | Prepend a text before the summary               |
| `description`            | Yes      | `Super Issue Description 📝`       | `null`        | The MantisBT issue description field            |
| `additional-information` | No       | `Some Tiny Additional Information` | `null`        | The MantisBT issue additional information field |
| `project-id`             | Yes      | `11`                               | `null`        | The MantisBT issue project id field             |
| `category-id`            | Yes      | `4`                                | `null`        | The MantisBT issue category id field            |
| `handler-name`           | No       | `me@test.com`                      | `null`        | The MantisBT issue handler name field           |
| `view-state-name`        | No       | `private`                          | `null`        | The MantisBT issue view state name field        |
| `priority-name`          | No       | `normal`                           | `null`        | The MantisBT issue priority name field          |
| `severity-name`          | No       | `trivial`                          | `null`        | The MantisBT issue severity name field          |
| `reproducibility-name`   | No       | `always`                           | `null`        | The MantisBT issue reproducibility name field   |
| `tags`                   | No       | `git log front api`                | `null`        | The MantisBT issue tags names field             |

> Check Mantis Bug Tracker API documentation on [This Link](https://documenter.getpostman.com/view/29959/mantis-bug-tracker-rest-api/7Lt6zkP)

### Outputs

This github action returns some variables once it has finished.

| Key Name    | Example                                          | Description            |
| ----------- | ------------------------------------------------ | ---------------------- |
| `issue-id`  | `00645`                                          | The MantisBT issue id  |
| `issue-url` | `https://bt.mantis.com/mantis/view.php?id=00645` | The MantisBT issue url |

```yml
on:
  issues:
    types: [opened]
name: 🚀 Open Mantis Bug Tracker Issue
jobs:
  open-issue:
    name: 🎉 Open MantisBT issue
    runs-on: ubuntu-latest
    steps:
      - name: 📂 Open issue
        id: mantisbt
        uses: mjorgegulab/mantis-bug-tracker-action@v1.0.0
        with:
          base-url: 'https://bt.mantis.com'
          url: '/mantis/api/rest/issues'
          token: ${{ secrets.MANTIS_BT_API_KEY }}
          summary: ${{ github.event.issue.title }}
          description: ${{ github.event.issue.body }}
          project-id: '11'
          category-id: '4'
      - name: 🔤 Print output vars
        run: echo "Issue ID ==> ${{ steps.mantisbt.outputs.issue-id }}" && \ 
             echo "Issue URL ==> ${{ steps.mantisbt.outputs.issue-url }}"
```

# Common Examples

#### Capture Github issue creation and publish it to MantisBT

```yml
name: Capture Github issue and open new mantis bug tracker issue

on:
  issues:
    types: [opened]

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - name: MantisBT Issue
        id: mantisbt
        uses: mjorgegulab/mantis-bug-tracker-action@v1.0.0
        with:
          base-url: 'https://bt.mantis.com'
          url: '/mantis/api/rest/issues'
          token: ${{ secrets.MANTIS_BT_API_KEY }}
          summary: ${{ github.event.issue.title }}
          description: ${{ github.event.issue.body }}
          project-id: '11'
          category-id: '4'
```

#### Capture Github issue, publish to mantis and update github issue

```yml
name: Open new mantis issue and update github issue

on:
  issues:
    types: [opened]

jobs:
  main:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: MantisBT Issue
        id: mantisbt
        uses: mjorgegulab/mantis-bug-tracker-action@v1.0.0
        with:
          base-url: 'https://bt.mantis.com'
          url: '/mantis/api/rest/issues'
          token: ${{ secrets.MANTIS_BT_API_KEY }}
          summary: ${{ github.event.issue.title }}
          description: ${{ github.event.issue.body }}
          project-id: '11'
          category-id: '4'
      - name: Add Mantis URL as Issue Comment
        uses: peter-evans/create-or-update-comment@v3
        with:
          issue-number: ${{ github.event.issue.number }}
          body: |
            <a target="_blank" href="${{ steps.mantisbt.outputs.issue-url }}"><img src="https://i.imgur.com/vgIWfWf.png" alt="drawing" width="100"/></a>
```

#### Full example (all options) capturing Github issue, publish to mantis and update github issue

```yml
name: Open new mantis issue and update github issue

on:
  issues:
    types: [opened]

jobs:
  main:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: MantisBT Issue
        id: mantisbt
        uses: mjorgegulab/mantis-bug-tracker-action@v1.0.0
        with:
          base-url: 'https://bt.mantis.com'
          url: '/mantis/api/rest/issues'
          token: ${{ secrets.MANTIS_BT_API_KEY }}
          timeout: '5000'
          proxy-type: 'https'
          proxy-host: '127.0.0.1'
          proxy-port: '8080'
          proxy-username: 'root'
          proxy-password: 'toor'
          pre-summary: 'SuperProject-01 [FRONT] >'
          summary: ${{ github.event.issue.title }}
          description: ${{ github.event.issue.body }}
          additional-information: 'Super additional info 🌟🌟🌟'
          project-id: '11'
          category-id: '4'
          handler-name: 'hostmaster@localhost.com'
          view-state-name: 'public'
          priority-name: 'normal'
          severity-name: 'trivial'
          reproducibility-name: 'never'
          tags: |-
            issue
            github
            super_tag
            front
            api
            back

      - name: Add Mantis URL as Issue Comment
        uses: peter-evans/create-or-update-comment@v3
        with:
          issue-number: ${{ github.event.issue.number }}
          body: |
            <a target="_blank" href="${{ steps.mantisbt.outputs.issue-url }}"><img src="https://i.imgur.com/vgIWfWf.png" alt="drawing" width="100"/></a>
```

---

_Want another example? Let me know by creating a [github issue](https://github.com/mjorgegulab/mantis-bug-tracker-action/issues/new)_

---

## Badge

If you appreciate this github action give it a :star: or show off with one of the badges below. Feel free to edit the text or color.

[<img alt="Bug Tracked With-Mantis Bug Tracker Github Action" src="https://img.shields.io/badge/Bug Tracked With-Mantis Bug Tracker Github Action-<COLOR>?style=for-the-badge&color=0077b6">](https://github.com/mjorgegulab/mantis-bug-tracker-action)

```md
[<img alt="Bug Tracked With-Mantis Bug Tracker Github Action" src="https://img.shields.io/badge/Bug Tracked With-Mantis Bug Tracker Github Action-<COLOR>?style=for-the-badge&color=0077b6">](https://github.com/mjorgegulab/mantis-bug-tracker-action)
```

[<img alt="Bug Tracked With-Mantis Bug Tracker Github Action" src="https://img.shields.io/badge/Bug Tracked With-Mantis Bug Tracker Github Action-<COLOR>?style=for-the-badge&color=2b9348">](https://github.com/mjorgegulab/mantis-bug-tracker-action)

```md
[<img alt="Bug Tracked With-Mantis Bug Tracker Github Action" src="https://img.shields.io/badge/Bug Tracked With-Mantis Bug Tracker Github Action-<COLOR>?style=for-the-badge&color=2b9348">](https://github.com/mjorgegulab/mantis-bug-tracker-action)
```

[<img alt="Bug Tracked With-Mantis Bug Tracker Github Action" src="https://img.shields.io/badge/Bug Tracked With-Mantis Bug Tracker Github Action-<COLOR>?style=for-the-badge&color=d00000">](https://github.com/mjorgegulab/mantis-bug-tracker-action)

```md
[<img alt="Bug Tracked With-Mantis Bug Tracker Github Action" src="https://img.shields.io/badge/Bug Tracked With-Mantis Bug Tracker Github Action-<COLOR>?style=for-the-badge&color=d00000">](https://github.com/mjorgegulab/mantis-bug-tracker-action)
```

---

## Contributing to this project

PRs and Issues are welcome. 😘

## License

Copyright © thewolfx41 - Released under the MIT License.
