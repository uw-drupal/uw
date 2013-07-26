# UW Drupal Theme – Readme

## Before you Start

This repository is for the UW Drupal Theme -- it contains the theme only, and
not a full Drupal installation. This project assumes that you already have a
working installation of Drupal in place.

Installing Drupal is beyond the scope of this document. Contact the UW (or
larger) Drupal community if you need a hand!

## Getting Started

First, download and enable the bootstrap theme:

```
drush dl bootstrap-7.x-2.1
drush en -y bootstrap
```

Next, [download the latest release](https://github.com/uw-drupal/UW-Drupal-Theme/releases) or clone UW-Drupal-Theme into your Drupal 7 theme folder.

```
cd $DRUPAL_ROOT/sites/all/themes
git clone git://github.com/uw-drupal/UW-Drupal-Theme.git
```

To enable mouseover functionality of the main dropdown menu, you will need to download and install the modernizr drupal module.

* Download modernizr module (`drush dl modernizr`)
* Download a [Modernizr custom build](http://www.modernizr.com/download/) (with Touch Events checked)
* Copy modernizr-X.Y.min.js to `sites/all/modules/modernizr/js/modernizr.min.js`
* If you have the Libraries API module installed, use the path `sites/all/libraries/modernizr/modernizr.min.js` instead.
* Enable the module (`drush en -y modernizr`)

Finally, switch to the UW Drupal theme at Admin -> Appearance.

## Theme Options

Some options are available to control the look of the theme—look under the Appearance page, under UW theme settings.

### Options

* Search Options
  * Show/Hide Search Box
  * Set Search Scope (search your site only, or  all UW)

* UW "Patch & Band" Logo Options
  * Show/Hide the block "W" patch
  * Set Color of Block "W" Patch (gold/purple)
  * Set Color of the "band" (purple/tan)

* Header Image Settings (Masthead Background)
  * Specify a path within your Drupal's file folder or upload an image from your computer
  * 1280x193 JPG image recommended
    * Note: the image repeats, so you should check that your left and right seams blend nicely, or make your image wider

* Content Area Options
  * Sidebar display location (left/right) 

* Logo (wordmark) option allows a custom wordmark image. 800x200 PNG image recommended (displays at 400x100, optimized for high-dpi displays)

## Menus

### Dropdown Main Menu

The main menu is displayed in the *Dropdowns* region by default. You can remove the default menu under the theme settings page by unchecking "Main Menu".

### Expanded Footer Menu

If you'd like a nested footer menu similar to the one found on UW Homepage:

1. Create a new menu at /admin/structure/menu
2. Add 5 or 6 parent items and nested child items:
    * Parent Item One
        * Child item A
	* Child item B
	* Child item C
    * Parent Item Two
        * Child item D
        * Child item E
        …
3. Add your new menu to the "Footer Nav" region at `admin/structure/blocks`

See "UW-MENU-README.md" in the themes folder for additional instructions on installing the header and footer menus which appear on the UW Homepage.

## Further Changes and Customizations

If you need to customize the stylesheets further or make other changes, we recommend creating a sub-theme.  See [Creating a sub-theme](http://drupal.org/node/225125) at drupal.org.  With this approach, you can continue to pull in changes and enhancements for the UW Drupal Theme without overriding your own customizations.

Developers interested in contributing to this theme should see the [project wiki](https://github.com/uw-drupal/UW-Drupal-Theme/wiki) for additional info.

## Caveats

* jquery_update is not compatible with this theme—a newer version of jQuery is loaded via `uw_js_alter` so you should disable jquery_update if you have it enabled.
