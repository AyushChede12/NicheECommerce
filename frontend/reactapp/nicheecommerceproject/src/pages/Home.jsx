import React from "react";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import handmadeproductimage from '../assets/handmadeproductimage.jpg';

export default function Home() {
  return (
    <div className="space-y-12">

      {/* ---------------- Hero Section ---------------- */}
      <section className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-10 animate-fade-in">
        
        <div className="max-w-xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
            Discover Authentic Handmade Products
          </h1>
          <p className="text-lg opacity-90">
            Support local artisans and buy unique craftwork made with love and tradition.
          </p>

          <Link
            to="/products"
            className="bg-white text-gray-900 px-6 py-2 rounded-full shadow hover:scale-105 transition-transform font-semibold inline-block"
          >
            Shop Now →
          </Link>
        </div>

        <img
          src={handmadeproductimage}
          alt="Handmade Preview"
          className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform"
        />
      </section>

      {/* ---------------- Category Section ---------------- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Explore Categories</h2>

        <div className="flex flex-wrap gap-3">
          {[
            "Handmade Jewelry",
            "Clay Products",
            "Home Decor",
            "Traditional Art",
            "Bamboo Craft",
            "Handwoven Bags",
          ].map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm shadow hover:bg-gray-200 cursor-pointer transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- Featured Products ---------------- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

        <ProductList compact />
      </section>

      {/* ---------------- Call to Action ---------------- */}
      <section className="text-center p-10 bg-gray-100 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-2">Are You an Artisan?</h2>
        <p className="text-gray-600 mb-4">
          Join our platform and sell your handmade products to the world.
        </p>

        <Link
          to="/register"
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow"
        >
          Become an Artisan →
        </Link>
      </section>

    </div>
  );
}
