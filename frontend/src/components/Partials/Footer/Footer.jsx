import React from 'react';

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <img className="footer__logo" src="images/logo-footer.png" alt="Logo" />
              <p>
                Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate
                magna eros eu erat.
              </p>

              <div className="social-icons">
                <a href="/" className="social-icon" title="Facebook">
                  <i className="lab la-facebook-f"></i>
                </a>
                <a href="/" className="social-icon" title="Twitter">
                  <i className="lab la-twitter"></i>
                </a>
                <a href="/" className="social-icon" title="Instagram">
                  <i className="lab la-instagram"></i>
                </a>
                <a href="/" className="social-icon" title="Youtube">
                  <i className="lab la-youtube"></i>
                </a>
                <a href="/" className="social-icon" title="Pinterest">
                  <i className="lab la-pinterest"></i>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <h4 className="footer__title">Useful Links</h4>
              <ul>
                <li>
                  <a href="/">About Molla</a>
                </li>
                <li>
                  <a href="/">How to shop on Molla</a>
                </li>
                <li>
                  <a href="/">FAQ</a>
                </li>
                <li>
                  <a href="/">Contact us</a>
                </li>
                <li>
                  <a href="/">Log in</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-lg-3">
              <h4 className="footer__title">Customer Service</h4>
              <ul>
                <li>
                  <a href="/">Payment Methods</a>
                </li>
                <li>
                  <a href="/">Money-back guarantee!</a>
                </li>
                <li>
                  <a href="/">Returns</a>
                </li>
                <li>
                  <a href="/">Shipping</a>
                </li>
                <li>
                  <a href="/">Terms and conditions</a>
                </li>
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-lg-3">
              <h4 className="footer__title">Useful Links</h4>
              <ul>
                <li>
                  <a href="/">My Account</a>
                </li>
                <li>
                  <a href="/">Sign In</a>
                </li>
                <li>
                  <a href="/">View Cart</a>
                </li>
                <li>
                  <a href="/">My Wishlist</a>
                </li>
                <li>
                  <a href="/">Track My Order</a>
                </li>
                <li>
                  <a href="/">Help</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container pb-2 pt-2">
          <p className="footer__copyright">
            Copyright © {new Date().getFullYear()} Molla Store. All Rights Reserved.
          </p>

          <figure className="footer__payments">
            <img src="images/payments.png" alt="Payment methods" />
          </figure>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
