// import React, { useState } from 'react';
// import { productApi } from '../api';

// export default function ProductForm() {
//     const [form, setForm] = useState({
//         name: '',
//         price: '',
//         description: '',
//         category: '',
//         images: []
//     });
//     const [loading, setLoading] = useState(false);

//     function handleFileChange(e) {
//         setForm(f => ({ ...f, images: Array.from(e.target.files) }));
//     }

//     async function submit(e) {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const payload = new FormData();
//             payload.append('name', form.name);
//             payload.append('price', form.price);
//             payload.append('description', form.description);
//             payload.append('category', form.category);
//             form.images.forEach((file, i) => payload.append('images', file));

//             await productApi.create(payload);
//             alert('Product Created Successfully!');
//             setForm({ name: '', price: '', description: '', category: '', images: [] });
//         } catch (err) {
//             console.error(err);
//             alert(err.response?.data?.message || 'Failed to create product');
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-700 p-4">
//             <form
//                 onSubmit={submit}
//                 className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-xl text-white border border-white/20 space-y-4"
//             >
//                 <h2 className="text-2xl font-bold mb-4 text-center">Add / Edit Product</h2>

//                 {/* Name */}
//                 <div>
//                     <label className="text-sm font-semibold">Product Name</label>
//                     <input
//                         type="text"
//                         placeholder="Enter product name"
//                         className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
//                         value={form.name}
//                         onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
//                         required
//                     />
//                 </div>

//                 {/* Price */}
//                 <div>
//                     <label className="text-sm font-semibold">Price</label>
//                     <input
//                         type="number"
//                         placeholder="Enter price"
//                         className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
//                         value={form.price}
//                         onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
//                         required
//                     />
//                 </div>

//                 {/* Description */}
//                 <div>
//                     <label className="text-sm font-semibold">Description</label>
//                     <textarea
//                         placeholder="Enter product description"
//                         className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none resize-none"
//                         value={form.description}
//                         onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
//                         rows={4}
//                         required
//                     />
//                 </div>

//                 {/* Category */}
//                 <div>
//                     <label className="text-sm font-semibold">Category</label>
//                     <input
//                         type="text"
//                         placeholder="Enter category"
//                         className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
//                         value={form.category}
//                         onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
//                         required
//                     />
//                 </div>

//                 {/* Images */}
//                 <div>
//                     <label className="text-sm font-semibold">Upload Images</label>
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleFileChange}
//                         className="w-full mt-1 text-white cursor-pointer"
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className={`mt-4 p-3 w-full rounded-lg text-lg font-semibold transition 
//                         ${loading 
//                             ? 'bg-gray-400 cursor-not-allowed' 
//                             : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg hover:shadow-2xl'
//                         }`}
//                 >
//                     {loading ? "Saving..." : "Save Product"}
//                 </button>
//             </form>
//         </div>
//     );
// }

import React, { useState } from "react";
import { productApi } from "../api/productApi";

export default function ProductForm() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        images: []
    });

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState([]);

    // Handle file input
    function handleFileChange(e) {
        const files = Array.from(e.target.files);

        setForm(f => ({ ...f, images: files }));

        // Preview images
        const previews = files.map(file => URL.createObjectURL(file));
        setPreview(previews);
    }

    // Submit Form
    async function submit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = new FormData();

            payload.append("name", form.name);
            payload.append("price", form.price);
            payload.append("description", form.description);
            payload.append("category", form.category);
            payload.append("stock", form.stock);

            // Append images
            form.images.forEach(file => {
                payload.append("images", file);
            });

            await productApi.create(payload);

            alert("Product Created Successfully!");

            // Reset form
            setForm({
                name: "",
                price: "",
                description: "",
                category: "",
                stock: "",
                images: []
            });
            setPreview([]);

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-700 p-4">
            <form
                onSubmit={submit}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-xl text-white border border-white/20 space-y-4"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Add / Edit Product</h2>

                <div>
                    <label className="text-sm font-semibold">Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold">Price</label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                        value={form.price}
                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold">Description</label>
                    <textarea
                        placeholder="Enter product description"
                        className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none resize-none"
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        rows={4}
                        required
                    />
                </div>


                <div>
                    <label className="text-sm font-semibold">Category</label>
                    <input
                        type="text"
                        placeholder="Enter category"
                        className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold">Stock</label>
                    <input
                        type="number"
                        placeholder="Enter Stock"
                        className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                        value={form.stock}
                        onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    <label>Upload Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full"
                    />
                </div>

                {/* Image previews */}
                {preview.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                        {preview.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                className="w-20 h-20 rounded object-cover border"
                                alt="preview"
                            />
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 p-3 w-full rounded bg-blue-600 text-white font-semibold"
                >
                    {loading ? "Saving..." : "Save Product"}
                </button>
            </form>
        </div>
    );
}
