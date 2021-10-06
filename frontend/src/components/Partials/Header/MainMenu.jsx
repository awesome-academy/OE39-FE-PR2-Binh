import React from 'react';

function MainMenu(props) {
  return (
    <nav className="menu__wrapper">
      <ul className="menu sf-arrows">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/" className="sf-with-ul">
            Pages
          </a>

          <ul>
            <li>
              <a href="/" className="sf-with-ul">
                About
              </a>
              <ul>
                <li>
                  <a href="/">About 1</a>
                </li>
                <li>
                  <a href="/">About 1</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/" className="sf-with-ul">
                Contact
              </a>

              <ul>
                <li>
                  <a href="/">Contact 1</a>
                </li>
                <li>
                  <a href="/">Contact 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/">FAQs</a>
            </li>
            <li>
              <a href="/">Coming Soon</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/">Shop</a>
        </li>
        <li>
          <a href="/">Product</a>
        </li>
        <li>
          <a href="/">Blog</a>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;
