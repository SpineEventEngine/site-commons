site-commons
============

A theme for Spine websites based on Hugo engine.

It provides:
- reusable layouts and partials;
- custom shortcodes for documentation-heavy content;
- shared styling and UI components used across Spine web projects.

## Prerequisites

1. [Go][go] `1.12` or newer.
2. [Hugo Extended][hugo-quick-start] in version `v0.150.0` or higher.

## Installation

1. Initialize your Hugo website as the Hugo Module:

    ```bash
    hugo mod init github.com/SpineEventEngine/<repo-name>
    ```

2. Add this theme import to your `hugo.toml` configuration file:

    ```toml
    [module]
      [[module.imports]]
        path = 'github.com/SpineEventEngine/site-commons'
    ```

## Theme updates

1. Get theme updates:

    ```bash
    hugo mod get -u github.com/SpineEventEngine/site-commons
    ```

2. Commit and push changes from `go.mod` and `go.sum` files.

## Usage

Use the theme as the base for the site templates and content rendering.

See the [guide](_reference/index.md) for all theme components and examples.

## Development

When editing this theme:
- keep components and shortcodes reusable;
- update the [guide](_reference/index.md) when adding or changing components.

[go]: https://go.dev/doc/install
[hugo-quick-start]: https://gohugo.io/getting-started/quick-start/#step-1-install-hugo
