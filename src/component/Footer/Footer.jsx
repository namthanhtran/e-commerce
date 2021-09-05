import React from 'react';
import './style.css';
 
Footer.propTypes = {
  
};

function Footer(props) {
  return (
    <div className='footer'>
          <div className="footer__links">
            <ul className="link-columns">
              <li>
                <a href="/">About US</a>
              </li>
              <li>
                <a href="/">Contact US</a>
              </li>
            </ul>
            <ul className="link-columns">
              <li>
                <a href="/">Careers</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">Help and Support</a>
              </li>
            </ul>
            <ul className="link-columns">
              <li>
                <a href="/">Term</a>
              </li>
              <li>
                <a href="/">Privacy policy</a>
              </li>
              <li>
                <a href="/">Sitemap</a>
              </li>
            </ul>
          </div>
          <hr />
          <div className="footer__logo-and-copyright">
            <ul className="logo-and-copyright">
              <li>Bryan Shop</li>
              <li>© 2021 BryanTran, Inc.</li>
            </ul>
          </div>  
        </div>
  );
}

export default Footer;