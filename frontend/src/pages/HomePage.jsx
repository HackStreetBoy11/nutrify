import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {


    const { authUser } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-b from-base-200 to-base-100 min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="hero min-h-screen bg-gradient-to-r from-primary to-secondary text-primary-content">
                <div className="hero-content flex-col lg:flex-row gap-12">

                    {/* Image Placeholder */}
                    <img
                        src="https://images.unsplash.com/photo-1662743234719-d893bd7e6b61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhbGFkc3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Healthy Lifestyle"
                        className="max-w-sm rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500"
                    />

                    {/* Text Content */}
                    <div className="max-w-lg">
                        <h1 className="text-6xl font-extrabold mb-6 leading-tight animate-fade-in">
                            Fuel Your Body, <br />
                            <span className="text-accent">Fuel Your Life.</span>
                        </h1>
                        <p className="py-4 text-lg italic opacity-90">
                            "The food you eat can be the safest and most powerful form of medicine."
                        </p>
                        <p className="text-sm opacity-80">
                            Discover healthy recipes, track your nutrition, and connect with people who share your goals.
                        </p>
                        <div className="mt-6 flex gap-4">
                            {authUser ? (<button className="btn btn-accent btn-lg" onClick={()=>{
                                navigate('/search');
                            }} >Start Tracking</button>) : (<button onClick={() => {
                                navigate('/login');
                            }} className="btn btn-outline btn-lg">Login</button>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="bg-base-100 py-16 text-center shadow-inner">
                <h2 className="text-4xl font-bold mb-4 text-primary">
                    "Your diet is a bank account. Good food choices are good investments."
                </h2>
                <p className="opacity-80">– Bethenny Frankel</p>
            </section>

            {/* Image Gallery */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-10">Healthy Inspirations</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
                        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww",
                        "https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "https://images.unsplash.com/photo-1594058573823-d8edf1ad3380?q=80&w=762&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "https://plus.unsplash.com/premium_photo-1694557638126-07deda950f05?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

                    ].map((src, index) => (
                        <img
                            key={index}
                            src={`${src}?q=80&w=800&auto=format&fit=crop`}
                            alt={`Gallery ${index + 1}`}
                            className="rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500"
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
