/* Create columns in the dropdown menu 
 * 
 * "numitems" variable lets you determine the max length of a menu before it starts creating columns.                                                                     
*/

jQuery(document).ready(function($) {
  
  columnify();
  
  function columnify(){
                                  
    var numitems = 9;  //The maximum number of items you want in each column of the dropdown
    var dd_menu = $('div.navbar-inner > div > div > nav > div > section > ul.menu > li');  //the dropdowns object
      $.each( dd_menu , function( ){
        
        if ($(window).width() > 760){  
            var colcount = '' + Math.ceil( $(this).find('ul>li').length / numitems );
            var colwidth = '' + 220 * colcount;
    
        }else{
            var colcount = '' + 1;
            var colwidth = '100%';
        }
        
        $(this).find('ul').css( { 'column-count':colcount , '-moz-column-count': colcount , '--webkit-column-count': colcount , 'width': colwidth + 'px'  } );
			  // $(this).find('ul').addClass( 'menu-column-' + colcount ); // tried this but it doesnt' seem to work in webkit.
				
				
      });

  }

  $(window).resize(function() {
    columnify();
  });
  
});

