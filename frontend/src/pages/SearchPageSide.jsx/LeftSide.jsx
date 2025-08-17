import React from 'react'

function LeftSide() {
    return (
        <div className="hidden lg:flex flex-col gap-6 justify-center sticky top-24 self-start">
            {/* Calories */}
            <div className="p-4 bg-red-100 rounded-lg shadow-lg flex items-center gap-4 hover:scale-105 transition">
                <img src="https://img.icons8.com/color/96/fire-element--v1.png" alt="Calories" className="w-16 h-16" />
                <div>
                    <p className="font-bold text-red-700">Calories</p>
                    <p className="text-sm text-gray-600">Fuel for your body — balance intake with activity.</p>
                    <span className="badge badge-error mt-1">Avg: 2000 kcal/day</span>
                </div>
            </div>

            {/* Protein */}
            <div className="p-4 bg-green-100 rounded-lg shadow-lg flex items-center gap-4 hover:scale-105 transition">
                <img src="https://img.icons8.com/?size=80&id=NUPNDEQXdvXR&format=png" alt="Protein" className="w-16 h-16" />
                <div>
                    <p className="font-bold text-green-700">Protein</p>
                    <p className="text-sm text-gray-600">Builds muscle & repairs tissues. Aim for each meal!</p>
                    <span className="badge badge-success mt-1">Avg: 50g/day</span>
                </div>
            </div>

            {/* Carbs */}
            <div className="p-4 bg-yellow-100 rounded-lg shadow-lg flex items-center gap-4 hover:scale-105 transition">
                <img src="https://img.icons8.com/color/96/bread.png" alt="Carbs" className="w-16 h-16" />
                <div>
                    <p className="font-bold text-yellow-700">Carbs</p>
                    <p className="text-sm text-gray-600">Main energy source — choose whole grains & fruits.</p>
                    <span className="badge badge-warning mt-1">Avg: 275g/day</span>
                </div>
            </div>

            {/* Fats */}
            <div className="p-4 bg-blue-100 rounded-lg shadow-lg flex items-center gap-4 hover:scale-105 transition">
                <img src="https://img.icons8.com/color/96/avocado.png" alt="Fats" className="w-16 h-16" />
                <div>
                    <p className="font-bold text-blue-700">Fats</p>
                    <p className="text-sm text-gray-600">Supports hormones & brain health — pick healthy fats.</p>
                    <span className="badge badge-info mt-1">Avg: 70g/day</span>
                </div>
            </div>

            <div className="p-4 bg-primary text-primary-content rounded-lg shadow-lg transform hover:scale-105 transition">
                <p className="font-bold">🥗 Habit Builder</p>
                <p className="text-sm">Meal prep on weekends to save time & eat healthier all week.</p>
            </div>
        </div>
    )
}

export default LeftSide
