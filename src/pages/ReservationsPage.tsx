import React from "react";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-xl w-full text-center">
                <h1 className="text-4xl font-bold mb-4">Witaj na stronie głównej!</h1>
                <p className="text-gray-600 text-lg mb-6">
                    To jest prosty przykładowy homepage stworzony w React.
                </p>
                <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                    Kliknij mnie
                </button>
            </div>
        </div>
    );
}
