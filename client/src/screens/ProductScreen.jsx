import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, Package, Info, Search, Maximize2, CheckCircle2 } from 'lucide-react';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);

  // High-fidelity gallery assets for performance parts
  const gallery = [
     '/images/bp_front.png',
     '/images/bp_side.png',
     '/images/bp_detail.png',
     '/images/bp_kit.png'
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (loading) return (
    <div className="flex items-center gap-4 py-60 justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
       <div className="w-4 h-4 border-2 border-slate-200 border-t-safety-orange animate-spin"></div>
       Loading Technical Profile...
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-32">
      {/* Breadcrumbs */}
      <nav className="py-8 flex items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-[10px] tracking-widest uppercase">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Catalog / Components
        </Link>
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Part #: {product._id?.substring(0, 12).toUpperCase()}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Interactive Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           <div className="relative aspect-square bg-slate-50 border border-slate-100 overflow-hidden cursor-zoom-in group">
              <img 
                src={gallery[activeImg]} 
                alt={product.name} 
                className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ${zoom ? 'scale-150' : 'scale-100'}`}
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
              />
              <div className="absolute top-6 right-6 p-3 bg-white border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                 <Maximize2 className="w-4 h-4 text-slate-400" />
              </div>
           </div>

           <div className="grid grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square border-2 transition-all p-2 bg-white ${activeImg === i ? 'border-safety-orange' : 'border-slate-100 hover:border-slate-300'}`}
                >
                   <img src={img} alt="detail" className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
           </div>
        </div>

        {/* Right: Essential Data */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
             <div className="flex items-center gap-3">
                <span className="bg-safety-orange text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">Performance Tier</span>
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] uppercase tracking-wider">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   In Stock
                </div>
             </div>

             <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter uppercase italic">
                {product.name}
             </h1>

             <div className="flex items-center gap-4">
                <div className="bg-slate-900 text-white font-black px-4 py-2 uppercase italic text-xs tracking-widest">
                   {product.brand}
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                   <CheckCircle2 className="w-4 h-4" />
                   Guaranteed Fit
                </div>
             </div>
          </div>

          <div className="flex items-baseline gap-6 border-y border-slate-100 py-10">
            <span className="text-6xl font-black text-slate-900 tracking-tighter">
              ${product.price?.toLocaleString()}
            </span>
            <span className="text-slate-400 font-bold line-through text-sm">
              MSRP: ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className="label-industrial">Order Qty</span>
              <div className="flex items-center border-2 border-slate-900">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-6 py-4 font-black text-xl hover:bg-slate-100">-</button>
                <div className="px-10 py-4 font-black text-xl border-x-2 border-slate-900 min-w-[100px] text-center">{qty}</div>
                <button onClick={() => setQty(Math.min(10, qty + 1))} className="px-6 py-4 font-black text-xl hover:bg-slate-100">+</button>
              </div>
            </div>

            <button 
              onClick={addToCartHandler}
              className="btn-orange w-full py-8 text-sm group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Add Component to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-100 space-y-3">
                <Truck className="w-5 h-5 text-slate-900" />
                <div className="text-[10px] font-black uppercase text-slate-900">Logistic speed</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase leading-none">Global priority<br/>2-Day Dispatch</div>
             </div>
             <div className="p-6 bg-slate-50 border border-slate-100 space-y-3">
                <ShieldCheck className="w-5 h-5 text-safety-orange" />
                <div className="text-[10px] font-black uppercase text-slate-900">OEM Integrity</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase leading-none">12-Month<br/>Industrial Warranty</div>
             </div>
          </div>
        </div>
      </div>

      {/* Technical Specification Table */}
      <div className="mt-32 space-y-12">
         <div className="flex items-end gap-6 border-b-4 border-slate-900 pb-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Technical Specs</h2>
            <div className="label-industrial text-slate-400 italic mb-1 lowercase">Phase 03: Data Verification</div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
               <div className="bg-slate-50 p-10 font-medium text-slate-600 leading-relaxed italic text-lg border-l-8 border-slate-900">
                  "{product.description}"
               </div>
               
               <div className="swiss-card border-slate-900 border-2">
                  <div className="label-industrial mb-6 font-black text-slate-900 underline">Compliance Data</div>
                  <div className="grid grid-cols-2 gap-y-4">
                     <span className="text-[10px] font-bold text-slate-400 uppercase">ISO Category</span>
                     <span className="text-xs font-black text-slate-900 uppercase">Automotive / CAT-A</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Production Origin</span>
                     <span className="text-xs font-black text-slate-900 uppercase">Industrial Germany</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Material Grade</span>
                     <span className="text-xs font-black text-safety-orange uppercase">Ceramic / Grade 9</span>
                  </div>
               </div>
            </div>

            <div className="overflow-hidden border border-slate-200">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900 text-white">
                     <tr>
                        <th className="p-4 label-industrial text-white mb-0 border-r border-white/10 uppercase">Parameter</th>
                        <th className="p-4 label-industrial text-white mb-0 uppercase">Verified Value</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 text-[10px] font-black uppercase text-slate-400 border-r border-slate-100">Construction material</td>
                        <td className="p-5 text-sm font-mono font-black text-slate-900">CERAMIC_COMPOSITE_V4</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 text-[10px] font-black uppercase text-slate-400 border-r border-slate-100">Unit base width</td>
                        <td className="p-5 text-sm font-mono font-black text-slate-900">154.5 MM</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 text-[10px] font-black uppercase text-slate-400 border-r border-slate-100">Height profile</td>
                        <td className="p-5 text-sm font-mono font-black text-slate-900">62.8 MM</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 text-[10px] font-black uppercase text-slate-400 border-r border-slate-100">Total dry weight</td>
                        <td className="p-5 text-sm font-mono font-black text-slate-900">2.450 KG</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 text-[10px] font-black uppercase text-slate-400 border-r border-slate-100">Friction Coeff</td>
                        <td className="p-5 text-sm font-mono font-black text-slate-900">0.48 MU</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProductScreen;
