import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productApi, cartApi } from '../api';


export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);


    useEffect(() => {
        productApi.get(id).then(res => setProduct(res.data)).catch(console.error);
    }, [id]);


    function addToCart() {
        cartApi.add({ productId: id, qty }).then(() => alert('Added to cart')).catch(console.error);
    }


    if (!product) return <div>Loading...</div>;


    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <div className="h-96 bg-gray-50 flex items-center justify-center">{product.images?.[0] ? <img src={product.images[0]} alt="" className="max-h-80" /> : 'No image'}</div>
                <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
                <p className="mt-2">{product.description}</p>
            </div>
            <aside className="p-4 border rounded">
                <p>Price: ₹{product.price}</p>
                <p>Category: {product.category}</p>
                <div className="mt-4">
                    <label>Qty</label>
                    <input type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} />
                    <button onClick={addToCart} className="block mt-2">Add to cart</button>
                </div>
            </aside>
        </div>
    );
}