import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ChevronLeft } from 'lucide-react';
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

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 animate-in fade-in zoom-in duration-500">
        <div className="glass-card p-12 text-center border-white/5 bg-white/5 backdrop-blur-xl">
           <div className="bg-indigo-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
             <ShoppingBag className="w-10 h-10" />
           </div>
           <h2 className="text-3xl font-heading font-black text-white mb-4">Your cart is empty</h2>
           <p className="text-slate-400 mb-8 max-w-xs mx-auto">Looks like you haven't added any premium components to your order yet.</p>
           <Link to="/" className="btn-primary flex items-center gap-2 justify-center py-4">
             <ChevronLeft className="w-5 h-5" /> Start Shopping
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h1 className="text-4xl font-heading font-black text-white mb-10 flex items-center gap-4">
        <ShoppingBag className="w-8 h-8 text-indigo-500" /> Shopping Cart
        <span className="text-sm font-bold bg-white/5 px-3 py-1 rounded-lg text-slate-500 uppercase tracking-tighter">
          {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="glass-card p-6 flex flex-col md:flex-row gap-8 items-center border-white/5 bg-white/5 group hover:border-indigo-500/30">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-white/5">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start">
                  <Link to={`/product/${item._id}`} className="text-lg font-bold text-white hover:text-indigo-400 transition-colors">
                    {item.name}
                  </Link>
                  <button 
                    onClick={() => removeFromCartHandler(item._id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{item.brand}</p>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center bg-slate-950 border border-white/5 rounded-xl overflow-hidden shadow-inner">
                    <button 
                      onClick={() => dispatch(addToCart({ ...item, qty: Math.max(1, item.qty - 1) }))}
                      className="px-3 py-1.5 hover:bg-white/5 text-white font-black"
                    ><Minus className="w-4 h-4" /></button>
                    <span className="px-5 text-indigo-400 font-black text-sm">{item.qty}</span>
                    <button 
                      onClick={() => dispatch(addToCart({ ...item, qty: Math.min(item.countInStock || 10, item.qty + 1) }))}
                      className="px-3 py-1.5 hover:bg-white/5 text-white font-black"
                    ><Plus className="w-4 h-4" /></button>
                  </div>
                  <span className="text-xl font-heading font-black text-white">
                    ${(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card sticky top-28 border-indigo-500/20 bg-indigo-500/5 backdrop-blur-2xl p-8 space-y-6">
            <h2 className="text-2xl font-heading font-black text-white">Order Summary</h2>
            
            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Subtotal</span>
                <span className="text-white">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Shipping</span>
                <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-widest">Free Express</span>
              </div>
              <div className="h-px bg-white/10 my-4"></div>
              <div className="flex justify-between items-baseline">
                <span className="text-white font-bold">Total Amount</span>
                <span className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()}
                </span>
              </div>
            </div>

            <button 
              onClick={checkoutHandler}
              className="btn-primary w-full py-5 flex items-center justify-center gap-3 mt-4"
            >
              Secure Checkout <ArrowRight className="w-5 h-5" />
            </button>

            <div className="pt-6 flex items-center justify-center gap-4 text-slate-500">
              <div className="bg-white/5 px-3 py-1 rounded text-[10px] font-black tracking-widest border border-white/5 uppercase">Stripe Secure</div>
              <div className="bg-white/5 px-3 py-1 rounded text-[10px] font-black tracking-widest border border-white/5 uppercase">Global Track</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
