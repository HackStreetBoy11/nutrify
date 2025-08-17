import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function TrackPage() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        async function fetchFoodsByDate() {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/food/tracked?date=${selectedDate}`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" }
                });
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
        caloriesTotal += foods[i].calories;
        proteinTotal += foods[i].protein;
        carbsTotal += foods[i].carbs;
        fatsTotal += foods[i].fats;
    }

    const totals = [
        { name: "Calories", value: caloriesTotal },
        { name: "Protein (g)", value: proteinTotal },
        { name: "Carbs (g)", value: carbsTotal },
        { name: "Fats (g)", value: fatsTotal }
    ];

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
            {/* Left side quote & image */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="hidden lg:flex flex-col items-center absolute left-6 top-1/4 max-w-xs text-center space-y-4"
            >
                <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
                    alt="Healthy food"
                    className="rounded-2xl shadow-lg"
                />
                <p className="italic font-semibold text-gray-700">
                    "Your body is your most priceless possession. Take care of it."
                </p>
            </motion.div>

            {/* Main content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl bg-white mx-auto p-6 rounded-lg shadow-lg z-10"
            >
                <h1 className="text-3xl font-bold mb-6 text-center">Food Log</h1>

                {/* Date picker */}
                <div className="flex justify-center mb-6">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border rounded p-2"
                    />
                </div>

                {loading ? (
                    <p className="text-center mt-8">Loading your food log...</p>
                ) : foods.length === 0 ? (
                    <p className="text-gray-500 text-center">No foods tracked for this date.</p>
                ) : (
                    <>
                        {/* Table container with scroll */}
                        <div className="max-h-96 overflow-y-auto">
                            <motion.table
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="table-auto w-full text-left border-collapse"
                            >
                                <thead>
                                    <tr className="bg-gray-100 sticky top-0 z-10">
                                        <th className="p-3">Food</th>
                                        <th className="p-3">Quantity (g)</th>
                                        <th className="p-3">Calories</th>
                                        <th className="p-3">Protein (g)</th>
                                        <th className="p-3">Carbs (g)</th>
                                        <th className="p-3">Fats (g)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foods.map((item, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-b"
                                        >
                                            <td className="p-3">{item.name}</td>
                                            <td className="p-3">{item.quantity}</td>
                                            <td className="p-3">{item.calories.toFixed(1)}</td>
                                            <td className="p-3">{item.protein.toFixed(1)}</td>
                                            <td className="p-3">{item.carbs.toFixed(1)}</td>
                                            <td className="p-3">{item.fats.toFixed(1)}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </motion.table>
                        </div>


                        {/* Bar Chart */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 p-4 bg-gray-50 rounded-lg"
                        >
                            <p className="font-bold mb-4">Visual Totals for {selectedDate}:</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={totals}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#82ca9d" animationDuration={1000} />
                                </BarChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </>
                )}
            </motion.div>

            {/* Right side quote & image */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="hidden lg:flex flex-col items-center absolute right-6 top-1/4 max-w-xs text-center space-y-4"
            >
                <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
                    alt="Fresh salad"
                    className="rounded-2xl shadow-lg"
                />
                <p className="italic font-semibold text-gray-700">
                    "Every healthy choice you make today builds a stronger tomorrow."
                </p>
            </motion.div>
        </div>
    );
}
