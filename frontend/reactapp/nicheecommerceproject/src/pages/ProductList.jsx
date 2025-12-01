import React, { useEffect, useState } from 'react';
import { productApi } from '../api/productApi';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ q: '', category: '', min: '', max: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = ['All', 'Jewelry', 'Home Decor', 'Clothing', 'Art', 'Accessories', 'Furniture', 'Electric'];

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        setError('');

        try {
            // Build query params dynamically
            const query = {};
            if (filters.q) query.q = filters.q;
            if (filters.category) query.category = filters.category;
            if (filters.min) query.min = filters.min;
            if (filters.max) query.max = filters.max;

            const res = await productApi.list(query); // Assuming API accepts query object
            setProducts(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        fetchProducts();
    }

    return (
        <div className="w-full p-6">

            {/* Filters */}
            <form
                onSubmit={handleSearch}
                className="mb-6 flex flex-wrap gap-3 items-center bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-sm"
            >
                <input
                    value={filters.q}
                    onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
                    placeholder="Search products..."
                    className="p-3 rounded-lg flex-1 bg-gray-600 text-white"
                />

                <select
                    value={filters.category}
                    onChange={e => setFilters(f => ({ ...f, category: e.target.value || undefined }))}
                    className="p-3 rounded-lg flex-1 bg-gray-600 text-white"
                >
                    {categories.map(c => (
                        <option key={c} value={c === "All" ? "" : c}>
                            {c}
                        </option>
                    ))}
                </select>


                <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.min}
                    onChange={e => setFilters(f => ({ ...f, min: e.target.value }))}
                    className="p-3 rounded-lg w-24 bg-gray-600 text-white"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.max}
                    onChange={e => setFilters(f => ({ ...f, max: e.target.value }))}
                    className="p-3 rounded-lg w-24 bg-gray-600 text-white"
                />

                <button type="submit" className="px-5 py-3 bg-yellow-400 text-black rounded-lg">
                    Search
                </button>
            </form>

            {/* Loading */}
            {loading && <p className="text-black text-center">Loading...</p>}

            {/* Error */}
            {error && <p className="text-red-400 text-center">{error}</p>}

            {/* Product Cards */}
            {!loading && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(p => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>
            ) : (
                !loading && (
                    <p className="text-black text-center text-lg">
                        No products found.
                    </p>
                )
            )}
        </div>
    );
}
