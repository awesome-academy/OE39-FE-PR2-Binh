import React from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SlickCarousel from '../components/Features/SlickCarousel';
import RecentProducts from '../components/Partials/Home/RecentProducts';
import TrendyProducts from '../components/Partials/Home/TrendyProducts';
import { fadeIn, fadeInLeft, fadeInRightShorter, fadeInUpShorter } from '../utils/keyFrames';

function HomeScreen(props) {
  const settings = {
    dots: false,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 8000,
  };

  return (
    <>
      <div className="main">
        <div className="intro pt-5 pb-4" style={{ backgroundImage: 'url(images/intro-bg.jpg)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="intro__slide-wrapper">
                  <SlickCarousel options={settings}>
                    <div className="intro__slide" id="intro__slide-first">
                      <figure className="intro__slide-image mb-0">
                        <picture>
                          <img src="images/sliders/slide-1.png" alt="Banner" />
                        </picture>
                      </figure>
                      <div className="intro__content">
                        <Reveal keyframes={fadeInUpShorter} delay={100} duration={1000}>
                          <>
                            <h3 className="intro__subtitle">Topsale Collection</h3>

                            <h1 className="intro__title">
                              Best Lighting
                              <br />
                              Collection
                            </h1>

                            <a href="/" className="btn btn-outline-white">
                              <span>SHOP NOW</span>
                              <i className="las la-arrow-right"></i>
                            </a>
                          </>
                        </Reveal>
                      </div>
                    </div>

                    <div className="intro__slide" id="intro__slide-second">
                      <figure className="intro__slide-image mb-0">
                        <picture>
                          <img src="images/sliders/slide-2.png" alt="Banner" />
                        </picture>
                      </figure>
                      <div className="intro__content">
                        <Reveal keyframes={fadeInUpShorter} delay={100} duration={1000}>
                          <>
                            <h3 className="intro__subtitle">Topsale Collection</h3>

                            <h1 className="intro__title">
                              Best Lighting
                              <br />
                              Collection
                            </h1>

                            <a href="/" className="btn btn-outline-white">
                              <span>SHOP NOW</span>
                              <i className="las la-arrow-right"></i>
                            </a>
                          </>
                        </Reveal>
                      </div>
                    </div>
                  </SlickCarousel>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="intro__banner-wrapper">
                  <div className="row">
                    <div className="col-md-6 col-lg-12">
                      <div className="intro__banner">
                        <LazyLoadImage
                          alt="banner"
                          src="images/banners/intro-banner-1.jpg"
                          threshold={200}
                          width="370"
                          height="auto"
                          effect="blur"
                        />

                        <div className="intro__banner-content">
                          <h4 className="intro__banner-subtitle">Clearence</h4>

                          <h3 className="intro__banner-title">
                            <a href="/">
                              Chairs & Chaises
                              <br />
                              Up to 40% off
                            </a>
                          </h3>

                          <a href="/" className="intro__banner-link">
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-12">
                      <div className="intro__banner">
                        <LazyLoadImage
                          alt="banner"
                          src="images/banners/intro-banner-2.jpg"
                          threshold={200}
                          width="370"
                          height="auto"
                          effect="blur"
                        />

                        <div className="intro__banner-content">
                          <h4 className="intro__banner-subtitle">New in</h4>

                          <h3 className="intro__banner-title">
                            <a href="/">
                              Kitchen & Dinning
                              <br />
                              Collection
                            </a>
                          </h3>

                          <a href="/" className="intro__banner-link">
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Reveal keyframes={fadeIn} delay={100} duration={1500} triggerOnce>
          <TrendyProducts />
        </Reveal>

        <div className="container mt-8">
          <div className="heading mb-4">
            <h2 className="title">Shop by Categories</h2>
          </div>

          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="banner">
                <figure className="mb-0">
                  <LazyLoadImage
                    alt="banner"
                    src="images/banners/banner-1.jpg"
                    threshold={200}
                    width="376"
                    height="auto"
                    effect="blur"
                  />
                </figure>

                <div className="banner__content">
                  <a className="banner__link" href="/">
                    <h3 className="banner__title mb-0">Home Decor</h3>
                    <span className="banner__text">
                      Shop Now<i className="las la-arrow-right ml-2"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 order-lg-last">
              <Reveal keyframes={fadeInRightShorter} delay={150} duration={1000} triggerOnce>
                <div className="banner">
                  <figure className="mb-0">
                    <LazyLoadImage
                      alt="banner"
                      src="images/banners/banner-4.jpg"
                      threshold={200}
                      width="376"
                      height="auto"
                      effect="blur"
                    />
                  </figure>

                  <div className="banner__content">
                    <a className="banner__link" href="/">
                      <h3 className="banner__title mb-0">Living Room</h3>
                      <span className="banner__text">
                        Shop Now<i className="las la-arrow-right ml-2"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-sm-12 col-lg-4">
              <div className="row">
                <div className="col-lg-12 col-sm-6 col-xs-12">
                  <div className="banner">
                    <figure className="mb-0">
                      <LazyLoadImage
                        alt="banner"
                        src="images/banners/banner-2.jpg"
                        threshold={200}
                        width="376"
                        height="auto"
                        effect="blur"
                      />
                    </figure>

                    <div className="banner__content">
                      <a className="banner__link" href="/">
                        <h3 className="banner__title mb-0">Kitchen & Utensil</h3>
                        <span className="banner__text">
                          Shop Now<i className="las la-arrow-right ml-2"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-sm-6 col-xs-12">
                  <div className="banner">
                    <figure className="mb-0">
                      <LazyLoadImage
                        alt="banner"
                        src="images/banners/banner-3.jpg"
                        threshold={200}
                        width="376"
                        height="auto"
                        effect="blur"
                      />
                    </figure>

                    <div className="banner__content">
                      <a className="banner__link" href="/">
                        <h3 className="banner__title mb-0">Lighting</h3>
                        <span className="banner__text">
                          Shop Now<i className="las la-arrow-right ml-2"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Reveal keyframes={fadeIn} delay={100} duration={1500} triggerOnce>
          <RecentProducts />
        </Reveal>

        <div className="container">
          <hr />
          <div className="row justify-content-center">
            <div className="col-md-4 col-sm-6">
              <Reveal keyframes={fadeInLeft} delay={150} duration={1000} triggerOnce>
                <div className="icon-box text-center bg-white">
                  <span className="icon-box__icon text-dark">
                    <i className="las la-rocket"></i>
                  </span>
                  <div className="icon-box__content">
                    <h3 className="icon-box__title">Payment & Delivery</h3>
                    <p>Free shipping for orders over $50</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-md-4 col-sm-6">
              <Reveal keyframes={fadeInLeft} delay={180} duration={1200} triggerOnce>
                <div className="icon-box text-center bg-white">
                  <span className="icon-box__icon text-dark">
                    <i className="las la-undo-alt"></i>
                  </span>
                  <div className="icon-box__content">
                    <h3 className="icon-box__title">Return & Refund</h3>
                    <p>Free 100% money back guarantee</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-md-4 col-sm-6">
              <Reveal keyframes={fadeInLeft} delay={200} duration={1500} triggerOnce>
                <div className="icon-box text-center bg-white">
                  <span className="icon-box__icon text-dark">
                    <i className="las la-life-ring"></i>
                  </span>
                  <div className="icon-box__content">
                    <h3 className="icon-box__title">Quality Support</h3>
                    <p>Alway online feedback 24/7</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal keyframes={fadeInRightShorter} delay={150} duration={1000} triggerOnce>
          <div className="cta pt-4 pb-4" style={{ backgroundImage: 'url(images/cta.jpg)' }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9 col-xl-8">
                  <div className="row no-gutters flex-column flex-sm-row align-items-sm-center">
                    <div className="col text-center text-sm-left">
                      <h3 className="cta__title text-white">Sign Up & Get 10% Off</h3>
                      <p className="cta__desc text-white">
                        Molla presents the best in interior design
                      </p>
                    </div>
                    <div className="col-auto d-flex justify-content-center">
                      <a href="/" className="btn btn-outline-white">
                        <span>SIGN UP</span>
                        <i className="las la-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}

export default HomeScreen;
