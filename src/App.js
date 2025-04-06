"import React from "react";
import "./App.css";

function App() {
  const products = [
    { name: "Vapes", img: "/images/Vapes.jpg" },
    { name: "Gummies", img: "/images/Gummies.jpg" },
    { name: "Disposables", img: "/images/Disposables.jpg" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4">
          Dante’s Extracts
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-gray-300 italic">
          "If It Ain’t Dante, Why You Hittin’ It?"
        </p>
        <button className="mt-8 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-2xl shadow-lg hover:scale-105 transition">
          Shop Now
        </button>
      </section>

      {/* Products */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-16 bg-neutral-900">
        {products.map((p) => (
          <div key={p.name} className="bg-black rounded-xl shadow-lg overflow-hidden hover:shadow-yellow-400/50 transition">
            <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-yellow-400">{p.name}</h3>
              <p className="text-sm text-gray-400 mt-2">Premium HHC crafted with care.</p>
            </div>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="px-8 py-20 text-center bg-black">
        <h2 className="text-4xl font-bold mb-6 text-yellow-400">Who is Dante?</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-400">
          Born from legacy. Inspired by loyalty. Dante’s Extracts was named after the rabbit who never left our side.
          We carry that same energy into every product — loyalty to quality, no shortcuts, no compromise.
        </p>
      </section>

      {/* Email Signup */}
      <section className="px-8 py-16 bg-neutral-900 text-center">
        <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Join the Dante Circle</h3>
        <p className="text-gray-400 mb-6">Get early drops, exclusive offers, and behind-the-scenes fire.</p>
        <div className="flex justify-center flex-wrap gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-xl bg-black border border-yellow-400 text-white focus:outline-none"
          />
          <button className="px-4 py-2 rounded-r-xl bg-yellow-400 text-black font-semibold hover:scale-105 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 bg-black text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Dante’s Extracts. All rights reserved.
      </footer>
    </div>
  );
}

export default App; "