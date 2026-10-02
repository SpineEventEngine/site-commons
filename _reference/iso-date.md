# ISO date

Renders a date with an optional label. The visible date uses the site's language,
while the `<time>` element's `datetime` attribute uses the ISO `YYYY-MM-DD` format.

The `<time>` element identifies the text as a date. Its ISO `datetime` value
provides an unambiguous, machine-readable date for search engines and other tools,
regardless of the language or formatting of the visible text.

Call the partial from a layout with a required `date` value and an optional `label`:

```go-html-template
{{ partial "theme/components/iso-date.html" (dict
    "date" "2026-02-16"
    "label" "Event date:"
) }}
```

Any date that Hugo can parse can be provided, including a date string, a value from
site data, or a page date such as `.Date` or `.Lastmod`.
For example, to display the page's publication date without a label:

```go-html-template
{{ partial "theme/components/iso-date.html" (dict "date" .Date) }}
```

For February 16, 2026 on an English-language site, the labeled example will be rendered as:

```html
<p class="date">
    <span>Event date:&nbsp;</span>
    <time datetime="2026-02-16">February 16, 2026</time>
</p>
```

To render the last modification date in Markdown content,
use the [date](date.md) shortcode.
