import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

// 1) HERO SECTION (HOME)
function Hero() {
  return (
    <section className="relative text-white flex flex-col justify-center items-center text-center px-6 overflow-hidden min-h-[85vh] bg-black">
      {/* Background logos */}
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

      {/* Foreground text */}
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

// 2) CART PAGE
function Cart({ cart, setCart }) {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="bg-zinc-900 text-white px-6 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-6 text-center">
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-gray-300 mb-4">Your cart is currently empty.</p>
            <Link
              to="/shop"
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-zinc-800 rounded-xl p-4 shadow mb-6">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-700 py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center gap-4">
                    <p>Qty: {item.quantity}</p>
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-red-400 hover:text-red-300 text-sm underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-lg mb-6">
              <p className="text-gray-200">Subtotal</p>
              <p className="text-yellow-400 font-bold">
                ${subtotal.toFixed(2)}
              </p>
            </div>

            <div className="text-center">
              <button
                className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 3) CATEGORY DETAILS
function CategoryDetails({ products, addToCart }) {
  const { category } = useParams();
  const selectedCategory = products.find(
    (cat) => cat.category.toLowerCase() === category.toLowerCase()
  );

  if (!selectedCategory) {
    return (
      <div className="text-center text-white py-20 bg-black min-h-screen">
        <h2 className="text-4xl font-bold text-yellow-400">Category Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block text-yellow-400 underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 text-white px-6 py-20 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-yellow-400">
            {selectedCategory.name}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Browse our selection of {selectedCategory.name.toLowerCase()}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {selectedCategory.products.map((prod, idx) => (
            <ProductCard key={idx} product={prod} addToCart={addToCart} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-block bg-yellow-400 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}

// 3b) PRODUCT CARD
function ProductCard({ product, addToCart }) {
  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow flex flex-col">
      <div className="mb-3 overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain"
        />
      </div>
      <h3 className="text-xl font-bold text-yellow-400">{product.name}</h3>
      <p className="text-sm text-gray-400 mt-1 mb-2">{product.description}</p>
      <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>

      <button
        onClick={handleAddToCart}
        className="mt-auto bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

// 4) MAIN APP
export default function App() {
  const productsData = [
    {
      name: "Vapes",
      category: "vapes",
      products: [
        {
          name: "Pineapple OG Vape",
          description: "A tropical burst with a smooth OG finish.",
          price: 29.99,
          image: "/images/Vapes.jpg",
        },
        {
          name: "Lemon Diesel Vape",
          description: "Citrus zing meets earthy diesel undertones.",
          price: 29.99,
          image: "/images/Vapes.jpg",
        },
        {
          name: "Blueberry Kush Vape",
          description: "Sweet blueberry flavor with a heavy kush punch.",
          price: 29.99,
          image: "/images/Vapes.jpg",
        },
      ],
    },
    {
      name: "Gummies",
      category: "gummies",
      products: [
        {
          name: "Blue Raspberry Gummies",
          description: "Sweet & tangy gummies that pack a potent punch.",
          price: 19.99,
          image: "/images/Gummies.jpg",
        },
        {
          name: "Watermelon Gummies",
          description: "Juicy watermelon flavor, perfect for summertime.",
          price: 19.99,
          image: "/images/Gummies.jpg",
        },
        {
          name: "Sour Apple Gummies",
          description: "Tart green apple taste with a sour twist.",
          price: 24.99,
          image: "/images/Gummies.jpg",
        },
      ],
    },
    {
      name: "Disposables",
      category: "disposables",
      products: [
        {
          name: "Mango Punch Disposable",
          description: "Exotic mango meets a knockout punch of potency.",
          price: 29.99,
          image: "/images/mango.jpg",
        },
        {
          name: "Strawberry Gelato Disposable",
          description: "Creamy strawberry flavor with a classic gelato aroma.",
          price: 29.99,
          image: "/images/strawberry.jpg",
        },
        {
          name: "Grape Gas Disposable",
          description: "Bold grape taste with a gassy, robust finish.",
          price: 29.99,
          image: "/images/grape.jpg",
        },
      ],
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.name === product.name);
    if (existingIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Router>
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-zinc-800">
          <Link to="/" className="text-2xl font-bold text-yellow-400">
            Dante’s
          </Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>
            <Link to="/shop" className="hover:text-yellow-300">
              Shop
            </Link>
            <Link to="/cart" className="hover:text-yellow-300">
              Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </Link>
          </div>
        </nav>

        <Routes>
          {/* Home / Hero */}
          <Route path="/" element={<Hero />} />

          {/* Shop Overview */}
          <Route
            path="/shop"
            element={
              <div className="bg-zinc-900 px-6 py-20 min-h-screen">
                <h2 className="text-4xl text-center font-extrabold text-yellow-400 mb-10">
                  Shop By Category
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {productsData.map((cat) => (
                    <Link
                      to={`/shop/${cat.category}`}
                      key={cat.name}
                      className="bg-zinc-800 rounded-xl overflow-hidden shadow hover:shadow-yellow-400/30 transition"
                    >
                      <img
                        src={cat.products[0].image}
                        alt={cat.name}
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-4 text-center">
                        <h3 className="text-xl font-bold text-yellow-400">
                          {cat.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            }
          />

          {/* Category Route */}
          <Route
            path="/shop/:category"
            element={
              <CategoryDetails products={productsData} addToCart={addToCart} />
            }
          />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>

        <footer className="bg-black text-center text-sm py-6 mt-auto">
          <p className="text-gray-400 mb-2">Follow us on socials</p>
          <div className="flex justify-center gap-6 text-yellow-400 font-medium">
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
          </div>
        </footer>
      </Router>
    </div>
  );
}
