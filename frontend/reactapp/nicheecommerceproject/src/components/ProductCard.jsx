import React from "react";

export default function ProductCard({ product }) {
    const img = product.images?.length
        ? `http://localhost:5000/uploads/products/${product.images[0]}`
        : "https://via.placeholder.com/300x200?text=No+Image";

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-md border border-white/20 text-white">
            <img
                src={img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
            />

            <h3 className="text-lg font-bold text-black">{product.name}</h3>

            <p className="text-sm text-black/70 mt-1 line-clamp-2">
                {product.description}
            </p>

            <p className="font-semibold mt-2 text-black">₹{product.price}</p>

            <button className="mt-3 w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                View Details
            </button>
        </div>
    );
}
