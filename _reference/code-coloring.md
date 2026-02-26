# Semantic code coloring

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

* Template: `layouts/_shortcodes/code.html`.
* Styles: `assets/scss/theme/common/code/_semantic-code.scss`.
