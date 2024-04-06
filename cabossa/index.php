<!DOCTYPE html>
<html lang="en">

<head>
<?php include 'connessione.php';?>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <meta name="description" content="Babette">
  <link href="assets/images/favicon/favicon.png" rel="icon">
  <title>Elroyale Restaurant and Cafe</title>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Kristi%7cPoppins:400,500,600,700%7cYeseva+One&display=swap">
  <link rel="stylesheet" href="assets/css/libraries.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
</head>

<body>
  <div class="wrapper">

    <!-- =========================
        Header
    =========================== -->
    <header class="header header-transparent header-layout3">
      <nav class="navbar navbar-expand-lg sticky-navbar">
        <div class="container">
          <a class="navbar-brand" href="index.php">
            <img src="assets/images/logo/logo-light.png" class="logo-light" alt="logo">
            <img src="assets/images/logo/logo-dark.png" class="logo-dark" alt="logo">
          </a>
          <button class="navbar-toggler" type="button">
            <span class="menu-lines"><span></span></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavigation">
            <div class="navbar-actions d-flex align-items-center">
              <a href="reservation.html"
                class="navbar__action-btn navbar__action-btn-reserve btn ml-0 mr-30">Reservation</a>
            </div>
            <ul class="navbar-nav">
              <li class="nav__item">
                <a href="index.php" class="nav__item-link active">Home</a>
                <ul class="dropdown-menu">
                  <li class="nav__item"><a href="index.html" class="nav__item-link">Home page 1</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="home-2.html" class="nav__item-link">Home page 2</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="home-3.html" class="nav__item-link">Home page 3</a></li>
                  <!-- /.nav-item -->
                </ul><!-- /.dropdown-menu -->
              </li><!-- /.nav-item -->
              <li class="nav__item">
                <a href="menu.php" class="nav__item-link">Menu</a>
              </li><!-- /.nav-item -->
              <li class="nav__item with-dropdown">
                <a href="#" data-toggle="dropdown" class="dropdown-toggle nav__item-link">Blog</a>
                <ul class="dropdown-menu">
                  <li class="nav__item"><a href="blog-carousel.html" class="nav__item-link">blog carousel</a></li>
                  <li class="nav__item dropdown-submenu">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle nav__item-link">Blog Grid</a>
                    <ul class="dropdown-menu">
                      <li class="nav__item">
                        <a href="blog-grid-sidebar.html" class="nav__item-link">Grid Sidebar</a>
                      </li><!-- /.nav-item -->
                      <li class="nav__item">
                        <a href="blog-grid.html" class="nav__item-link">No Sidebar</a>
                      </li><!-- /.nav-item -->
                    </ul><!-- /.dropdown-menu -->
                  </li><!-- /.nav-item -->
                  <li class="nav__item"><a href="blog-standard.html" class="nav__item-link">blog standard</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="blog-single-post.html" class="nav__item-link">single post</a></li>
                  <!-- /.nav-item -->
                </ul><!-- /.dropdown-menu -->
              </li><!-- /.nav-item -->
              <li class="nav__item with-dropdown">
                <a href="#" data-toggle="dropdown" class="dropdown-toggle nav__item-link">About</a>
                <ul class="dropdown-menu">
                  <li class="nav__item"><a href="our-story.html" class="nav__item-link">our story</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="our-chefs.html" class="nav__item-link">Our chefs</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="our-guestbook.html" class="nav__item-link">Our Guestbook</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="contacts.html" class="nav__item-link">Contact Us</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="events.html" class="nav__item-link">Events</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="event-single.html" class="nav__item-link">Event Single</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="faqs.html" class="nav__item-link">FAQs</a></li> <!-- /.nav-item -->
                </ul><!-- /.dropdown-menu -->
              </li><!-- /.nav-item -->
              <li class="nav__item with-dropdown">
                <a href="#" data-toggle="dropdown" class="dropdown-toggle nav__item-link">Gallery</a>
                <ul class="dropdown-menu">
                  <li class="nav__item"><a href="gallery-grid.html" class="nav__item-link">Gallery grid</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="gallery-fullwidth.html" class="nav__item-link">Gallery Fullwidth</a>
                  </li><!-- /.nav-item -->
                </ul><!-- /.dropdown-menu -->
              </li><!-- /.nav-item -->
              <li class="nav__item">
                <a href="contatti.php" class="nav__item-link">Contatti</a>
              </li><!-- /.nav-item -->
            </ul><!-- /.navbar-nav -->
          </div><!-- /.navbar-collapse -->
          <div class="navbar-actions-wrap">
            <div class="navbar-actions d-flex align-items-center">
              <ul class="social__icons">
                <li><a href="https://www.instagram.com/cabossa_lab/" target="_blank"><i class="fa fa-instagram"></i></a></li>
                <li><a href="https://www.facebook.com/cabossacioccolateriaegelateria" target="_blank"><i class="fa fa-facebook"></i></a></li>
              </ul>
              <a href="#" class="navbar__action-btn hamburger-menu-trigger"><i class="fa fa-bars"></i></a>
            </div><!-- /.navbar-actions -->
          </div><!-- /.navbar-actions-wrap -->
        </div><!-- /.container -->
      </nav><!-- /.navabr -->
    </header><!-- /.Header -->

    <!-- ========================
    Slider
    ============================== -->
    <section id="slider" class="slider slider-layout1">
      <div class="carousel owl-carousel carousel-arrows carousel-dots carousel-dots-light" data-slide="1"
        data-slide-md="1" data-slide-sm="1" data-autoplay="true" data-nav="true" data-dots="true" data-space="0"
        data-loop="true" data-speed="3000" data-transition="fade" data-animate-out="fadeOut" data-animate-in="fadeIn">
        <div class="slide-item align-v-h text-center bg-overlay">
          <div class="bg-img"><img src="assets/images/backgrounds/1.jpg" alt="slide img"></div>
          <div class="container">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-1">
                <div class="slide__content">
                  <span class="slide__subtitle">Soddisfa Il Tuo Palato</span>
                  <h2 class="slide__title">Assapora Il Vero<br>Gusto Dell'Estasi</h2>
                  <a href="menu.php" class="btn btn__primary">Menu</a>
                </div><!-- /.slide-content -->
              </div><!-- /.col-lg-10 -->
            </div><!-- /.row -->
          </div><!-- /.container -->
        </div><!-- /.slide-item -->
        <div class="slide-item align-v-h text-center bg-overlay">
          <div class="bg-img"><img src="assets/images/backgrounds/18.jpg" alt="slide img"></div>
          <div class="container">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-1">
                <div class="slide__content">
                  <span class="slide__subtitle">Fresh Ingredient, Tasty Meals</span>
                  <h2 class="slide__title">We Make <br> Delicious Food</h2>
                  <a href="reservation.html" class="btn btn__white btn__bordered">Book A Table</a>
                </div><!-- /.slide-content -->
              </div><!-- /.col-lg-10 -->
            </div><!-- /.row -->
          </div><!-- /.container -->
        </div><!-- /.slide-item -->
      </div><!-- /.carousel -->
    </section><!-- /.slider -->

    <!-- =====================
       Banner layout2
    ======================== -->
    <section class="banner banner-layout2">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="banner__text text-center mt-30" data-aos="fade-right">
              <div class="heading heading-layout1 mb-20">
                <span class="heading__subtitle">Welcome To El Royale</span>
                <h2 class="heading__title">Delicious Food & Cozy Atmosphere</h2>
                <div class="heading__icon">
                  <img src="assets/images/shapes/shape2.png" alt="heading img">
                </div>
                <p class="heading__desc">El Royale was the first restaurant to open in Egypt, the resturant was designed
                  with the history in mind we have created a soft industrial dining room.</p>
              </div><!-- /.heading -->
              <img src="assets/images/about/signature.png" alt="signature">
            </div><!-- /.banner__text -->
          </div><!-- /.col-lg-4 -->
          <div class="col-6 col-sm-6 col-md-3 col-lg-4">
            <div class="banner__img mt-30" data-aos="fade-left" data-aos-delay=".5s">
              <img src="assets/images/banners/3.jpg" alt="banner" class="img-fluid">
            </div><!-- /.banner__img -->
          </div><!-- /.col-lg-4 -->
          <div class="col-6 col-sm-6 col-md-3 col-lg-4">
            <div class="banner__img" data-aos="fade-left">
              <img src="assets/images/banners/4.jpg" alt="banner" class="img-fluid">
            </div><!-- /.banner__img -->
          </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->
      </div><!-- /.container -->
    </section><!-- /.Banner layout2 -->

    <!-- ========================
       Call to Action Layout3
    =========================== -->
    <section class="cta-layout2 cta-layout3 text-center bg-overlay bg-overlay-2 bg-parallax">
      <div class="bg-img"><img src="assets/images/backgrounds/3.jpg" alt="background"></div>
      <div class="divider-shape"></div>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <span class="cta__subtitle">We Create Delicious Memories</span>
            <h2 class="cta__title">Take A Taste & Come Join Us</h2>
          </div><!-- /.col-lg-12 -->
        </div><!-- /.row -->
      </div><!-- /.container -->
    </section><!-- /.Call to Action Layout 3 -->

    <!-- ========================
        Menu layout 2
    =========================== -->
    <section class="menu-layout2 pb-70">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div class="heading text-center mb-30">
              <span class="heading__subtitle">What’s For Lunch?</span>
              <h2 class="heading__title">Our Daily Specials</h2>
              <div class="heading__icon">
                <img src="assets/images/shapes/shape2.png" alt="heading img">
              </div>
            </div><!-- /.heading -->
          </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="menu-wrapper mb-20">
              <div class="menu-item">
                <div class="menu__item-img"><img src="assets/images/menu/1.jpg" alt="menu img"></div>
                <div class="menu__item-content">
                  <h4 class="menu__item-title">Grilled Fillet</h4>
                  <p class="menu__item-desc">Pork fillet, ginger, garlic, honey, pepper & canola oil fillet,
                    ginger.</p>
                  <span class="menu__item-price">$26.95</span>
                </div>
              </div><!-- /.menu-item -->
              <div class="menu-item">
                <div class="menu__item-img"><img src="assets/images/menu/5.jpg" alt="menu img"></div>
                <div class="menu__item-content">
                  <h4 class="menu__item-title">Smoked Paprika Hummus</h4>
                  <p class="menu__item-desc">Red peppers, roasted garlic, lemon slices, olives & mint.Red peppers.</p>
                  <span class="menu__item-price">$13.95</span>
                </div>
              </div><!-- /.menu-item -->
              <div class="menu-item">
                <div class="menu__item-img"><img src="assets/images/menu/7.jpg" alt="menu img"></div>
                <div class="menu__item-content">
                  <h4 class="menu__item-title">Roasted Steak Roulade</h4>
                  <p class="menu__item-desc">Mint parsley with apple cider salt & spices, parsley with apple
                    cider.</p>
                  <span class="menu__item-price">$29.95</span>
                </div>
              </div><!-- /.menu-item -->
            </div><!-- /.menu-wrapper -->
          </div><!-- /.col-lg-6 -->
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="menu-wrapper mb-20">
              <div class="menu-item">
                <div class="menu__item-img"><img src="assets/images/menu/2.jpg" alt="menu img"></div>
                <div class="menu__item-content">
                  <h4 class="menu__item-title">Alder Grilled Seafood Paella</h4>
                  <p class="menu__item-desc">Monkfish, onion, paella rice,smoked paprika, Monkfish, onion</p>
                  <span class="menu__item-price">$40.95</span>
                </div>
              </div><!-- /.menu-item -->
              <div class="menu-item">
                <div class="menu__item-img"><img src="assets/images/menu/6.jpg" alt="menu img"></div>
                <div class="menu__item-content">
                  <h4 class="menu__item-title">Sea Trout</h4>
                  <p class="menu__item-desc">Roast trout, English asparagus, watercress & watercress & royals.</p>
                  <span class="menu__item-price">$44.95</span>
                </div>
              </div><!-- /.menu-item -->
              <div class="menu-item">
                <div class="menu__item-img"><img src="assets/images/menu/3.jpg" alt="menu img"></div>
                <div class="menu__item-content">
                  <h4 class="menu__item-title">Chicken Breast</h4>
                  <p class="menu__item-desc">Paupiette of chicken, cheese & beans. Paupiette of chicken</p>
                  <span class="menu__item-price">$33.95</span>
                </div>
              </div><!-- /.menu-item -->
            </div><!-- /.menu-wrapper -->
          </div><!-- /.col-lg-6 -->
        </div><!-- /.row  -->
      </div><!-- /.container -->
    </section><!-- /.menu layout 2 -->

    <!-- ========================
       text Banner Layout 1
    =========================== -->
    <section class="text-banner text-banner-layout1 text-center bg-overlay bg-overlay-gradient bg-parallax">
      <div class="bg-img"><img src="assets/images/backgrounds/12.jpg" alt="background"></div>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <span class="banner__subtitle">Made With Love</span>
            <h2 class="banner__title">Our Delicious Food</h2>
          </div><!-- /.col-lg-12 -->
        </div><!-- /.row -->
      </div><!-- /.container -->
    </section><!-- /.text Banner Layout 1 -->

    <!-- ========================
        Menu layout 1
    =========================== -->
    <section class="menu-layout1 pb-80">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div class="heading heading-layout1 text-center mb-50">
              <span class="heading__subtitle">Our Favourites</span>
              <h2 class="heading__title">Discover Our Menu</h2>
              <div class="heading__icon">
                <img src="assets/images/shapes/shape2.png" alt="heading img">
              </div>
              <p class="heading__desc">Since our grand opening in May 1995, El Royale has won great awards from food
                critics and organizations all over the world.</p>
            </div><!-- /.heading -->
          </div><!-- /.col-lg-6 -->
        </div>
        <div class="row">
          <div class="col-sm-12">
            <nav class="nav nav-tabs justify-content-center border-0">
              <a class="nav__link active" data-toggle="tab" href="#tab1">Lunch</a>
              <a class="nav__link" data-toggle="tab" href="#tab2">Dinner</a>
              <a class="nav__link" data-toggle="tab" href="#tab3">Dessert</a>
              <a class="nav__link" data-toggle="tab" href="#tab4">Drinks</a>
            </nav>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab1">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/1.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Smoked Meat Sandwich</h4>
                      <span class="menu__item-price">$12.95</span>
                      <p class="menu__item-desc">Baguette, basil, arugula, olives, cherry-tomatoes.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Sandwich</h4>
                      <span class="menu__item-price">$15.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Pan of Fried Eggs</h4>
                      <span class="menu__item-price">$13.95</span>
                      <p class="menu__item-desc">Eggs, bacon and cherry-tomatoes with bread.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Breakfast Set</h4>
                      <span class="menu__item-price">$20.95</span>
                      <p class="menu__item-desc">Croissants with strawberries, mascarpone, honey.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Healthy Breakfast</h4>
                      <span class="menu__item-price">$18.95</span>
                      <p class="menu__item-desc">Oat granola with fresh blueberries, almond.</p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-4 -->
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/2.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Traditional pancakes</h4>
                      <span class="menu__item-price">$8.95</span>
                      <p class="menu__item-desc">Paupiette of chicken, blue cheese, rosemary.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">American Brunch</h4>
                      <span class="menu__item-price">$14.95</span>
                      <p class="menu__item-desc">Applewood smoked bacon, tomatoes</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Cannoli with cream cheese</h4>
                      <span class="menu__item-price">$15.95</span>
                      <p class="menu__item-desc">Cheese, eggs, strawberries, butter & maple </p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chocolate Cherry Cake</h4>
                      <span class="menu__item-price">$9.95</span>
                      <p class="menu__item-desc">Vanilla, milk, dark chocolate, cherries</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Pain au chocolat</h4>
                      <span class="menu__item-price">$3.95</span>
                      <p class="menu__item-desc">Homemade croissant contain a bar of </p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-4 -->
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/3.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chicken Breast</h4>
                      <span class="menu__item-price">$33.95</span>
                      <p class="menu__item-desc">Paupiette of chicken, blue cheese, rosemary.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Steak</h4>
                      <span class="menu__item-price">$41.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chicken Crispy</h4>
                      <span class="menu__item-price">$33.95</span>
                      <p class="menu__item-desc">Smoked quail, crispy egg, spelt, girolles, parsley.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Grilled Fillet</h4>
                      <span class="menu__item-price">$26.95</span>
                      <p class="menu__item-desc">Pork fillet, ginger, garlic, honey, pepper & oil.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Steak</h4>
                      <span class="menu__item-price">$27.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-6 -->
                </div><!-- /.row  -->
              </div><!-- /.tab-pane  -->
              <div class="tab-pane fade" id="tab2">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/2.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Traditional pancakes</h4>
                      <span class="menu__item-price">$8.95</span>
                      <p class="menu__item-desc">Paupiette of chicken, blue cheese, rosemary.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">American Brunch</h4>
                      <span class="menu__item-price">$14.95</span>
                      <p class="menu__item-desc">Applewood smoked bacon, tomatoes</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Cannoli with cream cheese</h4>
                      <span class="menu__item-price">$15.95</span>
                      <p class="menu__item-desc">Cheese, eggs, strawberries, butter & maple </p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chocolate Cherry Cake</h4>
                      <span class="menu__item-price">$9.95</span>
                      <p class="menu__item-desc">Vanilla, milk, dark chocolate, cherries</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Pain au chocolat</h4>
                      <span class="menu__item-price">$3.95</span>
                      <p class="menu__item-desc">Homemade croissant contain a bar of </p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-4 -->
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/1.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Smoked Meat Sandwich</h4>
                      <span class="menu__item-price">$12.95</span>
                      <p class="menu__item-desc">Baguette, basil, arugula, olives, cherry-tomatoes.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Sandwich</h4>
                      <span class="menu__item-price">$15.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Pan of Fried Eggs</h4>
                      <span class="menu__item-price">$13.95</span>
                      <p class="menu__item-desc">Eggs, bacon and cherry-tomatoes with bread.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Breakfast Set</h4>
                      <span class="menu__item-price">$20.95</span>
                      <p class="menu__item-desc">Croissants with strawberries, mascarpone, honey.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Healthy Breakfast</h4>
                      <span class="menu__item-price">$18.95</span>
                      <p class="menu__item-desc">Oat granola with fresh blueberries, almond.</p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-4 -->
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/3.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chicken Breast</h4>
                      <span class="menu__item-price">$33.95</span>
                      <p class="menu__item-desc">Paupiette of chicken, blue cheese, rosemary.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Steak</h4>
                      <span class="menu__item-price">$41.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chicken Crispy</h4>
                      <span class="menu__item-price">$33.95</span>
                      <p class="menu__item-desc">Smoked quail, crispy egg, spelt, girolles, parsley.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Grilled Fillet</h4>
                      <span class="menu__item-price">$26.95</span>
                      <p class="menu__item-desc">Pork fillet, ginger, garlic, honey, pepper & oil.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Steak</h4>
                      <span class="menu__item-price">$27.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-6 -->
                </div><!-- /.row  -->
              </div><!-- /.tab-pane  -->
              <div class="tab-pane fade" id="tab3">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/3.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chicken Breast</h4>
                      <span class="menu__item-price">$33.95</span>
                      <p class="menu__item-desc">Paupiette of chicken, blue cheese, rosemary.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Steak</h4>
                      <span class="menu__item-price">$41.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chicken Crispy</h4>
                      <span class="menu__item-price">$33.95</span>
                      <p class="menu__item-desc">Smoked quail, crispy egg, spelt, girolles, parsley.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Grilled Fillet</h4>
                      <span class="menu__item-price">$26.95</span>
                      <p class="menu__item-desc">Pork fillet, ginger, garlic, honey, pepper & oil.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Steak</h4>
                      <span class="menu__item-price">$27.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-6 -->
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/1.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Smoked Meat Sandwich</h4>
                      <span class="menu__item-price">$12.95</span>
                      <p class="menu__item-desc">Baguette, basil, arugula, olives, cherry-tomatoes.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Sandwich</h4>
                      <span class="menu__item-price">$15.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Pan of Fried Eggs</h4>
                      <span class="menu__item-price">$13.95</span>
                      <p class="menu__item-desc">Eggs, bacon and cherry-tomatoes with bread.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Breakfast Set</h4>
                      <span class="menu__item-price">$20.95</span>
                      <p class="menu__item-desc">Croissants with strawberries, mascarpone, honey.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Healthy Breakfast</h4>
                      <span class="menu__item-price">$18.95</span>
                      <p class="menu__item-desc">Oat granola with fresh blueberries, almond.</p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-4 -->
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/2.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Traditional pancakes</h4>
                      <span class="menu__item-price">$8.95</span>
                      <p class="menu__item-desc">Paupiette of chicken, blue cheese, rosemary.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">American Brunch</h4>
                      <span class="menu__item-price">$14.95</span>
                      <p class="menu__item-desc">Applewood smoked bacon, tomatoes</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Cannoli with cream cheese</h4>
                      <span class="menu__item-price">$15.95</span>
                      <p class="menu__item-desc">Cheese, eggs, strawberries, butter & maple </p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chocolate Cherry Cake</h4>
                      <span class="menu__item-price">$9.95</span>
                      <p class="menu__item-desc">Vanilla, milk, dark chocolate, cherries</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Pain au chocolat</h4>
                      <span class="menu__item-price">$3.95</span>
                      <p class="menu__item-desc">Homemade croissant contain a bar of </p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-4 -->
                </div><!-- /.row  -->
              </div><!-- /.tab-pane  -->
              <div class="tab-pane fade" id="tab4">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/4.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chicken Breast</h4>
                      <span class="menu__item-price">$33.95</span>
                      <p class="menu__item-desc">Paupiette of chicken, blue cheese, rosemary.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Steak</h4>
                      <span class="menu__item-price">$41.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chicken Crispy</h4>
                      <span class="menu__item-price">$33.95</span>
                      <p class="menu__item-desc">Smoked quail, crispy egg, spelt, girolles, parsley.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Grilled Fillet</h4>
                      <span class="menu__item-price">$26.95</span>
                      <p class="menu__item-desc">Pork fillet, ginger, garlic, honey, pepper & oil.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Steak</h4>
                      <span class="menu__item-price">$27.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-6 -->
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/6.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Smoked Meat Sandwich</h4>
                      <span class="menu__item-price">$12.95</span>
                      <p class="menu__item-desc">Baguette, basil, arugula, olives, cherry-tomatoes.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Salmon Sandwich</h4>
                      <span class="menu__item-price">$15.95</span>
                      <p class="menu__item-desc">Salmon, butter, lemon juice, onion, garlic & salad.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Pan of Fried Eggs</h4>
                      <span class="menu__item-price">$13.95</span>
                      <p class="menu__item-desc">Eggs, bacon and cherry-tomatoes with bread.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Breakfast Set</h4>
                      <span class="menu__item-price">$20.95</span>
                      <p class="menu__item-desc">Croissants with strawberries, mascarpone, honey.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Healthy Breakfast</h4>
                      <span class="menu__item-price">$18.95</span>
                      <p class="menu__item-desc">Oat granola with fresh blueberries, almond.</p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-4 -->
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <img src="assets/images/menu/5.jpg" alt="menu" class="mb-40">
                    <div class="menu-item">
                      <h4 class="menu__item-title">Traditional pancakes</h4>
                      <span class="menu__item-price">$8.95</span>
                      <p class="menu__item-desc">Paupiette of chicken, blue cheese, rosemary.</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">American Brunch</h4>
                      <span class="menu__item-price">$14.95</span>
                      <p class="menu__item-desc">Applewood smoked bacon, tomatoes</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Cannoli with cream cheese</h4>
                      <span class="menu__item-price">$15.95</span>
                      <p class="menu__item-desc">Cheese, eggs, strawberries, butter & maple </p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Chocolate Cherry Cake</h4>
                      <span class="menu__item-price">$9.95</span>
                      <p class="menu__item-desc">Vanilla, milk, dark chocolate, cherries</p>
                    </div><!-- /.menu-item -->
                    <div class="menu-item">
                      <h4 class="menu__item-title">Pain au chocolat</h4>
                      <span class="menu__item-price">$3.95</span>
                      <p class="menu__item-desc">Homemade croissant contain a bar of </p>
                    </div><!-- /.menu-item -->
                  </div><!-- /.col-lg-4 -->
                </div><!-- /.row  -->
              </div><!-- /.tab-pane  -->
            </div><!-- /.tab-content  -->
          </div><!-- /.col-sm-12  -->
        </div><!-- /.row  -->
      </div><!-- /.container -->
    </section><!-- /.menu layout 1 -->

    <!-- ========================
       Text Banner layout 1
    =========================== -->
    <section class="text-banner text-banner-layout1 text-center bg-overlay bg-overlay-gradient bg-parallax">
      <div class="bg-img"><img src="assets/images/backgrounds/2.jpg" alt="background"></div>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <span class="banner__subtitle">Host Your Event</span>
            <h2 class="banner__title">A warm Atmosphere </h2>
          </div><!-- /.col-lg-12 -->
        </div><!-- /.row -->
      </div><!-- /.container -->
    </section><!-- /.textBanner layout 1 -->

    <!-- ========================
      Reservation
    =========================== -->
    <section class="reservation">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div class="heading heading-layout1 text-center mb-50">
              <span class="heading__subtitle">Book Your Table</span>
              <h2 class="heading__title">Make A Reservation</h2>
              <div class="heading__icon">
                <img src="assets/images/shapes/shape2.png" alt="heading img">
              </div>
              <p class="heading__desc">You can book your table online easily in just a couple of minutes. We take
                reservations for lunch, just check the availability of your table.</p>
            </div><!-- /.heading -->
          </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <form class="reservation__form">
              <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <div class="form-group">
                    <select class="form-control">
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6">6 people</option>
                      <option value="7">7 people</option>
                    </select>
                  </div>
                </div><!-- /.col-lg-4 -->
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <div class="form-group">
                    <select class="form-control">
                      <option value="23">March 23, 2020</option>
                      <option value="24">March 24, 2020</option>
                      <option value="25">March 25, 2020</option>
                      <option value="26">March 26, 2020</option>
                    </select>
                  </div>
                </div><!-- /.col-lg-4 -->
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <div class="form-group">
                    <select class="form-control">
                      <option value="8">8:00 PM</option>
                      <option value="9">9:00 PM</option>
                      <option value="10">10:00 PM</option>
                      <option value="11">11:00 PM</option>
                    </select>
                  </div>
                </div><!-- /.col-lg-4 -->
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Your Name">
                  </div>
                </div><!-- /.col-lg-4 -->
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Email">
                  </div>
                </div><!-- /.col-lg-4 -->
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Phone Number">
                  </div>
                </div><!-- /.col-lg-4 -->
                <div class="col-sm-12 col-md-12 col-lg-12">
                  <button type="submit" class="btn btn__secondary btn__block">Find A Table</button>
                </div><!-- /.col-lg-12 -->
              </div><!-- /.row -->
            </form>
          </div><!-- /.col-lg-8 -->
        </div><!-- /.row -->
      </div><!-- /.container -->
    </section><!-- /.Reservation -->

    <!-- ========================
      Footer
    ========================== -->
    <footer class="footer footer-layout1 text-center bg-dark">
   	 <?php include 'footer.php';?>
      <div class="footer-bottom">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <nav class="footer__links">
                <ul class="list-unstyled d-flex flex-wrap justify-content-center">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Menu</a></li>
                  <li><a href="#">Gallery</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Shop</a></li>
                </ul>
              </nav>
              <div class="footer__copyright">
                <span>&copy; Babette, With Love by </span>
                <a href="http://themeforest.net/user/7oroof" class="color-theme">7oroof.com</a>
              </div>
            </div>
          </div><!-- /.row -->
        </div><!-- /.container -->
      </div><!-- /.Footer-bottom -->
    </footer><!-- /.Footer -->
    <button id="scrollTopBtn"><i class="fa fa-angle-up"></i></button>

    <div class="hamburger-menu">
      <i class="close__hamburger-menu fa fa-long-arrow-right"></i>
      <div class="hamburger-menu__header text-center">
        <img src="assets/images/logo/footer-logo.png" alt=" logo" class="mb-20">
        <p>El Royale was the first restaurant to open in Egypt, the resturant was designed with the history in mind we
          have created a soft industrial dining room.</p>
        <ul class="social__icons social__icons-white justify-content-center">
          <li><a href="#"><i class="fa fa-instagram"></i></a></li>
          <li><a href="#"><i class="fa fa-facebook"></i></a></li>
        </ul><!-- /.social__icons -->
      </div><!-- /.hamburger-menu-header -->
      <div class="hamburger-menu__footer">
        <ul class="contact__list list-unstyled mb-20">
          <li><span>Main Email:</span> <a href="mailto:Elroyale@7oroof.com">Elroyale@7oroof.com</a></li>
          <li><span>Phone:</span> <a href="tel:010123456789">02 010123456789</a></li>
        </ul><!-- /.contact-list -->
        <a href="reservation.html" class="btn btn__primary btn__hover2 btn__block">Make A Reservation</a>
      </div><!-- /.hamburger-menu-footer -->
    </div><!-- /.hamburger-menu -->
  </div><!-- /.wrapper -->

  <script src="assets/js/jquery-3.3.1.min.js"></script>
  <script src="assets/js/plugins.js"></script>
  <script src="assets/js/main.js"></script>
</body>

</html>