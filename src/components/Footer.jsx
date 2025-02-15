
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 py-6 text-center text-gray-600">
      <div className="container mx-auto">
        <p>© {currentYear} OnePage. All rights reserved.</p>
          <div className="mt-2 space-x-4">
              <Link to="/terms" className="hover:text-orange-500">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-orange-500">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;