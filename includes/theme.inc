<?php
/*
 * Custom theme functions
 *
 */

# THEME_menu_link implementation
function uw_menu_link(array $variables) {

  $element = $variables['element'];
  $sub_menu = '';

  # normal menu style for menu_block__main_menu blocks
  if (in_array('menu_link__menu_block__main_menu', (array)$element['#theme'])) {
    # don't include "Home" links
    if ($element['#title'] == 'Home') {
      return;
    }
    return theme_menu_link($variables);
  }

  if (isset($element['#below']) && !empty($element['#below'])) {
    // add our own wrapper
    unset($element['#below']['#theme_wrappers']);
    $sub_menu = '<ul class="dropdown-menu" role="menu" aria-hidden="true">' . drupal_render($element['#below']) . '</ul>';
    $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
    $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';

    // Check if this element is nested within another
    if ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] > 1)) {
      // Generate as dropdown submenu
      $element['#attributes']['class'][] = 'dropdown-submenu';
    }
    else {
      // Generate as standard dropdown
      $element['#attributes']['class'][] = 'dropdown';
      $element['#localized_options']['html'] = TRUE;
      $element['#title'] .= '<span class="caret"></span>';
    }

    // Set dropdown trigger element to # to prevent inadvertant page loading with submenu click
    $element['#localized_options']['attributes']['data-target'] = '#';
  }

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

# THEME_menu_link__MENU_NAME implementation can be used for specific menus