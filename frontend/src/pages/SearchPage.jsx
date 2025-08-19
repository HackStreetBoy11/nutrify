import { useState, useEffect } from "react";
import LeftSide from "./SearchPageSide.jsx/LeftSide";
import RightSide from "./SearchPageSide.jsx/RightSide";
import toast from "react-hot-toast";

export default function SearchPage() {
    const [foodItems, setFoodItems] = useState([]);
    const [food, setFood] = useState(null);
    const [quantity, setQuantity] = useState(100); // grams
    const [tipIndex, setTipIndex] = useState(0);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }


    const tips = [
        "Drink at least 2 liters of water daily 💧",
        "Eat more fiber to keep your gut happy 🌱",
        "A colorful plate is a healthy plate 🎨",
        "Don't skip breakfast — it fuels your day ☀️",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % tips.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    function searchFood(e) {
        const query = e.target.value; 
        if (query.length > 2) { // Start searching after 3 characters
            fetch(
                `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=eaXR8kjXm6roxkfIL5XCSLgtbvc1tdEa4SH9NNWT`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.foods) {
                        const mapped = data.foods.map((item) => {
                            const nutrients = {};
                            item.foodNutrients.forEach((n) => {
                                nutrients[n.nutrientName] = n.value;
                            });
                            return {
                                _id: item.fdcId,
                                name: item.description,
                                calories: nutrients["Energy"] || 0,
                                protein: nutrients["Protein"] || 0,
                                carbs: nutrients["Carbohydrate, by difference"] || 0,
                                fats: nutrients["Total lipid (fat)"] || 0,
                            };
                        });
                        setFoodItems(mapped);
                    }
                })
                .catch((err) => console.error(err));
        } else {
            setFoodItems([]);
        }
    }

    function scaledNutrients(nutrientValue) {
        return ((nutrientValue || 0) * quantity) / 100;
    }

    // Function to save the food to backend
    async function addToTrack() {
        if (!food) return;
        const trackedFood = {
            name: food.name,
            quantity,
            calories: scaledNutrients(food.calories),
            protein: scaledNutrients(food.protein),
            carbs: scaledNutrients(food.carbs),
            fats: scaledNutrients(food.fats),
            date: new Date(),
        };

        try {
            const res = await fetch("http://localhost:5000/api/food/track", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie("jwt")}`,
                },
                body: JSON.stringify(trackedFood),
            });
            const data = await res.json();
            console.log("Saved:", data);
            toast.success("Food added to your track!");
        } catch (err) {
            console.error(err);
            alert("Failed to save food.");
        }

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center py-20 px-4 relative">
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-40"></div>

            <h1 className="text-5xl font-extrabold text-primary mb-2 drop-shadow-md">
                NutriTrack
            </h1>
            <p className="text-lg italic text-gray-600 mb-8">{tips[tipIndex]}</p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full max-w-7xl z-10">
                {/* LEFT SIDE — Macro Spotlight */}
                <LeftSide />

                {/* CENTER — Search & Food Details */}
                <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full border border-gray-200 lg:col-span-2">
                    <h2 className="text-3xl font-semibold mb-6 text-center">
                        Track Your Food
                    </h2>

                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search for food..."
                            className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                            onChange={searchFood}
                        />
                        {foodItems.length > 0 && (
                            <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto border border-gray-200 animate-fadeIn">
                                {foodItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="px-4 py-3 cursor-pointer hover:bg-green-50 transition-colors duration-150"
                                        onClick={() => {
                                            setFood(item);
                                            setQuantity(100);
                                            setFoodItems([]);
                                        }}
                                    >
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.calories} kcal · {item.protein}g protein
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Selected Food Card */}
                    {food && (
                        <div className="mt-6 p-4 border rounded-lg shadow-md bg-base-200 animate-fadeIn">
                            <h3 className="text-xl font-bold mb-2">{food.name}</h3>

                            {/* Quantity Input */}
                            <div className="flex items-center gap-2 mb-4">
                                <label className="text-sm font-medium">Quantity (g):</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="input input-sm input-bordered w-24"
                                />
                            </div>

                            {/* Calories */}
                            <div className="mb-2">
                                <span className="badge badge-primary">
                                    Calories: {scaledNutrients(food.calories).toFixed(1)} kcal
                                </span>
                                <progress
                                    className="progress progress-primary w-full"
                                    value={scaledNutrients(food.calories)}
                                    max="800"
                                ></progress>
                            </div>

                            {/* Protein */}
                            <div className="mb-2">
                                <p className="text-sm">
                                    Protein: {scaledNutrients(food.protein).toFixed(1)} g
                                </p>
                                <progress
                                    className="progress progress-success w-full"
                                    value={scaledNutrients(food.protein)}
                                    max="100"
                                ></progress>
                            </div>

                            {/* Carbs */}
                            <div className="mb-2">
                                <p className="text-sm">
                                    Carbs: {scaledNutrients(food.carbs).toFixed(1)} g
                                </p>
                                <progress
                                    className="progress progress-warning w-full"
                                    value={scaledNutrients(food.carbs)}
                                    max="150"
                                ></progress>
                            </div>

                            {/* Fats */}
                            <div className="mb-2">
                                <p className="text-sm">
                                    Fats: {scaledNutrients(food.fats).toFixed(1)} g
                                </p>
                                <progress
                                    className="progress progress-error w-full"
                                    value={scaledNutrients(food.fats)}
                                    max="100"
                                ></progress>
                            </div>

                            {/* Add to Track Button */}
                            <button
                                className="btn btn-primary mt-4 w-full"
                                onClick={addToTrack}
                            >
                                Add to Track
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE — Healthy Habits */}
                <RightSide />
            </div>
        </div>
    );
}
