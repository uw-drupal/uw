<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 * @see html.tpl.php
 */
?>

<header id="branding" class="<?php print $patch_color;?>-patch <?php print $band_color;?>-band" style="<?php if (!$default_header): ?>background-image:url(<?php print $header_path; ?>);<?php endif; ?>" role="banner">

  <div id="header">
    <div class="skip-link"><a class="assistive-text" href="#content" title="Skip to primary content">Skip to primary content</a></div>
    <div class="skip-link"><a class="assistive-text" href="#secondary" title="Skip to sidebar content">Skip to sidebar content</a></div>

    <?php if ($show_patch): ?><a class="patch" href="http://www.washington.edu/"><img id="logo_w" src="<?php print $base_path . path_to_theme() ?>/img/header/logo_w-fs8.png" alt="University of Washington" /></a>
    <?php endif; ?>
    <a class="wordmark" href="<?php print $front_page; ?>"><img src="<?php print $logo; ?>" alt="<?php print $site_name; ?>"></a>
    <?php if ($show_search): ?>
    <a title="Show search" role="button" href="#searchicon-wrapper" id="searchicon-wrapper" class="visible-phone" aria-haspopup="true">Search</a>
    <div id="search">
      <form role="search" class="main-search" action="http://www.washington.edu/search" id="searchbox_008816504494047979142:bpbdkw8tbqc" name="form1">
        <span class="wfield">
          <input value="008816504494047979142:bpbdkw8tbqc" name="cx" type="hidden">
          <input value="FORID:0" name="cof" type="hidden">
          <label for="q" class="hide">Search the UW</label>
          <input id="q" class="wTextInput" placeholder="Search the UW" title="Search the UW" name="q" type="text" autocomplete="off">
            <input value="Go" name="sa" class="formbutton" type="submit">
          </span>
      </form>

      <span class="search-toggle"></span>
      <div class="search-options">
        <label class="radio">
          <input type="radio" name="search-toggle" value="main" <?php if ($search_default_site == 'UW'): ?>checked="checked"<?php endif; ?> data-placeholder="the UW">
          UW.edu
        </label>
        <label class="radio">
          <input type="radio" name="search-toggle" value="directory" data-placeholder="the Directory"/>
          UW Directory
        </label>
        <label class="radio">
          <input type="radio" name="search-toggle" value="site" data-site="<?php print url('', array('absolute'=>true)); ?>" <?php if ($search_default_site == 'this site'): ?>checked="checked"<?php endif; ?> data-placeholder="<?php print $site_name; ?>"/>
          This site
        </label>

        <span class="search-options-notch"></span>
      </div>

    </div>
    <?php endif; ?>
    <a title="Show menu" role="button" href="#listicon-wrapper" id="listicon-wrapper" class="visible-phone" aria-haspopup="true">Menu</a>
  </div><!-- #header -->

  <div class="thinstrip">
    <div class="thinstrip-inner">
      <ul role="navigation">
        <li><a href="http://www.washington.edu/">UW Home</a></li>
        <li><a href="http://www.washington.edu/home/directories.html">Directories</a></li>
        <li><a href="http://www.washington.edu/discover/visit/uw-events">Calendar</a></li>
        <li><a href="http://www.lib.washington.edu/">Libraries</a></li>
        <li><a href="http://www.washington.edu/maps">Maps</a></li>
        <li><a href="http://myuw.washington.edu/">My UW</a></li>
        <li class="visible-desktop"><a href="http://www.bothell.washington.edu/">UW Bothell</a></li>
        <li class="visible-desktop"><a href="http://www.tacoma.uw.edu/">UW Tacoma</a></li>
        <li class="visible-phone"><a href="http://www.uw.edu/news">News</a></li>
        <li class="visible-phone"><a href="http://www.gohuskies.com/">UW Athletics</a></li>
      </ul>
    </div>
  </div><!-- .thinstrip -->


  <h3 class="assistive-text">Main menu</h3>

  <div id="navbar-menu" class="navbar">
    <div class="navbar-inner">
      <div class="container">
        <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
        <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse" title="Open Navigation" href="#menu" tabindex="0" role="button" aria-haspopup="true">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>
        <span class="navbar-caret" style="position:absolute;"></span>
        <h3 class="visible-phone"><a href="<?php print $front_page; ?>"><?php print $site_name; ?></a></h3>

        <!-- Everything you want collapsed on smaller screens goes here -->
        <div class="nav-collapse collapse">
          <nav id="access" role="navigation" aria-label="Main menu">
            <?php if (!empty($primary_nav)): ?>
               <?php print render($primary_nav); ?>
            <?php endif; ?>
            <?php if ($page['dropdowns']): print render($page['dropdowns']); endif; ?> <!-- [TODO]: need uw_dropdowns() port -->
          </nav>
        </div>
      </div>
    </div>
  </div>

  <?php if (!empty($secondary_nav) || !empty($page['navigation'])): ?>
    <div class="nav-collapse collapse">
      <nav role="navigation" aria-label="Secondary menu">
        <?php if (!empty($page['navigation'])): ?>
          <?php print render($page['navigation']); ?>
        <?php endif; ?>
        <?php if (!empty($secondary_nav)): ?>
          <?php //print render($secondary_nav); ?>
        <?php endif; ?>
      </nav>
    </div>
  <?php endif; ?>

</header>

<?php print $messages; ?>

<div class="container container-primary">

   <div class="row show-grid">

     <?php if ($page['sidebar_first']): ?>
       <div class="span<?php print $sidebar_width ?> sidebar sidebar-left" role="complementary">
         <?php print render($page['sidebar_first']); ?>
       </div> <!-- #secondary -->
     <?php endif; ?>

     <div id="content" role="main" class="span<?php print $content_width; ?> column">
       <div class="divider inner">
         <header class="entry-header">
           <?php print render($title_prefix); ?>
           <?php if (!empty($title)): ?>
             <h1 class="entry-title"><?php print $title; ?></h1>
           <?php endif; ?>
           <?php print render($title_suffix); ?>
         </header>

         <div id="tabs">
           <?php if ($tabs): ?>
             <div class="tabs"><?php print render($tabs); ?></div>
           <?php endif; ?>
         </div>

         <span id="arrow-mark"></span>

         <?php print render($page['content']); ?>
       </div> <!-- #content .inner -->
     </div> <!-- #content -->

     <?php if ($page['sidebar_second']): ?>
       <div class="span<?php print $sidebar_width ?> sidebar sidebar-right" role="complementary">
         <?php print render($page['sidebar_second']); ?>
       </div> <!-- #secondary -->
     <?php endif; ?>

   </div><!-- .row.show-grid -->

 </div><!-- .container --> <!-- #primary-->


<div id="footerBG">
  <div id="footer" role="navigation" aria-label="Global Footer Menu">
    <h2>Explore <?php print empty($site_name) ? 'UW' : $site_name; ?></h2>
    <div class="menu-global-footer-container">
      <?php print render($page['footer_nav']); ?>
    </div>
  </div>
</div>

<footer id="footer-main" role="contentinfo">
  <div id="footer-right">
    <a href="http://www.seattle.gov/">Seattle, Washington</a>
  </div>
  <ul>
    <li><a href="http://www.washington.edu/home/siteinfo/form">Contact Us</a></li>
    <li><a href="http://www.washington.edu/jobs">Jobs</a></li>
    <li><a href="http://myuw.washington.edu/">My UW</a></li>
    <li><a href="http://www.washington.edu/admin/rules/wac/rulesindex.html">Rules Docket</a></li>
    <li><a href="http://www.washington.edu/online/privacy">Privacy</a></li>
    <li><a href="http://www.washington.edu/online/terms">Terms</a></li>
  </ul>
  <div id="footer-left">
  <?php if ($page['footer_left']): ?>
    <?php print render($page['footer_left']); ?>
  <?php else: ?>
    <a href="http://www.washington.edu/">&copy; 2013 University of Washington</a>
  <?php endif; ?>
  </div>
</footer>
