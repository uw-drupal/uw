MENU_IMPORT 

The UW Drupal Theme develops have created a means of importing the UW menus into your Drupal 7 installation. This technique requires the installation of the "menu_import" module:
  http://drupal.org/project/menu_import

Using Drush:
Start a shell on your server and cd to your sites/all/modules directory
type: drush dl menu_import
type: drush en menu_import

Using Drupal
download the module from the link above and ftp the module to your /sites/all/modules directory.
Go to the /admin/modules page, locate the menu_import module select the module and save the changes.


MENU LABLES
The Special_Menu_Items module allows you to create non-linking labels in your Drupal menus.  http://drupal.org/project/special_menu_items
The uw_drupal7_themes css files have been modified to work with this module.

After installing and enabling the module, You may add menu items to your Drupal menus which contain the <nolink> URL.

NOTE: After enabling the special_menu_items, navigate to the configuration page: admin/config/system/special_menu_items and set the HTML tags for no link and separator to "<div".
