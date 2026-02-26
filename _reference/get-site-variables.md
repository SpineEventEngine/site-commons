# Get site variables

The `get-site-data` and `get-site-params` shortcodes return values from the
`data` and `site.Params` variables, respectively.

## Get value from data files:

```markdown
{{% get-site-data "emails.sales_email" %}}
```

Returns the `sales@spine.io` email from the `data/emails.yml` file.

## Get value from site configuration:

```markdown
{{% get-site-params "description" %}}
```

Returns the value of `params.description` from the `hugo.toml` configuration file.
