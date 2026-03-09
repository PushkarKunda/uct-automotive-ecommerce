import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ArrowRight, Package, AlertCircle } from 'lucide-react';

const CheckoutScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = subtotal > 500 ? 0 : 45;
  const taxPrice = Number((0.15 * subtotal).toFixed(2));
  const totalPrice = (subtotal + shippingPrice + taxPrice).toFixed(2);

  const placeOrderHandler = () => {
    // Logic for placing order would go here
    alert('Processing Industrial Order...');
  };

  return (
    <div className="pb-20">
      <div className="flex justify-between items-end mb-12 border-b-4 border-slate-900 pb-6">
        <h1 className="text-4xl font-black uppercase text-slate-900">Checkout Portal</h1>
        <div className="label-industrial text-lg italic text-safety-orange">Phase 02: Logistics & Payment</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-12">
          
          <div className="swiss-card space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
               <Truck className="w-6 h-6 text-slate-900" />
               <h2 className="text-xl font-black uppercase text-slate-900">Logistics Destination</h2>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-1">
                <label className="label-industrial">Company / Site Address</label>
                <input 
                  type="text" 
                  className="input-industrial" 
                  placeholder="Street address, Suite, etc."
                  value={shippingData.address}
                  onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="label-industrial">City / Logistics Hub</label>
                <input 
                  type="text" 
                  className="input-industrial" 
                  placeholder="London"
                  value={shippingData.city}
                  onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="label-industrial">Postal Code</label>
                <input 
                  type="text" 
                  className="input-industrial" 
                  placeholder="EX1 1XX"
                  value={shippingData.postalCode}
                  onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                />
              </div>
            </form>
          </div>

          <div className="swiss-card space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
               <CreditCard className="w-6 h-6 text-slate-900" />
               <h2 className="text-xl font-black uppercase text-slate-900">Payment Authorization</h2>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-2 text-white">
                     <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] font-black uppercase text-slate-900">Encrypted Credit/Debit Card</div>
               </div>
               <div className="label-industrial text-safety-orange italic">Default</div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               Payment is processed via an industrial-grade secure gateway. Your financial data is never stored on our servers.
            </p>
          </div>

          <div className="swiss-card space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
               <Package className="w-6 h-6 text-slate-900" />
               <h2 className="text-xl font-black uppercase text-slate-900">Component Verification</h2>
            </div>
            <div className="divide-y divide-slate-100">
               {cartItems.map((item) => (
                 <div key={item._id} className="py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black bg-slate-100 px-2 py-1 text-slate-900">{item.qty}X</span>
                       <span className="text-sm font-bold text-slate-900 uppercase italic">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">${(item.price * item.qty).toLocaleString()}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-950 p-10 text-white space-y-8 sticky top-32 shadow-[20px_20px_0px_0px_rgba(255,100,0,0.05)]">
             <h2 className="text-2xl font-black uppercase italic border-b border-white/10 pb-4">Final Statement</h2>
             
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   <span>Components Subtotal</span>
                   <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   <span>Logistics Handling</span>
                   <span className="text-white">${shippingPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   <span>Statutory Tax (15%)</span>
                   <span className="text-white">${taxPrice.toLocaleString()}</span>
                </div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between items-baseline">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-safety-orange tracking-[0.2em]">Total Due</span>
                      <span className="text-xs text-slate-500 font-bold uppercase italic">Inc. VAT</span>
                   </div>
                   <span className="text-5xl font-black tracking-tighter text-white">${totalPrice}</span>
                </div>
             </div>

             <button 
              onClick={placeOrderHandler}
              className="btn-orange w-full py-6 text-sm flex items-center justify-center gap-3"
             >
                Authorize & Dispatch Component <ArrowRight className="w-5 h-5" />
             </button>

             <div className="pt-6 flex items-center gap-3 text-slate-500">
                <ShieldCheck className="w-5 h-5 text-safety-orange" />
                <span className="text-[8px] font-black uppercase tracking-widest leading-tight">
                   Industrial Grade 256-bit Encryption<br/>Active & Verified
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
