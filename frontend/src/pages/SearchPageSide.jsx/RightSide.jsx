import React from 'react'

function RightSide() {
    return (
        <div className="hidden lg:flex flex-col gap-6 justify-center sticky top-24 self-start">
            <img
                src="https://images.unsplash.com/photo-1506807803488-8eafc15316c7?w=400"
                alt="Fresh Fruits"
                className="rounded-lg shadow-lg hover:scale-105 transition"
            />
            <div className="p-4 bg-secondary text-secondary-content rounded-lg shadow-lg transform hover:scale-105 transition">
                <p className="font-bold">💡 Quick Tip</p>
                <p className="text-sm">Half your plate should be veggies & fruits for optimal nutrition.</p>
            </div>

            <img
                src="https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWQlMjBib3dsfGVufDB8fDB8fHww "
                alt="Healthy Salad Bowl"
                className="w-64 h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition"
            />

        </div>
    )
}

export default RightSide
