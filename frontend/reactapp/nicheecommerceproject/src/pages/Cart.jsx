import React, { useEffect, useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(saved);
    }, []);

    function updateQty(id, delta) {
        const updated = cart.map(item => {
            if (item._id === id) {
                const newQty = item.qty + delta;
                return { ...item, qty: newQty > 1 ? newQty : 1 };
            }
            return item;
        });

        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    }

    function removeItem(id) {
        const updated = cart.filter(item => item._id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map(item => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between bg-white rounded-lg shadow p-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={`http://localhost:5000/uploads/products/${item.images[0]}`}
                                    className="w-20 h-20 rounded object-cover"
                                    alt=""
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {item.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        ₹{item.price} × {item.qty}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQty(item._id, -1)}
                                    className="px-3 py-1 bg-gray-300 rounded"
                                >
                                    -
                                </button>
                                <span>{item.qty}</span>
                                <button
                                    onClick={() => updateQty(item._id, 1)}
                                    className="px-3 py-1 bg-gray-300 rounded"
                                >
                                    +
                                </button>

                                <button
                                    onClick={() => removeItem(item._id)}
                                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Cart Total */}
                    <div className="text-right mt-4">
                        <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
                    </div>
                </div>
            )}
        </div>
    );
}
