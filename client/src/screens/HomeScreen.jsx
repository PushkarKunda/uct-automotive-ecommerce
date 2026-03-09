import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { Link as RouterLink } from 'react-router-dom';
import { Search, Car, Calendar, Tool, AlertCircle, ShoppingCart, ChevronRight } from 'lucide-react';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    dispatch(fetchProducts(''));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParts = [];
    if (make) queryParts.push(`make=${make}`);
    if (model) queryParts.push(`model=${model}`);
    if (year) queryParts.push(`year=${year}`);
    
    const queryString = queryParts.length > 0 ? `&${queryParts.join('&')}` : '';
    dispatch(fetchProducts(queryString));
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl py-20 px-8 text-center bg-slate-900 border border-white/5 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15),transparent_70%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-indigo-500/20">
             UCT Internship Automotive Pro
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white leading-tight">
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Perfect Fit</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Precision-engineered parts tracked by vehicle compatibility. No more guesswork, just performance.
          </p>

          {/* Fitment Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="mt-10 glass-card p-4 flex flex-col md:flex-row gap-4 items-center border-white/10 bg-white/5 backdrop-blur-2xl"
          >
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Make (e.g. BMW)"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none text-sm font-medium"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                />
              </div>
              <div className="relative">
                <Tool className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Model (e.g. M3)"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none text-sm font-medium"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <input
                  type="number"
                  placeholder="Year"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none text-sm font-medium"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full md:w-auto h-full px-8 py-3.5 flex items-center justify-center gap-2 group">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {status === 'loading' && (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}

      {status === 'failed' && (
        <div className="glass-card border-red-500/20 bg-red-500/5 flex items-center gap-4 text-red-400 mx-auto max-w-md">
          <AlertCircle className="w-6 h-6" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Product Grid */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white tracking-tight">Top Components</h2>
            <div className="h-1 w-20 bg-indigo-600 mt-2 rounded-full"></div>
          </div>
          <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group transition-colors">
            All Inventory <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <RouterLink 
              to={`/product/${product._id}`} 
              key={product._id}
              className="glass-card p-0 group flex flex-col overflow-hidden border-white/5 hover:border-indigo-500/40 bg-white/5 backdrop-blur-xl"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-white/5">
                <img
                  src={product.image || 'https://via.placeholder.com/400x300?text=Auto+Part'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-indigo-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest backdrop-blur-md">
                  {product.brand}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug mb-3">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-grow font-medium leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Price</span>
                    <span className="text-2xl font-heading font-black text-white">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl text-white shadow-lg shadow-indigo-600/20 active:scale-90 transition-all">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </RouterLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
