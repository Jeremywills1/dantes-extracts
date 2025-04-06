import React, { useEffect, useState } from "react";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (index, change) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    if (newCart[index].quantity < 1) newCart[index].quantity = 1;
    setCart(newCart);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 font-sans">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-center bg-neutral-900 p-4 rounded-xl shadow-md">
              {/* Display product image */}
              <img
                src={item.img}
                alt={item.name}
                className="w-28 h-40 object-contain rounded bg-black"
              />
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-semibold text-yellow-400">{item.name}</h2>
                <p className="text-sm text-gray-300 mt-1">Flavor: {item.flavor}</p>
                <p className="text-sm text-gray-300">Strength: {item.strength}</p>
                <p className="text-sm text-white font-bold mt-2">${item.price.toFixed(2)} each</p>
                
                {/* Quantity buttons */}
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-3 py-1 bg-yellow-400 text-black rounded-lg"
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-3 py-1 bg-yellow-400 text-black rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove item button */}
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:underline mt-4 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="text-right mt-6 text-2xl font-bold text-yellow-400">
            Total: ${total.toFixed(2)}
          </div>

          {/* Checkout Button */}
          <div className="mt-6 flex justify-end">
            <button
              className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full hover:scale-105 transition-all"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
