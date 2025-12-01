import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaShoppingBag, FaBoxOpen, FaChartBar } from "react-icons/fa";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const actions = [
        {
            title: "Approve Artisans",
            desc: "Review and approve artisan accounts waiting for verification.",
            icon: <FaUsers size={30} />,
            route: "/artisan",
        },
        {
            title: "Approve Products",
            desc: "Approve new handmade products submitted by artisans.",
            icon: <FaBoxOpen size={30} />,
            route: "/product/new",
        },
        {
            title: "Orders & Transactions",
            desc: "View recent customer orders and payment activities.",
            icon: <FaShoppingBag size={30} />,
            route: "/orders",
        },
        {
            title: "Reports & Analytics",
            desc: "Track sales, top products, artisan performance charts.",
            icon: <FaChartBar size={30} />,
            route: "/admin/reports",
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-yellow-300 mb-6">
                Admin Dashboard
            </h1>

            <p className="text-white/80 mb-6">
                Welcome to the Admin Control Panel. Manage marketplace content,
                approve artisans, products, track orders and view analytics.
            </p>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {actions.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(item.route)}
                        className="cursor-pointer bg-white/10 backdrop-blur-md p-6 rounded-xl 
                        hover:bg-white/20 transition-all shadow-lg hover:shadow-2xl border border-white/10"
                    >
                        <div className="text-yellow-300 mb-3">{item.icon}</div>
                        <h2 className="text-xl font-semibold text-black mb-2">
                            {item.title}
                        </h2>
                        <p className="text-black/70 text-sm">{item.desc}</p>

                        <button
                            onClick={() => navigate(item.route)}
                            className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 shadow"
                        >
                            Manage
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
