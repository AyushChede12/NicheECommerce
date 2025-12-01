import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
    
        try {
            await authApi.register(form);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-700 p-4">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-white border border-white/20">

                <h2 className="text-3xl font-bold text-center mb-6">Create Your Account</h2>
                <p className="text-center text-white/80 mb-8">
                    Register as a Customer or Artisan
                </p>

                <form onSubmit={submit} className="flex flex-col gap-4">

                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-semibold">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            value={form.password}
                            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-sm font-semibold">Register As</label>
                        <select
                            value={form.role}
                            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                            className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none cursor-pointer"
                        >
                            <option className="text-black" value="customer">Customer</option>
                            <option className="text-black" value="artisan">Artisan</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 p-3 w-full rounded-lg text-lg font-semibold transition 
                            ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg hover:shadow-2xl'
                            }`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {/* Login Redirect */}
                <div className="text-center mt-6">
                    <p className="text-white/70">
                        Already have an account?{" "}
                        <span
                            className="text-yellow-300 hover:underline cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}
