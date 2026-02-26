# Cloak email

The `cloakemail` shortcode is used to cloak emails or phone numbers from
spamming bots. We are using the improved version of the [`hugo-cloak-email`](https://github.com/martignoni/hugo-cloak-email),
which now also supports the site variables as provided parameters.

Pass the email address directly:

```markdown
{{< cloakemail "jane.doe@example.com" >}}
```

Or use a named parameter:

```markdown
{{< cloakemail address="jane.doe@example.com" >}}
```

Reference an email address defined in data variables:

```markdown
{{< cloakemail address_variable="emails.sales_email" >}}
```

Set custom link text instead of displaying the raw email address:

```markdown
{{< cloakemail address_variable="emails.sales_email" display="Contact us" >}}
```

Use the `query` parameter to define a subject line:

```markdown
{{< cloakemail address="jane.doe@example.com" query="subject=Reseller%20/%20Distributor%20inquiry" >}}
```

Replace spaces with `%20`, which is the encoded form of a space in URLs.
