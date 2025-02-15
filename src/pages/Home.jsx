import React from "react";
import { Link } from "react-router-dom";
import logo from "../vite.svg"; // Import your logo
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* --- Navbar (Simplified for Home Page) --- */}
      <div className="py-4 px-4 text-center md:text-left md:flex md:items-center md:justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center text-orange-500 text-2xl font-bold">
        <img src={logo} alt="OnePage Logo" className="h-8 w-8 mr-2" /> {/* Adjust size as needed */}
        OnePage
        </Link>
      </div>

      {/* --- Hero Section --- */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            All Your Links. One Beautiful Page.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Share everything you create, curate, and sell online, all from one
            simple link.
          </p>
          <Link
            to="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
          >
            Get Started Free
          </Link>

           {/* Mobile-first image placement */}
          <div className="mt-8">
            <img
                src="../vite.svg"  // Placeholder: Use a mobile-friendly aspect ratio
                alt="OnePage Hero Mobile"
                className="w-full rounded-lg shadow-lg md:hidden" // Show on mobile, hide on larger screens
            />
            <img
                src="../vite.svg" // Placeholder
                alt="OnePage Hero Desktop"
                className="w-full rounded-lg shadow-lg hidden md:block" // Hide on mobile, show on larger screens
            />
          </div>

        </div>

      </section>

      {/* --- Benefits Section --- */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Why Choose OnePage?
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {/* Single column layout for mobile */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Effortless Sharing
              </h3>
              <p className="text-gray-600">
                One link for your bio, profile, or anywhere you connect with your
                audience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Total Control
              </h3>
              <p className="text-gray-600">
                Customize your page to match your brand, and update it anytime.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Built-in Messaging
              </h3>
              <p className="text-gray-600">
                Let visitors send you anonymous messages directly from your
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Everything You Need, In One Place
          </h2>
          <div className="space-y-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <img
                src="../vite.svg" // Placeholder, mobile-friendly aspect ratio
                alt="Link Management"
                className="w-full rounded-lg shadow-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Manage All Your Links
              </h3>
              <p className="text-gray-600 text-center">
                Add, edit, and organize all your important links in one central
                location.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <img
                src="../vite.svg" // Placeholder
                alt="Page Customization"
                className="w-full rounded-lg shadow-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Customize Your Page
              </h3>
              <p className="text-gray-600 text-center">
                Make your OnePage truly yours. Add a title, description, and
                choose which links to display.
              </p>
            </div>
            {/* Feature 3 */}
             <div className="flex flex-col items-center">
              <img
                src="../vite.svg" // Placeholder, mobile-friendly aspect ratio
                alt="Link Management"
                className="w-full rounded-lg shadow-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Direct Messaging
              </h3>
              <p className="text-gray-600 text-center">
                Enable anonymous messaging to connect to your audience and get
                messages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Final Call to Action --- */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Simplify Your Online Life?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create your free OnePage in minutes.
          </p>
          <Link
            to="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;