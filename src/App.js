import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

function Hero() {
  return (
    <section className="relative bg-black text-white h-[85vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* === Animated Bunny Logos === */}
      <div className="absolute inset-0 flex justify-between items-center z-0 px-6 sm:px-10 md:px-20">
        <img
          src="/images/logo.png"
          alt="Logo Left"
          className="opacity-20 max-w-[300px] sm:max-w-[350px] md:max-w-[400px] animate-bounce"
        />
        <img
          src="/images/logo.png"
          alt="Logo Center"
          className="opacity-20 max-w-[320px] sm:max-w-[380px] md:max-w-[440px] animate-bounce"
        />
        <img
          src="/images/logo.png"
          alt="Logo Right"
          className="opacity-20 max-w-[300px] sm:max-w-[350px] md:max-w-[400px] animate-bounce"
        />
      </div>

      {/* === Foreground Text === */}
      <div className="relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-yellow-400 mb-4">
          Dante’s Extracts
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10">
          Premium vapes, potent gummies, and next-level disposables made for the real ones.
        </p>
        <Link
          to="/shop"
          className="bg-yellow-400 text-black text-lg font-bold px-10 py-4 rounded-full hover:bg-yellow-300 transition"
        >
          Enter the Shop
        </Link>
      </div>
    </section>
  );
}

function App() {
  const products = [
    {
      name: "Vapes",
      img: "/images/Vapes.jpg",
      category: "vapes",
      strains: ["Pineapple OG", "Lemon Diesel", "Blueberry Kush"],
    },
    {
      name: "Gummies",
      img: "/images/Gummies.jpg",
      category: "gummies",
      flavors: ["Blue Raspberry", "Watermelon", "Sour Apple"],
    },
    {
      name: "Disposables",
      img: "/images/Disposables.jpg",
      category: "disposables",
      strains: ["Mango Punch", "Strawberry Gelato", "Grape Gas"],
    },
  ];

  return (
    <Router>
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-zinc-800">
        <Link to="/" className="text-2xl font-bold text-yellow-400">Dante’s</Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/shop" className="hover:text-yellow-300">Shop</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />

              <section className="bg-black text-white text-center py-20">
                <h2 className="text-4xl font-bold mb-6">Ready to elevate?</h2>
                <Link
                  to="/shop"
                  className="inline-block bg-yellow-400 text-black font-bold text-lg px-8 py-4 rounded-full hover:bg-yellow-300 transition"
                >
                  Browse All Products
                </Link>
              </section>

              <section className="bg-white text-black py-20 px-6 text-center">
                <h2 className="text-3xl font-extrabold mb-6">Why Dante?</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mb-10">
                  Trusted by real ones, loved for real potency. We don’t cut corners—just clean hits, lab-tested goods, and flavor that slaps.
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="w-72 p-6 border border-zinc-200 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Crafted for Potency</h3>
                    <p className="text-sm text-gray-600">Our extracts don’t play around. Strong, smooth, and satisfying every time.</p>
                  </div>
                  <div className="w-72 p-6 border border-zinc-200 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Tested & Verified</h3>
                    <p className="text-sm text-gray-600">We lab test every batch. No cap. You’re getting pure, premium product always.</p>
                  </div>
                  <div className="w-72 p-6 border border-zinc-200 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Flavor That Hits</h3>
                    <p className="text-sm text-gray-600">We don’t do boring. Every product comes packed with mouth-watering flavor.</p>
                  </div>
                </div>
              </section>
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <div className="bg-zinc-900 text-white px-6 py-20 font-sans min-h-screen">
              <h2 className="text-4xl text-center font-extrabold text-yellow-400 mb-10">Shop By Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {products.map((product) => (
                  <Link
                    to={`/shop/${product.category}`}
                    key={product.name}
                    className="bg-zinc-800 rounded-xl overflow-hidden shadow hover:shadow-yellow-400/30 transition"
                  >
                    <img src={product.img} alt={product.name} className="w-full aspect-square object-cover" />
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-bold text-yellow-400">{product.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          }
        />
        <Route path="/shop/:category" element={<CategoryDetails products={products} />} />
      </Routes>

      <footer className="bg-black text-white py-6 text-center text-sm">
        <p className="text-gray-400 mb-2">Follow us on socials</p>
        <div className="flex justify-center gap-6 text-yellow-400 font-medium">
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Twitter</a>
        </div>
      </footer>
    </Router>
  );
}

function CategoryDetails({ products }) {
  const { category } = useParams();
  const selected = products.find((p) => p.category === category.toLowerCase());

  if (!selected) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-4xl font-bold text-yellow-400">Category not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-black text-white px-6 py-20 font-sans min-h-screen text-center">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-10">{selected.name}</h2>
      <ul className="space-y-4 max-w-md mx-auto">
        {(selected.strains || selected.flavors).map((item, i) => (
          <li key={i} className="bg-zinc-800 py-3 rounded-xl text-lg text-white">{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
