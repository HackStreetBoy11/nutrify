// components/TargetSettings.jsx
import { useState } from "react";

export default function TargetSettings({ currentGoals, onSave, onClose }) {
    const [goals, setGoals] = useState(currentGoals);

    const handleChange = (e) => {
        setGoals({ ...goals, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave({
            calories: Number(goals.calories),
            protein: Number(goals.protein),
            carbs: Number(goals.carbs),
            fats: Number(goals.fats),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Set Daily Goals</h2>
                <div className="space-y-3">
                    {["calories", "protein", "carbs", "fats"].map((key) => (
                        <div key={key}>
                            <label className="block text-sm font-medium capitalize">
                                {key}
                            </label>
                            <input
                                type="number"
                                name={key}
                                value={goals[key]}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
