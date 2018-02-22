<!--start: sidebar -->

<div id="throbber" style="display:none; min-height:120px;"></div>
<div id="noty-holder"></div>


<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
<aside id="sidebar-left" class="sidebar-left">

    <div class="sidebar-header">
        <div class="sidebar-title">
            Wintage Shop
        </div>
        <div class="sidebar-toggle hidden-xs" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
            <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
        </div>
    </div>

    <div class="nano">
        <div class="nano-content">
            <nav id="menu" class="nav-main" role="navigation">

                <ul class="nav nav-main">
                    <li>
                        <a class="nav-link" href="<?php echo base_url('index.php/home');?>">
                            <i class="fa fa-home" aria-hidden="true"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li class="nav-parent">
                        <a class="nav-link" href="#">
                            <i class="fa fa-columns" aria-hidden="true"></i>
                            <span>Category</span>
                        </a>
                        <ul class="nav nav-children">
                            <li>
                               <!--  <a class="nav-link" href="/cms/product/category">
                                    List
                                </a> -->
                                 <a class="nav-link" href="<?php echo base_url('index.php/category');?>">
                                    List
                                </a>
                            </li>
                            <li>
                                <!-- <a class="nav-link" href="/cms/product/category/create">
                                    Create
                                </a> -->
                                 <a class="nav-link" href="<?php echo base_url('index.php/category/create');?>">
                                    Create
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-parent">
                        <a class="nav-link" href="#">
                            <i class="fa fa-columns" aria-hidden="true"></i>
                            <span>Products</span>
                        </a>
                        <ul class="nav nav-children">
                            <li>
                                <a class="nav-link" href="/cms/product">
                                    List
                                </a>
                            </li>
                            <li>
                                <a class="nav-link" href="/cms/product/create">
                                    Create
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <script>
                // Maintain Scroll Position
                if (typeof localStorage !== 'undefined') {
                    if (localStorage.getItem('sidebar-left-position') !== null) {
                        var initialPosition = localStorage.getItem('sidebar-left-position'),
                            sidebarLeft = document.querySelector('#sidebar-left .nano-content');

                        sidebarLeft.scrollTop = initialPosition;
                    }
                }
            </script>
        </div>
    </div>
</aside>
 </nav>
<!-- end: sidebar-->






    <!-- Navigation -->
    <!-- <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation"> -->
        <!-- Brand and toggle get grouped for better mobile display -->
       <!--  <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="http://cijulenlinea.ucr.ac.cr/dev-users/">
                <img src="http://placehold.it/200x50&text=LOGO" alt="LOGO"">
            </a>
        </div> -->
        <!-- Top Menu Items -->
        <!-- <ul class="nav navbar-right top-nav"> -->
           <!--  <li><a href="#" data-placement="bottom" data-toggle="tooltip" href="#" data-original-title="Stats"><i class="fa fa-bar-chart-o"></i>
                </a>
            </li>        -->     
          <!--   <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Admin User <b class="fa fa-angle-down"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="#"><i class="fa fa-fw fa-user"></i> Edit Profile</a></li>
                    <li><a href="#"><i class="fa fa-fw fa-cog"></i> Change Password</a></li>
                    <li class="divider"></li>
                    <li><a href="#"><i class="fa fa-fw fa-power-off"></i> Logout</a></li>
                </ul>
            </li> -->
        <!-- </ul> -->
        <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
        <!-- <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav side-nav">
                <li>
                    <a href="#" data-toggle="collapse" data-target="#submenu-1"><i class="fa fa-fw fa-search"></i> MENU 1 <i class="fa fa-fw fa-angle-down pull-right"></i></a>
                    <ul id="submenu-1" class="collapse">
                        <li><a href="#"><i class="fa fa-angle-double-right"></i> SUBMENU 1.1</a></li>
                        <li><a href="#"><i class="fa fa-angle-double-right"></i> SUBMENU 1.2</a></li>
                        <li><a href="#"><i class="fa fa-angle-double-right"></i> SUBMENU 1.3</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#" data-toggle="collapse" data-target="#submenu-2"><i class="fa fa-fw fa-star"></i>  MENU 2 <i class="fa fa-fw fa-angle-down pull-right"></i></a>
                    <ul id="submenu-2" class="collapse">
                        <li><a href="#"><i class="fa fa-angle-double-right"></i> SUBMENU 2.1</a></li>
                        <li><a href="#"><i class="fa fa-angle-double-right"></i> SUBMENU 2.2</a></li>
                        <li><a href="#"><i class="fa fa-angle-double-right"></i> SUBMENU 2.3</a></li>
                    </ul>
                </li>
                <li>
                    <a href="investigaciones/favoritas"><i class="fa fa-fw fa-user-plus"></i>  MENU 3</a>
                </li>
                <li>
                    <a href="sugerencias"><i class="fa fa-fw fa-paper-plane-o"></i> MENU 4</a>
                </li>
                <li>
                    <a href="faq"><i class="fa fa-fw fa fa-question-circle"></i> MENU 5</a>
                </li>
            </ul>
        </div> -->
        <!-- /.navbar-collapse -->
    <!-- </nav> -->

    <!--  -->
    <!-- /#page-wrapper -->
<!-- </div>-->
<!-- /#wrapper  -->