import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../api/productApi";
import { addToCartLocal } from "../utils/cart";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleAddToCart() {
        addToCartLocal(product);
        navigate("/cart"); // redirect to cart page
    }

    useEffect(() => {
        fetchProduct();
    }, [id]);

    async function fetchProduct() {
        setLoading(true);
        setError("");
        try {
            const res = await productApi.get(id);
            setProduct(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load product.");
        } finally {
            setLoading(false);
        }
    }

    // Loading UI
    if (loading)
        return (
            <div className="max-w-4xl mx-auto p-6 animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 w-1/2 mb-3 rounded" />
                <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded" />
                <div className="h-4 bg-gray-200 w-1/3 rounded" />
            </div>
        );

    if (error)
        return <p className="text-red-500 text-center mt-10">{error}</p>;

    if (!product) return null;

    const mainImage =
        product.images?.length
            ? `http://localhost:5000/uploads/products/${product.images[0]}`
            : "https://via.placeholder.com/400x300?text=No+Image";

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Product Title */}
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
                {product.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Image */}
                <div>
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />

                    {/* Small thumbnail images */}
                    {product.images?.length > 1 && (
                        <div className="flex gap-3 mt-4">
                            {product.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={`http://localhost:5000/uploads/products/${img}`}
                                    alt="product"
                                    className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <p className="text-gray-700 mb-4 text-lg">
                        {product.description}
                    </p>

                    <p className="text-3xl font-extrabold text-green-600 mb-4">
                        ₹ {product.price}
                    </p>

                    <div className="space-y-2">
                        <p className="text-gray-700">
                            <strong>Category:</strong> {product.category}
                        </p>
                        <p className="text-gray-700">
                            <strong>Stock:</strong>{" "}
                            {product.stock > 0 ? product.stock : "Out of stock"}
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 text-lg font-semibold rounded-xl transition"
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    );
}
