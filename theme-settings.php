<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function uw_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL)  {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  // Create the form using Forms API: http://api.drupal.org/api/7

  $form['uw'] = array(
    '#type' => 'fieldset',
    '#title' => 'UW Theme',
    '#weight' => -40,
  );

  $form['uw']['show_patch'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show patch (W logo)'),
    '#default_value' => theme_get_setting('show_patch'),
  );

  $form['uw']['patch_color'] = array(
    '#type'          => 'radios',
    '#title'         => t('Patch color (W logo)'),
    '#default_value' => theme_get_setting('patch_color'),
    '#options' => drupal_map_assoc(array('gold', 'purple')),
  );

  $form['uw']['band_color'] = array(
    '#type'          => 'radios',
    '#title'         => t('Band color'),
    '#default_value' => theme_get_setting('band_color'),
    '#options' => drupal_map_assoc(array('purple', 'tan')),
  );


  // We are editing the $form in place, so we don't need to return anything.
}
