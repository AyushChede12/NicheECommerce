import React, { useEffect, useState } from 'react';
import { orderApi } from '../api';


export default function OrderHistory() {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        orderApi.list().then(r => setOrders(r.data)).catch(console.error);
    }, []);


    return (
        <div>
            <h2>Orders</h2>
            {orders.map(o => (
                <div key={o._id} className="border p-3 mb-2">
                    <div>Order #{o._id}</div>
                    <div>Status: {o.status}</div>
                </div>
            ))}
        </div>
    );
}