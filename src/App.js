import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

// Main App
function App() {
  const [cart, setCart] = useState([]);
  const products = [
    {
      name: "Vapes",
      img: "/images/Vapes.jpg",
      price: 29.99,
      flavors: ["Pineapple OG", "Lemon Diesel", "Blueberry Kush"],
      strengths: ["1g"],
    },
    {
      name: "Gummies",
      img: "/images/Gummies.jpg",
      price: 19.99,
      flavors: ["Blue Raspberry", "Watermelon", "Sour Apple"],
      strengths: ["25mg", "50mg", "100mg"],
    },
    {
      name: "Disposables",
      img: "/images/Disposables.jpg",
      price: 34.99,
      flavors: ["Mango Punch", "Strawberry Gelato", "Grape Gas"],
      strengths: ["2g"],
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-black text-yellow-400 px-6 py-4 flex justify-between items-center shadow-md">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:text-yellow-300 transition"
        >
          Dante’s Extracts
        </Link>
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/cart" className="relative hover:text-yellow-300 transition">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/shop" className="hover:text-yellow-300 transition">
            Shop
          </Link>
        </div>
      </nav>

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <div className="bg-black text-white font-sans">
              <section className="text-center py-20">
                <h1 className="text-6xl font-extrabold text-yellow-400 mb-4">
                  Dante’s Extracts
                </h1>
                <p className="text-xl text-gray-300 italic">
                  "If It Ain’t Dante, Why You Hittin’ It?"
                </p>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-8 py-20 bg-neutral-900">
                {products.map((p) => (
                  <Link
                    key={p.name}
                    to={`/${p.name.toLowerCase()}`}
                    className="bg-zinc-900 rounded-2xl shadow-xl hover:shadow-yellow-400/50 transition flex flex-col items-center text-center overflow-hidden"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full aspect-[2/3] object-contain"
                    />
                    <div className="p-4">
                      <h3 className="text-2xl font-bold text-yellow-400">
                        {p.name}
                      </h3>
                      <p className="text-gray-300 mt-2">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </section>
            </div>
          }
        />

        {/* Product Pages */}
        {products.map((p) => (
          <Route
            key={p.name}
            path={`/${p.name.toLowerCase()}`}
            element={<ProductPage product={p} addToCart={addToCart} />}
          />
        ))}

        {/* Cart Page */}
        <Route
          path="/cart"
          element={<CartPage cart={cart} />}
        />

        {/* Shop Page (placeholder for now) */}
        <Route
          path="/shop"
          element={
            <div className="shop-page">
              <h2>Shop Page</h2>
              <p>Here you can browse all our products!</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

// Product Page
function ProductPage({ product, addToCart }) {
  return (
    <div className="min-h-screen bg-black text-white font-sans px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          {/* Image */}
          <div className="flex-1">
            <img
              src={product.img}
              alt={product.name}
              className="w-full max-w-md mx-auto aspect-[2/3] object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl font-extrabold text-yellow-400 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-300 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-white mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="mb-4">
              <label className="block text-yellow-400 mb-1">Flavor</label>
              <select className="w-full bg-black border border-yellow-400 text-white px-4 py-2 rounded">
                {product.flavors.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-yellow-400 mb-1">Strength</label>
              <select className="w-full bg-black border border-yellow-400 text-white px-4 py-2 rounded">
                {product.strengths.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition"
            >
              Add to Cart
            </button>

            <p className="text-green-400 text-sm mt-2">✅ Lab-Tested | 3rd Party Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Page
function CartPage({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 font-sans">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, idx) => (
            <div key={idx} className="border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-semibold text-yellow-400">{item.name}</h2>
              <p className="text-gray-300">${item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-6 text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
