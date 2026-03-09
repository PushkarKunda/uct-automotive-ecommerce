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
    navigate('/login?redirect=/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <div className="swiss-card max-w-lg w-full text-center space-y-8 p-16 border-2 border-slate-900 shadow-[10px_10px_0px_0px_rgba(226,232,240,1)]">
           <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto" />
           <h2 className="text-4xl font-black text-slate-900 uppercase italic">Empty Inventory</h2>
           <p className="text-slate-500 font-medium tracking-tight">Your technical selection is empty. Please return to the catalog to choose components.</p>
           <Link to="/" className="btn-オレンジ flex items-center gap-2 justify-center py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-xs transition-colors">
             <ChevronLeft className="w-4 h-4" /> Browse Catalog
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="flex justify-between items-end mb-12 border-b-4 border-slate-900 pb-6">
        <h1 className="text-4xl font-black uppercase text-slate-900">Your Selection</h1>
        <div className="label-industrial text-lg">{cartItems.length} COMPONENTS</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="border border-slate-200 divide-y divide-slate-200">
            {cartItems.map((item) => (
              <div key={item._id} className="p-8 flex flex-col md:flex-row gap-8 items-center bg-white group hover:bg-slate-50 transition-colors">
                <div className="w-32 h-32 flex-shrink-0 bg-white border border-slate-100 p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                
                <div className="grow space-y-2 text-center md:text-left">
                  <div className="label-industrial">{item.brand}</div>
                  <Link to={`/product/${item._id}`} className="text-xl font-black text-slate-900 hover:text-safety-orange transition-colors uppercase">
                    {item.name}
                  </Link>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">PartID: {item._id?.substring(0, 10).toUpperCase()}</p>
                </div>

                <div className="flex items-center border border-slate-300">
                  <button 
                    onClick={() => dispatch(addToCart({ ...item, qty: Math.max(1, item.qty - 1) }))}
                    className="px-4 py-2 hover:bg-slate-200 transition-colors font-black text-slate-900"
                  ><Minus className="w-4 h-4" /></button>
                  <span className="px-6 text-slate-900 font-black text-sm">{item.qty}</span>
                  <button 
                    onClick={() => dispatch(addToCart({ ...item, qty: Math.min(item.countInStock || 10, item.qty + 1) }))}
                    className="px-4 py-2 hover:bg-slate-200 transition-colors font-black text-slate-900"
                  ><Plus className="w-4 h-4" /></button>
                </div>

                <div className="text-xl font-black text-slate-900 min-w-[120px] text-right">
                  ${(item.price * item.qty).toLocaleString()}
                </div>

                <button 
                  onClick={() => removeFromCartHandler(item._id)}
                  className="p-3 text-slate-300 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-100 p-10 space-y-8 sticky top-32 border border-slate-200 shadow-[15px_15px_0px_0px_rgba(255,95,31,0.1)]">
            <h2 className="text-2xl font-black uppercase text-slate-900 italic border-b-2 border-slate-900 pb-4">Quote Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                <span>Standard Logistics</span>
                <span className="text-slate-900 font-black">Calculated at Checkout</span>
              </div>
              <div className="h-px bg-slate-200 my-4"></div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-900 font-black uppercase text-[10px]">Estimated Total</span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()}
                </span>
              </div>
            </div>

            <button 
              onClick={checkoutHandler}
              className="btn-orange w-full py-6 text-sm"
            >
              Initialize Checkout <ArrowRight className="w-5 h-5" />
            </button>

            <div className="pt-6 grid grid-cols-2 gap-4 text-center">
               <div className="p-3 bg-white border border-slate-200 label-industrial text-[8px]">Secure SSL</div>
               <div className="p-3 bg-white border border-slate-200 label-industrial text-[8px]">Global Export</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
