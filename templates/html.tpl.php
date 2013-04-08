<!doctype html>
<!--[if IE 6]>
<html id="ie6" lang="<?php print $language->language; ?>">
<![endif]-->
<!--[if IE 7]>
<html id="ie7" lang="<?php print $language->language; ?>">
<![endif]-->
<!--[if IE 8]>
<html id="ie8" lang="<?php print $language->language; ?>">
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html lang="<?php print $language->language; ?>">
<!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
  <!-- HTML5 element and media query support for IE6-8 -->
  <!--[if lt IE 9]>
    <script src="<?php print $base_path . $directory; ?>/js/html5shiv.js"></script>
    <script src="<?php print $base_path . $directory; ?>/js/respond.min.js"></script>
    <link rel="stylesheet" type="text/css" href="<?php print $base_path . $directory ?>/css/ie8-and-down.css" />
  <![endif]-->
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>