import React from 'react';
import { orderApi } from '../api';
import { useNavigate } from 'react-router-dom';


export default function Checkout() {
    const navigate = useNavigate();


    function placeOrder() {
        // This expects backend to return Razorpay order details if using server-side integration
        orderApi.create({ paymentMethod: 'razorpay' }).then(() => {
            alert('Order placed');
            navigate('/orders');
        }).catch(console.error);
    }


    return (
        <div className="max-w-lg mx-auto">
            <h2>Checkout</h2>
            <p>Shipping & payment form will go here (collect address, phone)</p>
            <button onClick={placeOrder}>Place order (Razorpay)</button>
        </div>
    );
}