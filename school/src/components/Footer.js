import React from 'react';
// import Contact from './Contact';
import './Footer.css'; 
const FooterC = () => {
  return (
    <div className="footer">
      <div className="footer-header"></div>
      <div className="footer-content">
        <div className="footer-section">
          <div>
            <p className="footer-title">Contact Us</p>
            <p className="footer-text">
              School No.17, Mira Bhayandar Municipal Corporation, Bhayandar West, Thane
            </p>
            <p className="footer-text">Phone: </p>
          </div>
        </div>
        <div className="footer-section">
          <div>
            <p className="footer-title">Social Media Links</p>
            <a href="https://www.facebook.com" className="footer-link">
              Facebook
            </a>
            <p className="footer-text">.</p>
            <p className="footer-text">.</p>
          </div>
        </div>
        <div className="footer-section">
          <div>
            {/* <Contact /> */}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">© 2024 BMC School No.16. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default FooterC;
