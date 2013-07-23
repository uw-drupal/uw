# Importing UW Top/Footer Menus

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

* For each of the two menus (top, footer):
	* Go to `admin/structure/menu`
	* Click Add Menu
		- Title: UW **[Top/Footer]** Menu
		- Save
	* Go to `admin/structure/menu`
	  - Click the Import Menu Tab
	  - Choose menu created in previous step
	  - Browse for Menu file uw-[top/footer]-menu.txt
	  - Options: Remove existing Menu Items
	* Click Upload and Preview
	* Click Import
	* Go to `admin/structure/block`
	* Scroll down to disabled and click configure next to the UW **[Top/Footer]** Menu block
	   - Block title: \<none\>
	   - Region Settings: Dropdowns for top menu, Footer for bottom menu
       - Save Block

## Menu Labels

The [Special_Menu_Items module](http://drupal.org/project/special_menu_items) allows you to create non-linking labels in your Drupal menus.

The UW-Drupal-Theme CSS files have been modified to work with this module.

After installing and enabling the module, you may add menu items to your Drupal menus which contain the <nolink> URL.

**Note**: After enabling the special_menu_items, navigate to the configuration page (`admin/config/system/special_menu_items`) and set the HTML tags for no link and separator to "<div".
