<?php
/*
 * Custom theme functions
 *
 */

# THEME_menu_link implementation
function uw_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  # normal menu style for blocks with theme key menu_link__menu_block
  $is_bootstrap = !in_array('menu_link__menu_block', (array)$element['#theme']);

  $delta = variable_get('dropdown_menu_block_delta');
  if (isset($element['#bid']) && $element['#bid']['delta'] == $delta) {
    $is_bootstrap = true;
  }

  if (!$is_bootstrap) {
    # don't include "Home" links
    if ($element['#title'] == 'Home') {
      return;
    }
    return theme_menu_link($variables);
  }

  if (isset($element['#below']) && !empty($element['#below'])) {
    $element['#localized_options']['attributes']['tabindex'] = '0';
    $safe_id = uw_id_safe($element['#title']);
    $element['#localized_options']['attributes']['id'] = "link-$safe_id";
    // add our own wrapper
    unset($element['#below']['#theme_wrappers']);
    $sub_menu = '<ul id="menu-' . $safe_id . '" class="dropdown-menu" role="menu" aria-labelledby="link-' . $safe_id . '" aria-hidden="true">' . drupal_render($element['#below']) . '</ul>';
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

    $element['#localized_options']['attributes']['data-target'] = '#';
    $element['#localized_options']['attributes']['data-menu-id'] = 'menu-' . $safe_id;
  }
  else {
    // tabindex="-1" for > first-level menu items
    $element['#localized_options']['attributes']['tabindex'] = '-1';
  }

  // Issue #1896674 - On primary navigation menu, class 'active' is not set on active menu item.
  // @see http://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']) || $element['#localized_options']['language']->language == $language_url->language)) {
    $element['#attributes']['class'][] = 'active';
  }
   $output = l($element['#title'], $element['#href'], $element['#localized_options']);
   return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

# THEME_menu_link__MENU_NAME implementation can be used for specific menus