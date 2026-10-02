# Date

Renders the page's last modification date using the [ISO date](iso-date.md) component.

Set `lastmod` in the page front matter and add the shortcode to the Markdown content:

```markdown
---
title: Getting started
lastmod: 2026-02-16
---

{{< date >}}
```

Use the optional `label` parameter to add text before the date:

```markdown
{{< date label="Last updated:" >}}
```

For an English-language site, the labeled example will be rendered as:

```html
<p class="date">
    <span>Last updated:&nbsp;</span>
    <time datetime="2026-02-16">February 16, 2026</time>
</p>
```

The displayed date follows the site's language. The shortcode uses `.Page.Lastmod`,
so Hugo's last modification date configuration also applies.
