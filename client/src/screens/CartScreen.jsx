import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { removeFromCart, addToCart } from '../slices/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-6 rounded text-center text-lg">
          Your cart is empty. <br />
          <Link to="/" className="text-blue-600 font-bold hover:underline mt-2 inline-block">Go Back to Catalog</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow border border-gray-100 divide-y">
              {cartItems.map((item) => (
                <div key={item.product} className="p-4 flex flex-col sm:flex-row items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/product/${item.product}`} className="text-lg font-bold text-gray-800 hover:text-blue-600">{item.name}</Link>
                    <p className="text-gray-500 mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <select
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                      className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[...Array(item.countInStock || 5).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={() => removeFromCartHandler(item.product)}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
              <h2 className="text-2xl font-bold border-b pb-4 mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-lg">
                <span className="text-gray-600">Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                <span className="font-bold">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
              <button 
                onClick={checkoutHandler}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mt-6 rounded transition"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
