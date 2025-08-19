import { useState, useEffect } from "react";
import { motion } from "framer-motion";


import TargetSettings from "../components/TargetSettings"; // import modal

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const DAILY_GOALS = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 70,
};


export default function TrackPage() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(

        new Date().toISOString().split("T")[0]
    );
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        async function fetchFoodsByDate() {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:5000/api/food/tracked?date=${selectedDate}`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const data = await res.json();
                setFoods(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch foods:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchFoodsByDate();
    }, [selectedDate]);

    let caloriesTotal = 0;
    let proteinTotal = 0;
    let carbsTotal = 0;
    let fatsTotal = 0;

    for (let i = 0; i < foods.length; i++) {
        caloriesTotal += (foods[i].calories);
        proteinTotal += (foods[i].protein);
        carbsTotal += (foods[i].carbs);
        fatsTotal += (foods[i].fats);
    }

    const totals = [
        { name: "Calories", value: caloriesTotal },
        { name: "Protein (g)", value: proteinTotal },
        { name: "Carbs (g)", value: carbsTotal },
        { name: "Fats (g)", value: fatsTotal },
    ];

    const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

    const statCards = [
        {
            label: "Calories",
            value: caloriesTotal.toFixed(0),
            goal: DAILY_GOALS.calories,
            color: "bg-orange-100 text-orange-700",
        },
        {
            label: "Protein",
            value: proteinTotal.toFixed(0) + "g",
            goal: DAILY_GOALS.protein + "g",
            color: "bg-blue-100 text-blue-700",
        },
        {
            label: "Carbs",
            value: carbsTotal.toFixed(0) + "g",
            goal: DAILY_GOALS.carbs + "g",
            color: "bg-green-100 text-green-700",
        },
        {
            label: "Fats",
            value: fatsTotal.toFixed(0) + "g",
            goal: DAILY_GOALS.fats + "g",
            color: "bg-yellow-100 text-yellow-700",
        },
    ];

    return (
        <div className="min-h-screen mt-12 px-6 py-8 bg-gray-100">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-6 text-center"
            >
                <h1 className="text-3xl font-bold text-center">Nutrition Dashboard</h1>
                <button
                    onClick={() => setShowSettings(true)}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    ⚙️ Set Goals
                </button>

            </motion.h1>

            {showSettings && (
                <TargetSettings
                    currentGoals={goals}
                    onSave={setGoals}
                    onClose={() => setShowSettings(false)}
                />
            )}

            {/* Date Picker */}
            <div className="flex justify-center mb-6">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded p-2"
                />
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-4 rounded-xl shadow-md ${card.color}`}
                    >
                        <h3 className="text-sm font-medium">{card.label}</h3>
                        <p className="text-xl font-bold">{card.value}</p>
                        <p className="text-xs">Goal: {card.goal}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Bar Chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                    <h2 className="font-semibold mb-4">Daily Totals</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={totals}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => Math.round(value)} />
                            <Bar dataKey="value" fill="#82ca9d" animationDuration={1000} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Macros Pie */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                    <h2 className="font-semibold mb-4">Macro Distribution</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: "Protein", value: Math.round(proteinTotal) },
                                    { name: "Carbs", value: Math.round(carbsTotal) },
                                    { name: "Fats", value: Math.round(fatsTotal) },
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                dataKey="value"
                                label
                            >
                                {["#0088FE", "#00C49F", "#FFBB28"].map((color, index) => (
                                    <Cell key={index} fill={color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Food Log Table */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-md"
            >
                <h2 className="font-semibold mb-4">Food Log</h2>
                {loading ? (
                    <p className="text-center mt-8">Loading your food log...</p>
                ) : foods.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No foods tracked for this date.
                    </p>
                ) : (
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                        <table className="table-auto w-full border border-gray-300 border-collapse">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    <th className="p-3 border border-gray-300">Food</th>
                                    <th className="p-3 border border-gray-300">Quantity (g)</th>
                                    <th className="p-3 border border-gray-300">Calories</th>
                                    <th className="p-3 border border-gray-300">Protein (g)</th>
                                    <th className="p-3 border border-gray-300">Carbs (g)</th>
                                    <th className="p-3 border border-gray-300">Fats (g)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 border border-gray-300">{item.name}</td>
                                        <td className="p-3 border border-gray-300">{item.quantity}</td>
                                        <td className="p-3 border border-gray-300">{item.calories.toFixed(1)}</td>
                                        <td className="p-3 border border-gray-300">{item.protein.toFixed(1)}</td>
                                        <td className="p-3 border border-gray-300">{item.carbs.toFixed(1)}</td>
                                        <td className="p-3 border border-gray-300">{item.fats.toFixed(1)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </motion.div>
        </div>
    );
}
