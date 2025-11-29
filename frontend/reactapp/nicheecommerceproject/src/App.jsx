import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProductForm from "./pages/ProductForm";
import OrderHistory from "./pages/OrderHistory";

import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Dashboards */}
              <Route path="/artisan/*" element={<ArtisanDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />

              <Route path="/product/new" element={<ProductForm />} />
              <Route path="/orders" element={<OrderHistory />} />
            </Routes>
          </main>

          <footer className="p-4 text-center">© DesiEtsy</footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
