/* Create columns in the dropdown menu of "nth" length by wrapping <li.leaf> 
 * with <li.dropdown-submenu><ul.dropdwn-menu>
 *
 * This functionn will not wrap dropdown menus which contain <div> tags (as when using
 * the special_menu_items module to create custom columns.																																		 
*/


(function($) {
// jQuery stuff here

	$(document).ready( function() {

	/* wrap the dropdown menu in dropdown-submenu IFF the menu does not already contain DIV tags from the special_menu_options module */
	var nth = 7; //length of menu columns
	
	//topMenu = $('.region-dropdowns > section > ul.menu > li.dropdown ');
	topMenu = $('div#navbar-menu ul.menu > li.dropdown ');
		
		$.each( topMenu, function( index, value){  // for each dropdown menu
														
			var leaflist = $(this).find('ul.dropdown-menu > li.leaf'); //get the menu items
			var start = 0; //keep track of the end of the last column
						
			if( $(this).find('div').text() == ''){ //If there's a div in the menu it's likely from special_menu_items.module, don't add columns
			
				$.each( leaflist, function( index , value ){  // for each menu menu
					
					if ( index == leaflist.length-1  || index % nth == 0 && index != 0 ){ //leaf is the last or the nth (but not first)
						(index == leaflist.length-1) ? index++: index;  //if last leaf, increment index. NOTE: This can make the last column have nth+1 items. meh.
						leaflist.slice(start,index).wrapAll('<li class="expanded dropdown-submenu open"><ul class="dropdown-menu open"></ul></li>');
						start +=nth;
						
					} // end nth / last leaf
																				
				}); // leaflist loop
			
			} //end if find <div>
							
		}); //top menu loop
		
	}); //doument.ready()


})(jQuery);

