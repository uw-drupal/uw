<?php

/**
 * @file  
 * uw-menu-install.php
 *
 * INSTRUCTIONS:
 * 1) SSH to your drupal site root. 
 * 2) At the shell prompt type: 
 *    which drush 
 *    and then make a note of the path to drush. eg: /usr/lib/php/pear/drush
 * 3) At the shell prompt type: 
 *    drush php-script /path/to/theme/folder/uw-menu-install.php
 *    eg: drush php-script /sites/all/themes/UW-Drupal-Theme/uw-menu-install.php
 *
 * REQUIREMENTS:
 * Drush & the path/to/drush
 * UW-Drupal-Theme
 * menu_import maodule installed & enabled
 *
 * DESCRIPTION: 
 * Describe script. Get yes to continue.
 * Get path to drush from user. Save to .drush_path file in current directory
 * Confirm theme is enabled (path_to_theme);
 * Check that module menu-import is installed and enabled (system_list)
 * Check for menus - if they exist prompt to replace ( select from {menu_custom} table )
 * 
 */
 
echo "\nThis script will create and install 'uw-top-menu' and 'uw-footer-menu' in the current site.\n";
echo "Type 'yes' to continue: ";
$handle = fopen ("php://stdin","r");
$line = fgets($handle);
if(trim($line) != 'yes'){
    echo "SCRIPT NOT RUN. Exiting!\n";
    exit;
}


// --- The custom menus to be created
$menus = array(
	 array(
		 'menu_name' => 'uw-top-menu',
		 'title' => 'UW Top Menu',
		 'description' => 'Standard UW Menu that appears in the "Dropdowns" region',
		 'file_name' => 'uw-menu-top.txt',
		),
		array(
			'menu_name' => 'uw-footer-menu',
			'title' => 'UW Footer Menu',
			'description' => 'Standard UW Menu that appears in the "Footer Nav" region',
		 'file_name' => 'uw-menu-footer.txt',			
		),
	);



// --- Check Dependencies -----------------------
$errstring = '';

if ( file_exists( "./.drush_path" ) ){
	$path_to_drush = file_get_contents( "./.drush_path" );
}else{
		echo "\n### NOTICE ###\nThis script requires the path to drush (for example, /usr/lib/php/pear/drush)\n";
		echo "If you don't know the path, press [ctrl] + c to exit this script and then type:\n";
		echo "which drush \nat the shell prompt.\n";
		echo "What is the path to drush?:\n";		
		$line = fgets($handle);
		$path_to_drush = trim($line);
		$fh = fopen('./.drush_path', 'w'); 
		fwrite( $fh, $path_to_drush ); 
}

if(! is_executable( $path_to_drush ) ){
	echo "\n=== ERROR ===\nThe file specified in path to drush:\n\t$path_to_drush \ndoes not exist or is not executable. \nDelete the file .drush_path and try again.\n";
	exit;
}

$theme_path = path_to_theme();

if(! strstr( $theme_path , '/UW-Drupal-Theme') ){
	$errstring .= "UW-Drupal_Theme not active. Enable theme and set default prior to running script.\n";
}else{
	
	// Check that files exist in the theme folder
	foreach($menus as $menu) {
		if (! file_exists( $theme_path . "/" . $menu['file_name'] ) ) {
			$errstring .= "The file " . $menu['file_name'] . " is missing from UW-Drupal-Theme directory.\n";
		}
	}
}

if (! array_key_exists( 'menu_import' , system_list( 'module_enabled') ) ){
	$errstring .= "Menu Import module not enabled. Please enable module prior to running script.\n";
}

if ($errstring != ''){
	echo "\n==== ERROR ==== \n" . $errstring; 
	echo "ABORTING!\n";	
  exit;

}



// --- Create menus or get permission to replace them 

foreach($menus as $menu) {
  // Look the table first if the menu does exist
  $exists = db_query("SELECT title FROM {menu_custom} WHERE menu_name=:menu_name", array(':menu_name' => $menu['menu_name']))->fetchField();
	
	// If it does not exist, create and import
  if(!$exists) {
		menu_save($menu); //New menus inserted
		echo "The menu $menu[menu_name] was added to the website.\n";
		import_menu( $path_to_drush , $theme_path . "/" . $menu['file_name'] , $menu['menu_name'] );
		
	}else{
		// Menu exists, get permission first
		echo $menu['menu_name'] . " menu exists. Type 'yes' to replace it: ";
		$line = fgets($handle);
		if(trim($line) != 'yes'){
			next;
		}else{
			import_menu( $path_to_drush , $theme_path . "/" . $menu['file_name'] , $menu['menu_name'] );
		}
	}
}


drush_print("\n--- Script finished successfully --- \n");


function import_menu( $path_to_drush , $the_file , $the_menu ){
	`$path_to_drush menu-import $the_file $the_menu --clean-import` ;
	echo "\t$the_file was imported into $the_menu\n";
}