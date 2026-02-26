# Note block

Renders the text in a note block with additional styles.

The allowed classes are restricted to predefined options: `note`, `warning`, and `lead`.

### Note

```markdown
{{% note-block class="note" %}}
This is some dummy text to show how a note block can look. Check this 
[example link to guides][test-url] to see how links appear inside the block.

You can add more lines or even lists:
* first item;
* second item.
{{% /note-block %}}

[test-url]: docs/quick-start/
```

<img src="images/note-block-note.png" alt="Note block" width="552">

### Lead

```markdown
{{% note-block class="lead" %}}
The lead subtitle text here.
{{% /note-block %}}
```

<img src="images/note-block-lead.png" alt="Note block" width="552">

### Warning

```markdown
{{% note-block class="warning" %}}
The warning block with the [test link to guides][docs/quick-start/].
{{% /note-block %}}
```

<img src="images/note-block-warning.png" alt="Note block" width="552">
