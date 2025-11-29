import React, { useEffect, useState } from 'react';
import { cartApi } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line
    }, []);

    async function fetchCart() {
        setLoading(true);
        try {
            const res = await cartApi.get();
            setItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function gotoCheckout() {
        navigate('/checkout');
    }

    function getTotal() {
        return items.reduce((acc, item) => acc + item.qty * item.product.price, 0);
    }

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-purple-700 to-blue-700 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

            {loading ? (
                <p className="text-center mt-8">Loading cart items...</p>
            ) : items.length === 0 ? (
                <p className="text-center mt-8 text-lg">Your cart is empty.</p>
            ) : (
                <div className="max-w-3xl mx-auto space-y-4">
                    {items.map(it => (
                        <div
                            key={it._id}
                            className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={it.product.images?.[0] || '/placeholder.png'}
                                    alt={it.product.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{it.product.name}</h3>
                                    <p>Qty: {it.qty}</p>
                                    <p>Price: ₹{it.product.price}</p>
                                </div>
                            </div>
                            <div className="font-bold text-lg">
                                ₹{it.product.price * it.qty}
                            </div>
                        </div>
                    ))}

                    {/* Total & Checkout */}
                    <div className="flex justify-between items-center mt-6 p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-md text-lg font-semibold">
                        <span>Total:</span>
                        <span>₹{getTotal()}</span>
                    </div>

                    <button
                        onClick={gotoCheckout}
                        className="w-full mt-4 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 shadow-lg hover:shadow-2xl transition"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
