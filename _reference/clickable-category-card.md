# Clickable category card

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

* `icon` – the optional icon class shown near the title.
* `title` – the title of the card.
* `url` – the card destination URL.
* `badges` – the optional list of badges to be shown near the title.
* `class`– the optional classes for extending the styles of a specific card.
