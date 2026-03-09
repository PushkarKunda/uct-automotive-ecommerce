import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice';
import { ArrowLeft, ShoppingCart, Check, X, Shield, Truck, Package, ChevronRight } from 'lucide-react';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch {
        setError(true);
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
    <div className="flex justify-center py-40">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto py-20 text-center">
      <div className="glass-card border-red-500/20 bg-red-500/5 p-10">
        <X className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <Link to="/" className="text-indigo-400 hover:underline font-bold">Back to Inventory</Link>
      </div>
    </div>
  );

  return (
    <div className="pb-20">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 font-bold text-sm tracking-wide">
        <ArrowLeft className="w-4 h-4" /> BACK TO INVENTORY
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Product Image */}
        <div className="relative">
          <div className="glass-card p-0 overflow-hidden border-white/10 bg-white/5 backdrop-blur-2xl">
            <img
              src={product.image || 'https://via.placeholder.com/600x600?text=Auto+Part'}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-indigo-400 uppercase">
             {product.brand}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-black tracking-[0.2em] uppercase">
              <span className="w-8 h-[2px] bg-indigo-600"></span>
               In Stock & Ready to Ship
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-slate-400 font-medium leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl md:text-5xl font-heading font-black text-white">
              ${product.price}
            </span>
            <span className="text-slate-500 font-medium line-through decoration-indigo-500/50">
              ${(product.price * 1.25).toFixed(2)}
            </span>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-slate-200 font-bold tracking-tight">Quantity</div>
              <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-inner">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 hover:bg-white/5 transition-colors font-black text-white"
                >-</button>
                <div className="px-6 py-2 font-black text-indigo-400 border-x border-white/10 min-w-[60px] text-center">
                  {qty}
                </div>
                <button 
                  onClick={() => setQty(Math.min(product.countInStock || 10, qty + 1))}
                  className="px-4 py-2 hover:bg-white/5 transition-colors font-black text-white"
                >+</button>
              </div>
            </div>

            <button 
              onClick={addToCartHandler}
              className="btn-primary w-full py-5 flex items-center justify-center gap-4 group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="text-lg">Add to Shopping Cart</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4 flex items-center gap-4 border-white/5 bg-white/5">
              <div className="bg-indigo-500/10 p-2.5 rounded-lg text-indigo-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Fast Shipping</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Next day delivery</div>
              </div>
            </div>
            <div className="glass-card p-4 flex items-center gap-4 border-white/5 bg-white/5">
              <div className="bg-cyan-500/10 p-2.5 rounded-lg text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Fitment Warranty</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Guaranteed compatible</div>
              </div>
            </div>
          </div>

          <div className="glass-card border-indigo-500/20 bg-indigo-500/5">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-400" />
              Compatible Vehicles
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.compatibleVehicles?.map((v, i) => (
                <span key={i} className="px-3 py-1 bg-slate-950/50 border border-white/5 rounded-lg text-xs font-bold text-slate-300">
                  {v.year} {v.make} {v.model}
                </span>
              ))}
              {!product.compatibleVehicles?.length && (
                <span className="text-slate-500 text-sm font-medium italic">General hardware / Universal fitment</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
