import React from 'react'
import amz_logo from "../../../public/Amazon_Pay_logo.svg.png"
import peypal from "../../../public/paypal.jpg"
import app_store from "../../../public/app_store.png"
import google_syore from "../../../public/google_syore.png"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content flex flex-wrap text-gray-500">
        <div className="footer-section w-full ">
          <h3 className='text-2xl'>Get the FreshCart app</h3>
          <p>We will send you a link, open it on your phone to download the app.</p>
          <div className="email-input w-full ">
            <input className='w-5/12' type="email" placeholder="Email..." />
            <button >Share App Link</button>
          </div>
        </div>
        <div className="footer-section w-full footer-bottom">
          <h3>Payment Partners</h3>
          <div className="payment-partners">
          <div className="app-stores flex flex-wrap ">
            <a className='w-3/12 ' href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={amz_logo} className='w-full object-contain' alt="App Store" />
            </a>
            <a className='w-3/12 ' href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={peypal} className='w-full object-contain' alt="App Store" />
            </a>

          </div>
          </div>
        </div>
        <div className="footer-section">
          <h3>Get deliveries with FreshCart</h3>
          <div className="app-stores">
          <a  href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={app_store} className='w-full object-contain' alt="App Store" />
            </a>
          <a  href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={google_syore} className='w-full object-contain' alt="App Store" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
      </div>
    </footer>
  );
}
