# UW Drupal Theme – Readme

## Getting Started

First, download (or clone) the theme into your Drupal 7 theme folder.

```
cd sites/all/themes
git clone git@github.com:uw-drupal/UW-Drupal-Theme.git
```

You'll also need to download and enable the bootstrap theme:

```
drush dl bootstrap
drush en -y bootstrap
```

Download the [Bootstrap library v2.3.x](http://twitter.github.com/bootstrap/) and extract it such that you have `sites/all/themes/bootstrap/bootstrap/...`

## Stylesheets

**Do not edit any stylesheets in the CSS directory…such changes will be overwritten and lost.**

We are using Sass+compass as a CSS preprocessor. To modify stylesheets, edit the corresponding .scss file, then compile using `compass watch` or `compass compile`.

### Using Compass

* Installing: [Compass installation instructions](http://compass-style.org/install/)
* Compiling: switch to the UW Drupal Theme directory and run `compass watch`
  * For debugging purposes, you might want to specify the `-s` switch, which controls the output format. But, remember to compile compressed before committing the CSS.

```
  -s, --output-style STYLE         Select a CSS output mode.
                                       One of: nested, expanded, compact, compressed
```

