# Importing Default UW Menus

The UW Drupal Theme developers have created a means of importing the UW menus into your Drupal 7 installation. This technique requires the installation of the [menu_import module](http://drupal.org/project/menu_import).

## Install menu_import Using Drush

Start a shell on your server and cd to your sites/all/modules directory

```
drush dl menu_import
drush en -y menu_import
```

## Install menu_import Using Drupal

* Download the module from the link above and copy the module to your `sites/all/modules` directory.

* Go to the `admin/modules` page, locate the menu_import module select the module and save the changes.


## Importing the Menus

### Via a Drush script:
 * SSH to your drupal site root. 
 * At the shell prompt type: which drush 
   - make a note of the path to drush. eg: /usr/lib/php/pear/drush
 * At the shell prompt type: 
   - drush php-script /path/to/theme/folder/uw-menu-install.php
   - eg: drush php-script /sites/all/themes/UW-Drupal-Theme/uw-menu-install.php

### Manually:

* For each of the menus you would like to import (top, footer, thinstrip):
	* Go to `admin/structure/menu`
	* Click Add Menu
		- Title: UW **[Top/Footer/Thinstrip]**
		- Save
	* Go to `admin/structure/menu`
	  - Click the Import Menu Tab
	  - Choose menu created in previous step
	  - Browse for Menu file uw-[top/footer/thinstrip]-menu.txt
	  - Options: Remove existing Menu Items
	* Click Upload and Preview
	* Click Import
	* Go to `admin/structure/block`
	* Scroll down to disabled and click configure next to the UW **[Top/Footer/Thinstrip]** block
	  - Block title: \<none\>
	  - Region Settings:
	    - Top menu: Dropdowns region
	    - Footer menu: Footer Nav region
	    - Thinstrip menu: Thinstrip region
	* Save Block
	
	Note: You may also import menus via drush:
        drush menu-import /data/www/sites/all/themes/UW-Drupal-Theme/uw-menu-top.txt menu-uw-top-menu --clean-import


## Menu Labels

The [Special_Menu_Items module](http://drupal.org/project/special_menu_items) allows you to create non-linking labels in your Drupal menus.

The UW-Drupal-Theme CSS files have been modified to work with this module.

After installing and enabling the module, you may add menu items to your Drupal menus which contain the <nolink> URL.

**Note**: After enabling the special_menu_items, navigate to the configuration page (`admin/config/system/special_menu_items`) and set the HTML tags for no link and separator to "<div".
