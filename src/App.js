import React from "react";

function App() {
  const products = [
    { name: "Vapes", img: "https://i.postimg.cc/TPK6RssC/Cart-Single.png" },
    { name: "Gummies", img: "https://i.postimg.cc/nrG8Rfsc/Gummies-Single.jpg" },
    { name: "Disposables", img: "https://i.postimg.cc/Y9gBFWMF/Dispo-Single.jpg" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative bg-black text-center py-32 px-4">
        <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
          Dante’s Extracts
        </h1>
        <p className="mt-4 text-2xl text-gray-300 italic">
          "If It Ain’t Dante, Why You Hittin’ It?"
        </p>
        <button className="mt-8 px-8 py-3 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-yellow-300 transition-all">
          Shop Now
        </button>
      </section>

      {/* Products Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-8 py-20 bg-neutral-900">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-zinc-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-yellow-400/50 transition-all flex flex-col items-center text-center"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-[600px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-yellow-400">{p.name}</h3>
              <p className="text-sm text-gray-400 mt-2">Premium HHC crafted with care.</p>
            </div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="px-8 py-24 text-center bg-black">
        <h2 className="text-4xl font-extrabold mb-6 text-yellow-400">
          Who is Dante?
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-400">
          Born from legacy. Inspired by loyalty. Dante’s Extracts was named after
          the rabbit who never left our side. We carry that same energy into every
          product — loyalty to quality, no shortcuts, no compromise.
        </p>
      </section>

      {/* Email Signup Section */}
      <section className="px-8 py-20 bg-neutral-900 text-center">
        <h3 className="text-2xl font-bold text-yellow-400 mb-3">
          Join the Dante Circle
        </h3>
        <p className="text-gray-400 mb-6">
          Get early drops, exclusive offers, and behind-the-scenes fire.
        </p>
        <div className="flex justify-center flex-wrap gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-l-xl bg-black border border-yellow-400 text-white focus:outline-none"
          />
          <button className="px-6 py-3 rounded-r-xl bg-yellow-400 text-black font-semibold hover:scale-105 transition-all">
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

export default App;
