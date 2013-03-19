<!doctype html>
<!--[if IE 6]>
<html id="ie6" dir="ltr" lang="en-US">
<![endif]-->
<!--[if IE 7]>
<html id="ie7" dir="ltr" lang="en-US">
<![endif]-->
<!--[if IE 8]>
<html id="ie8" dir="ltr" lang="en-US">
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html dir="ltr" lang="en-US">
<!--<![endif]-->
<head>


  <?php print $head; ?>

  <title><?php print $head_title; ?></title>

  <?php print $styles; ?>

  <?php print $scripts; ?>

  <!--[if lt IE 9]>
    <script src="<?php print $directory; ?>/js/html5shiv.js" type="text/javascript"></script>
    <script src="<?php print $directory; ?>/js/respond.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="<?php print $directory ?>/css/ie8-and-down.css" />
  <![endif]-->

</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>
