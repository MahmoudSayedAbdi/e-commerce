import React from "react";
import amz_logo from "../../../public/Amazon_Pay_logo.svg.png";
import paypal from "../../../public/paypal.jpg";
import app_store from "../../../public/app_store.png";
import google_store from "../../../public/google_syore.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-12">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* App Link Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Get the FreshCart app</h3>
          <p className="mb-4 text-sm">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex items-center gap-2">
            <input
              className="w-8/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              placeholder="Enter your email..."
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Share App Link
            </button>
          </div>
        </div>

        {/* Payment Partners */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Payment Partners</h3>
          <div className="flex gap-4">
            <img
              src={amz_logo}
              className="h-10 object-contain"
              alt="Amazon Pay"
            />
            <img
              src={paypal}
              className="h-10 object-contain"
              alt="PayPal"
            />
          </div>
        </div>

        {/* App Stores */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Get deliveries with FreshCart</h3>
          <div className="flex gap-4">
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={app_store}
                className="h-12 object-contain"
                alt="App Store"
              />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={google_store}
                className="h-12 object-contain"
                alt="Google Play"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-200 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
