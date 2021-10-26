import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartMenu from './CartMenu';
import HeaderSearch from './HeaderSearch';
import HeaderSticky from './HeaderSticky';
import MainMenu from './MainMenu';
import { Link } from 'react-router-dom';
import { signout } from '../../../redux/actions/userActions';
import { showSignInModal } from '../../../redux/actions/modalActions';

function Header(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  function handleSignOut(e) {
    e.preventDefault();
    dispatch(signout());
  }

  function onShowSignInModal(e) {
    e.preventDefault();
    dispatch(showSignInModal());
  }

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
                  {userInfo ? (
                    <li className="header__dropdown user-signin">
                      <Link to="/profile">
                        <i className="las la-user"></i>Hi, {userInfo.name}
                      </Link>
                      <ul className="header__menu">
                        <li>
                          <a href="/">Profile</a>
                        </li>
                        <li>
                          <a href="/">Order history</a>
                        </li>
                        <li>
                          <a href="/" onClick={handleSignOut}>
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link to="/signin" onClick={onShowSignInModal}>
                        <i className="las la-user"></i>Login
                      </Link>
                    </li>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <li className="header__dropdown user-signin">
                      <Link to="/profile">
                        <i className="las la-user"></i>Admin
                      </Link>
                      <ul className="header__menu">
                        <li>
                          <a href="/">Dashboard</a>
                        </li>
                        <li>
                          <a href="/">Products</a>
                        </li>
                        <li>
                          <a href="/">Orders</a>
                        </li>
                        <li>
                          <a href="/">Users</a>
                        </li>
                        <li>
                          <a href="/">Support</a>
                        </li>
                      </ul>
                    </li>
                  )}
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
              <Link to="/" className="logo">
                <img src="images/logo.png" alt="Logo" />
              </Link>

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
