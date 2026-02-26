# Version

Returns the current documentation version label or the label of the provided version.

```markdown
{{< version >}} -> 1.9.0
{{< version "2" >}} -> 2.0.0
```

Can be used in links as well:

```markdown
[Introduction](docs/{{% version %}}/)
```

Will be rendered as:

```html
<a href="/docs/1.9.0/">Introduction</a>
```
