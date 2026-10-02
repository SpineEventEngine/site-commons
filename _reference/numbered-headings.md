# Numbered headings

Automatically numbers second-level headings and the ordered lists that follow them.
Headings use `1.`, `2.`, and so on. List items include the section number:
`1.1.`, `1.2.`, `2.1.`, and so on.

The layout must wrap the rendered Markdown content in an element with the
`numbered-headings` class:

```go-html-template
<div class="numbered-headings">
    {{ .Content }}
</div>
```

The documentation `three-column` layout adds this class automatically when the page's
front matter contains `has_numbered_headings: true`.
Other layouts must add the class themselves. To make it optional per page:

```go-html-template
<div class="article-container article-text{{ if .Params.has_numbered_headings }} numbered-headings{{ end }}">
    {{ .Content }}
</div>
```

The Markdown can look like this:

```markdown
---
title: Getting started
has_numbered_headings: true
---

## Install the tools

1. Install Go.
2. Install Hugo Extended.

## Create a website

1. Initialize the Hugo module.
2. Import the theme.
```

The content will be displayed as:

```text
1. Install the tools
   1.1. Install Go.
   1.2. Install Hugo Extended.

2. Create a website
   2.1. Initialize the Hugo module.
   2.2. Import the theme.
```

Each ordered list starts its item counter again. Write headings without manual
numbers, as the numbers are added by CSS. Other heading levels are not numbered.

The styles also number Table of Contents entries and hide nested entries for
third- and fourth-level headings when `#TableOfContents` is inside the
`numbered-headings` container. Include `{{ .TableOfContents }}` in that container
to apply these styles to a custom layout's Table of Contents.
