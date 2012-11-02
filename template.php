<?php

drupal_add_css('https://fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C400%2C300', 'external');

function uw_js_alter(&$javascript) {
  // Swap out jQuery to use an updated version of the library. 
  $javascript['misc/jquery.js']['data'] = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
}


function uw_menu_tree__main_menu(array $tree) {
  // note: no context exists here

  $dom = new DOMDocument();
  @$dom->loadHTML($tree['tree']);
  $lis = $dom->getElementsByTagName('li');
  $output = '';
  foreach ($lis as $index=>$li) {

    if ( $index % 7 == 0 )
      $output .= '<div class="menu-block">';

    $output .= $dom->saveXML($li);

    if ( $index % 7 == 6 || $index == $lis->length-1) 
      $output .= '</div>';

  }
  $tree['tree'] = $output;
  return '<ul role="menu" aria-hidden="true" class="dropdown-menu"><div class="menu-wrap"><div class="inner-wrap">'. $tree['tree'] .'</div></div></ul>';
}

function uw_menu_tree__main_menu__level1(array $tree) {
  // note: context forced ot be top level menu links
  return '<ul class="nav" role="menubar">'. $tree['tree'] .'</ul>';
}

function uw_block_view_alter(&$data, $block ) {
  // change the theme wrapper for the first level to force context
  if ($block->region == 'dropdowns') {
    $data['content']['#theme_wrappers'] = array('menu_tree__main_menu__level1');
  }
}

function uw_menu_link(array $variables) {
  //unset all the classes
  //unset($variables['element']['#attributes']['class']);

  $element = $variables['element'];

  $element['#attributes'] = array(
    'aria-haspopup' => 'true',
    'role' => 'menuitem', 
    'class'=> 'dropdown'
  );

  $element['#localized_options'] = array(
    'attributes' => array(
      'class'       => array('dropdown-toggle'),
      'data-toggle' => array('dropdown'),
      'tabindex'    => array('0')
    ),
    'html' => TRUE
  );

  $sub_menu = '';
  $caret = '';

  if ( $element['#original_link']['expanded'] 
        && $element['#original_link']['has_children'] ) 
  {
    $caret = '<b class="caret"></b>';
  } else {
    unset($element['#attributes']['class']);
  }

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  $output = l($element['#title'] . $caret , $element['#href'], $element['#localized_options'] );

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}
