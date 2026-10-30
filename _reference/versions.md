# Versions

The documentation versions are described in the `data/versions.yml` data file.

The theme doesn't ship this file. Each documentation module provides its own,
for example, `docs/data/versions.yml` in the `documentation` repository
and `docs/data/versions.yml` in the `validation` repository.
Hugo merges the files from all imported modules, and the theme reads
the result as `hugo.Data.versions`.

Each top-level key is a module:

* `docs` – the main documentation, with the content in `content/docs/`.
* `<module>` – a module documentation, such as `validation`,
  with the content in `content/docs/<module>/`.

Each module lists its versions:

```yaml
docs:
  - version_id: "1"
    label: 1.9.0
    content_path: docs
    route_url: docs
    is_main: true
  - version_id: "2"
    label: 2.0.0
    content_path: docs/2
    route_url: docs/2
```

The version fields are:

* `version_id` – the version key, as a quoted string. It is used:
  * as the folder of the versioned sidenav: `data/docs/<version_id>/sidenav.yml`
    or `data/docs/<module>/<version_id>/sidenav.yml`, see [Sidenav](sidenav.md);
  * by the [Version](version.md) shortcode: `{{< version "2" >}}`;
  * to detect links that already contain a version, such as `docs/2/guides/gradle/`.
* `label` – the version name rendered by the [Version](version.md) shortcode.
* `content_path` – the folder of the version content inside `content/`.
  The sidenav `file_path` values of this version are resolved against it.
* `route_url` – the URL prefix of the version. On a page of this version,
  links such as `docs/guides/gradle/` are rewritten to start with `route_url`.
* `is_main` – marks the version used for pages outside any `content_path`
  of the module, such as Release Notes. Set it on one version per module.
* `switcher` – not used by the theme.

Notes:

* A page belongs to the version with the longest `content_path` that its file path starts with.
  For example, `docs/2/guides/gradle.md` belongs to `docs/2`, not to `docs`,
  and `docs/validation/user/00-intro/_index.md` belongs to `validation`, not to `docs`.
  The order of versions and modules in the file doesn't matter.
* In the `docs` module, use digits only for `version_id`, such as `"1"` or `"2"`.
  Its version folders are next to the module folders in `data/docs/`,
  and the theme tells them apart by that.
  Other modules can use any value, such as `"2-0-x"`.
* Only the leading module path of a link is rewritten to `route_url`.
  On a page of version `2`, `docs/guides/docs-test/` becomes `docs/2/guides/docs-test/`.
