/* Create columns in the dropdown menu 
 * 
 * "numitems" variable lets you determine the max length of a menu before it starts creating columns.																																		 
*/

jQuery(document).ready(function($) {
   var numitems = 9;  //The maximum number of items you want in each column of the dropdown
   var dd_menu = $('div.navbar-inner > div > div > nav > div > section > ul.menu > li');  //the dropdowns object
   $.each( dd_menu , function( ){
       var colcount = '' + Math.ceil( $(this).find('ul>li').length / numitems );
       $(this).find('ul').css( { 'column-count':colcount , '-moz-column-count':colcount ,  '--webkit-column-count':colcount  } );
    });
  
});

