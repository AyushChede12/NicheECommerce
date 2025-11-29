import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ProductForm from './ProductForm';


export default function ArtisanDashboard() {
    return (
        <div className="grid md:grid-cols-4 gap-4">
            <aside className="col-span-1 border p-3">
                <Link to="/artisan/products">My Products</Link>
                <br />
                <Link to="/product/new">Create Product</Link>
            </aside>
            <section className="md:col-span-3">
                <Routes>
                    <Route path="products" element={<div>Products list (fetch from /api/products?owner=me)</div>} />
                    <Route path="create" element={<ProductForm />} />
                </Routes>
            </section>
        </div>
    );
}