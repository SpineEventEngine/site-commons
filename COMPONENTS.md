Theme Components
======

This document is a guide for using theme components on a Hugo website.

_Please add new components in alphabetical order._

**Table of Contents**

* [Clickable category card](#clickable-category-card)
* [Cloak email](#cloak-email)
* [Code](#code)
  * [Code blocks](#code-blocks)
  * [Code tabs](#code-tabs)
  * [Semantic code coloring](#semantic-code-coloring)
* [Get site variables](#get-site-variables)
* [Next/Prev bottom navigation](#nextprev-bottom-navigation)
* [Note block](#note-block)
* [Sidenav](#sidenav)
* [Version](#version)

## Clickable category card

The `docs-category-card` shortcode renders a clickable category card with
optional icon and badges.

To show cards in a grid, wrap them in the `docs-card-container` shortcode:

```markdown
{{< docs-card-container >}}

{{< docs-category-card
    icon="fas fa-book"
    title="Books"
    url="docs/resources/books/" >}}
The concepts and practical guidance.
{{< /docs-category-card >}}

{{< /docs-card-container >}}
```

Where:

* `icon` – the icon class (optional). Will be shown near the title.
* `title` – the title of the card.
* `url` – the card destination URL.
* `badges` – the list of badges to be shown near the title (optional).
* `class`– classes for extending the styles of a specific card (optional).

## Cloak email

The `cloakemail` shortcode is used to cloak emails or phone numbers from
spamming bots. We are using the improved version of the [`hugo-cloak-email`](https://github.com/martignoni/hugo-cloak-email),
which now also supports the site variables as provided parameters.

In Markdown files use:

```markdown
{{< cloakemail "jane.doe@example.com" >}}
```

or via named parameter:

```markdown
{{< cloakemail address="jane.doe@example.com" >}}
```

With the provided site variables:

```markdown
{{< cloakemail address_variable="emails.sales_email" >}}
```

or with the display text:

```markdown
{{< cloakemail address_variable="emails.sales_email" display="Contact us" >}}
```

To add an email subject use `query`:

```markdown
{{< cloakemail address="jane.doe@example.com" query="subject=Reseller%20/%20Distributor%20inquiry" >}}
```

Instead of spaces use `%20`.

## Code

### Code blocks

There are two ways to add code blocks with syntax highlighting.

#### 1. With triple backticks

Please always specify the [language syntax][syntax-highlighting-languages]
to avoid problems with the layout.

````markdown
```bash
git clone git@github.com:spine-examples/hello.git
```
````

The appearance of Hugo code blocks can be configured using parameters,
as described in the official [documentation][code-fences-doc]:

* `linenos=table` – configures line numbers and renders them in a table view.
  The table view is necessary for correct copying of code.
* `hl_lines=[8,"15-17"]` – lists a set of line numbers or line number ranges
  to be additionally highlighted.
* `linenostart=199` – starts the line number count from 199.

````markdown
```java {linenos=table, hl_lines=[8,"15-17"], linenostart=199}
// ... code
```
````

#### 2. Using `highlight` shortcode

The `highlight` shortcode allows setting custom visibility options related to
this project, such as custom CSS classes, the text highlighting on the selected
line, a file name bar, etc.

```markdown
{{< highlight lang="java" params="hl_lines=10 19, linenos=table" class="hl-text-only" >}}
@BeforeEach
void sendCommand() {
...
}
{{< /highlight >}}
```

Where:

* `lang` – the language syntax. See the [supported languages][syntax-highlighting-languages].
* `params` – optional standard Hugo highlighting parameters as a string.
* `file` – an optional name of the code file to display on the code header panel.
* `class` – an optional class name that the code block will be wrapped in.

The class `hl-text-only` is predefined and used to highlight only the text without 
highlighting the entire line with a background.

### Code tabs

Allows switching between code languages of the source code examples.

There are two types of code tabs widgets:

* **Synchronized**. This widget synchronizes its state with other widgets with
  the same set of languages. For example, when a user switches to "Java" in
  a single "Java, Kotlin" widget, the rest of such widgets will switch
  to the "Java" tab automatically.

  The selected language will be saved in cookies and restored on the page reload.

  Shortcode: `{{< code-tabs >}}`

* **Standalone**. This widget will not change the state of other widgets, neither
  other widgets will change the state of a standalone widget.

  The selected language is not persisted.

  Shortcode: `{{< standalone-code-tabs >}}`

The scenario of having different tabs with different languages on the same
page is supported.

#### Usage

````markdown
{{< code-tabs langs="Java, Kotlin" >}}
{{< code-tab lang="Java" >}}
```java
// Code example in Java.
```
{{< /code-tab >}}

{{< code-tab lang="Kotlin" >}}
```kotlin
// Code example in Kotlin.
```
{{< /code-tab >}}
{{< /code-tabs >}}
````

or standalone tabs usage:

````markdown
{{< standalone-code-tabs langs="Java, Kotlin" >}}
{{< code-tab lang="Java" >}}
```java
// Code example in Java.
```
{{< /code-tab >}}

{{< code-tab lang="Kotlin" >}}
```kotlin
// Code example in Kotlin.
```
{{< /code-tab >}}
{{< /standalone-code-tabs >}}
````

Note: when adding snippets to Markdown pages, remember to format them
with lines of three backticks (```) and a code language.

The code will be rendered as:
```html
<div class="code-tabs">
   <div class="tabs">
       <div class="tab" lang="Java">Java</div>
       <div class="tab" lang="Kotlin">Kotlin</div>
   </div>
   <div class="code-tab-content" lang="Java">
        <pre>
          <code>// Code example in Java.</code>
        </pre>
   </div>
   <div class="code-tab-content" lang="Kotlin">
        <pre>
          <code>// Code example in Kotlin.</code>
        </pre>
   </div>
</div>
```

### Semantic code coloring

The `code` shortcode applies semantic coloring to code names according to their type.

```markdown
{{< code "command" "CreateUser" >}}
```

Will be rendered as:
```html
<code class="command">CreateUser</code>
```

The supported types are: `command`, `event`, `projection`, `rejection`, 
`process-manager`, and `aggregate`.

Template: `layouts/_shortcodes/code.html`.
Styles: `assets/scss/theme/common/code/_semantic-code.scss`.

## Get site variables

The `get-site-data` and `get-site-params` shortcodes return values from the
`data` and `site.Params` variables, respectively.

```markdown
{{% get-site-data "emails.sales_email" %}}
```

will return the `sales@spine.io` email from the `data/emails.yml` file.

```markdown
{{% get-site-params "description" %}}
```

will return the `params.description` value from the `hugo.toml` config file.

## Next/Prev bottom navigation

TBD.

## Note block

Renders the text in a note block with additional styles.

```markdown
{{% note-block class="note" %}}
This is some dummy text to show how a note block can look. Check this 
[example link to guides][test-url] to see how links appear inside the block.

You can add more lines or even lists:
- first item;
- second item.
{{% /note-block %}}

[test-url]: docs/guides/
```

The allowed classes are restricted to predefined options: `note`, `warning`, and `lead`.

```markdown
{{% note-block class="lead" %}}
The test lead block.
{{% /note-block %}}
```

## Sidenav

The documentation sidenav is rendered from YAML data files and supports 
nested sections, categories, page links, and external links.

Sidenav data files can be defined in these locations:

- `data/docs/sidenav.yml` for unversioned root docs.
- `data/docs/<version>/sidenav.yml` for versioned root docs.
- `data/docs/<module>/sidenav.yml` for unversioned module docs.
- `data/docs/<module>/<version>/sidenav.yml` for versioned module docs.

The item fields are:

- `page` – label shown in the UI.
- `key` – unique id for collapsible section/category items.
- `children` – nested list of items.
- `file_path` – path to a Hugo page (resolved against a version/module content path).
- `url` – explicit URL. External links are opened in a new tab.

Example:

```yaml
- page: Overview
  file_path: "" # The path for `content/docs/_index.md`
- page: Quick Start
  file_path: quick-start
- page: Guides
  key: guides
  children:
    - page: Starting a new project
      file_path: guides/start-new-project
    - page: Gradle configuration
      file_path: guides/gradle
- page: Protocol Buffers
  url: https://developers.google.com/protocol-buffers/docs/overview
```

Notes:

- Root-level items with `children` are rendered as sections.
- Nested items with `children` are rendered as categories.
- A section opens automatically when its `key` matches the current docs section.
- A category opens automatically when its `key` matches the current page parent directory.

## Version

Returns the current documentation version label or the label of the provided version.

```markdown
{{< version >}} -> 1.9.0
{{< version "2" >}} -> 2.0.0
```

[code-fences-doc]: https://gohugo.io/content-management/syntax-highlighting/#highlighting-in-code-fences
[syntax-highlighting-languages]: https://gohugo.io/content-management/syntax-highlighting/#languages
