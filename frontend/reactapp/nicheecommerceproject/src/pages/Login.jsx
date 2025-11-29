import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await authApi.login(form);
            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "customer") {
                alert("Login successful!");
            } else if (user.role === "artisan") {
                navigate("/admin");   // artisan dashboard
            }

        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-purple-800 p-4">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-white border border-white/20">

                <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
                <p className="text-center text-white/80 mb-8">
                    Login to continue your experience
                </p>

                <form onSubmit={submit} className="flex flex-col gap-4">

                    {/* Email input */}
                    <div>
                        <label className="text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password input */}
                    <div>
                        <label className="text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 bg-white/20 rounded-lg mt-1 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 p-3 w-full rounded-lg text-lg font-semibold transition 
                            ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg hover:shadow-2xl'
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-white/70">
                        Don’t have an account?{" "}
                        <span
                            className="text-yellow-300 hover:underline cursor-pointer"
                            onClick={() => navigate('/register')}
                        >
                            Sign up
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}
