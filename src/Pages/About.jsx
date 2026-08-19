import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-black text-white text-center py-16 px-6">
        <h1 className="text-4xl font-serif mb-3">Our Story</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Where Shine Meets Style
        </p>
      </div>

      {/* Brand Story */}
      <div className="px-6 md:px-10 py-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-serif mb-4">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed">
          Shaa Jewels is a trusted ornaments and jewellery brand dedicated to
          bringing elegance, quality, and timeless beauty to every customer.
          Every piece we craft carries a story — a blend of traditional
          artistry and modern design, made to be cherished for generations.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 px-6 md:px-10 py-16">
        <h2 className="text-2xl font-serif text-center mb-10">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 text-center">
            <div className="text-3xl mb-3">💎</div>
            <h3 className="font-semibold mb-2">Certified Quality</h3>
            <p className="text-gray-500 text-sm">
              100% certified gold and genuine gemstones in every piece.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 text-center">
            <div className="text-3xl mb-3">✋</div>
            <h3 className="font-semibold mb-2">Handcrafted Designs</h3>
            <p className="text-gray-500 text-sm">
              Each piece is carefully handcrafted by skilled artisans.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold mb-2">Lifetime Exchange</h3>
            <p className="text-gray-500 text-sm">
              Enjoy lifetime exchange on all our jewelry purchases.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 text-center">
            <div className="text-3xl mb-3">🚚</div>
            <h3 className="font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-500 text-sm">
              Free, secure shipping on every order across India.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 px-6">
        <h2 className="text-2xl font-serif mb-4">
          Discover Timeless Elegance
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Explore our collections and find the perfect piece for every
          occasion.
        </p>
        <Link
          to="/Shop"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-md font-medium transition-all"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default About;