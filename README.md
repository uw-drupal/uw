# UW Drupal Theme – Readme

## Before you Start

This repository is for the UW Drupal Theme -- it contains the theme only, and
not a full Drupal installation. This project assumes that you already have a
working installation of Drupal in place.

Installing Drupal is beyond the scope of this document. Contact the UW (or
larger) Drupal community if you need a hand!

## Getting Started

First, download (or clone) the theme into your Drupal 7 theme folder.

```
cd sites/all/themes
git clone git://github.com/uw-drupal/UW-Drupal-Theme.git
```

You'll also need to download and enable the bootstrap theme:

```
drush dl bootstrap
drush en -y bootstrap
```

Download the [Bootstrap library v2.3.x](http://twitter.github.com/bootstrap/) and extract it such that you have `sites/all/themes/bootstrap/bootstrap/...`

```
cd sites/all/themes/bootstrap
wget http://twitter.github.io/bootstrap/assets/bootstrap.zip
unzip bootstrap.zip
rm bootstrap.zip
```

Finally, switch to the UW Drupal theme at Admin -> Appearance.

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

## Theme Options

Some options are available to control the look of the theme—look under the Appearance page, under UW theme settings.

### Options

* Show patch (enabled by default)
* Patch color (W logo)
	* gold (default), purple
* Show search (enabled by default)
* Search default site
	* this site (default), or UW
* Band color
	* purple (default), tan
* Logo (wordmark) option allows a custom wordmark image. 800x200 PNG image recommended (displays at 400x100, optimized for high-dpi displays)
* Header image
  * Specify a path within your Drupal's file folder or upload an image from your computer
  * 1280x193 JPG image recommended
    * Note: the image repeats, so you should check that your left and right seams blend nicely, or make your image wider

## Menus


### Dropdown Main Menu

The main menu is displayed in the *Dropdowns* region by default. You can remove the default menu under the theme settings page by unchecking "Main Menu".

### Expanded Footer Menu

For an expanded, nested footer menu you must install the menu_block module.

`drush dl menu_block && drush en -y menu_block`

Once you install *menu_block*, it's recommended that you create a footer menu in the Footer Nav region.

1. Navigate to the **Structure: Blocks** admin page.
2. Add menu block
3. Use these settings:
	* a block title of \<none\>
	* advanced options
	* administrative title: [menu_block] Footer Menu
	* maximum depth 2
	* check: **Expand all children** of this tree
	* assign region: Footer Nav
