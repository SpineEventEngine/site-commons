# Note block

Renders the text in a note block with additional styles.

```markdown
{{% note-block class="note" %}}
This is some dummy text to show how a note block can look. Check this 
[example link to guides][test-url] to see how links appear inside the block.

You can add more lines or even lists:
* first item;
* second item.
{{% /note-block %}}

[test-url]: docs/guides/
```

The allowed classes are restricted to predefined options: `note`, `warning`, and `lead`.

```markdown
{{% note-block class="lead" %}}
The test lead block.
{{% /note-block %}}
```
