import React from 'react';
import CartMenu from './CartMenu';
import HeaderSearch from './HeaderSearch';
import HeaderSticky from './HeaderSticky';
import MainMenu from './MainMenu';

function Header(props) {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="header__left">
            <div className="header__dropdown">
              <a href="/">Usd</a>
              <div className="header__menu">
                <ul>
                  <li>
                    <a href="/">Eur</a>
                  </li>
                  <li>
                    <a href="/">Usd</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header__dropdown">
              <a href="/">Eng</a>
              <div className="header__menu">
                <ul>
                  <li>
                    <a href="/">English</a>
                  </li>
                  <li>
                    <a href="/">French</a>
                  </li>
                  <li>
                    <a href="/">Spanish</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="header__right">
            <ul className="header__top-menu">
              <li>
                <a href="/">Links</a>
                <ul>
                  <li>
                    <a href="/">
                      <i className="las la-phone"></i>Call: +0123 456 789
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="lar la-heart"></i>My Wishlist
                      <span>( 2 )</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">About Us</a>
                  </li>
                  <li>
                    <a href="/">Contact Us</a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="las la-user"></i>Login
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <HeaderSticky>
        <div className="header__middle header__sticky">
          <div className="container">
            <div className="header__left">
              <a href="/" className="logo">
                <img src="images/logo.png" alt="Logo" />
              </a>

              <MainMenu />
            </div>

            <div className="header__right">
              <HeaderSearch />

              <CartMenu />
            </div>
          </div>
        </div>
      </HeaderSticky>
    </header>
  );
}

export default Header;
