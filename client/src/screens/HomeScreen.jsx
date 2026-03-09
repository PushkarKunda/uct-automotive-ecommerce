import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { ShoppingCart, Search, Car, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  const [selection, setSelection] = useState({
    year: '',
    make: '',
    model: '',
    engine: ''
  });

  useEffect(() => {
    dispatch(fetchProducts(''));
  }, [dispatch]);

  const handleFitmentSearch = (e) => {
    e.preventDefault();
    const query = Object.entries(selection)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    dispatch(fetchProducts(query ? `&${query}` : ''));
  };

  const categories = [
    { name: 'Brake Pads', image: '/images/brake_pads.png' },
    { name: 'Batteries', image: '/images/battery.png' },
    { name: 'Oil Filters', image: '/images/oil_filter.png' },
    { name: 'Spark Plugs', image: '/images/spark_plugs.png' }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Vehicle Selector Hero */}
      <section className="bg-slate-100 border-b border-slate-200 -mx-4 px-4 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-black text-slate-900 leading-[0.9] uppercase">
                Expert Parts<br/><span className="text-safety-orange">Precision Fit</span>
              </h1>
              <p className="text-slate-500 font-medium max-w-sm tracking-tight border-l-4 border-safety-orange pl-4">
                Enter your vehicle details below to guarantee 100% compatibility with our industrial-grade components.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-900 p-8 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
              <div className="label-industrial mb-6">Vehicle Selector</div>
              <form onSubmit={handleFitmentSearch} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-900 uppercase">Year</label>
                    <select 
                      className="select-industrial"
                      value={selection.year}
                      onChange={(e) => setSelection({...selection, year: e.target.value})}
                    >
                      <option value="">SELECT YEAR</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-900 uppercase">Make</label>
                    <select 
                      className="select-industrial"
                      value={selection.make}
                      onChange={(e) => setSelection({...selection, make: e.target.value})}
                    >
                      <option value="">SELECT MAKE</option>
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                      <option value="Mercedes">Mercedes</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-900 uppercase">Model</label>
                    <select 
                      className="select-industrial"
                      value={selection.model}
                      onChange={(e) => setSelection({...selection, model: e.target.value})}
                    >
                      <option value="">SELECT MODEL</option>
                      <option value="M3">M3</option>
                      <option value="A4">A4</option>
                      <option value="C-Class">C-Class</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-900 uppercase">Engine</label>
                    <select 
                      className="select-industrial"
                      value={selection.engine}
                      onChange={(e) => setSelection({...selection, engine: e.target.value})}
                    >
                      <option value="">SELECT ENGINE</option>
                      <option value="3.0L L6">3.0L L6</option>
                      <option value="2.0L T4">2.0L T4</option>
                      <option value="4.0L V8">4.0L V8</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-orange w-full py-5">
                  Find Compatible Parts <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10 border-b-4 border-slate-900 pb-4">
          <h2 className="text-3xl font-black uppercase text-slate-900 italic">Major Categories</h2>
          <button className="label-industrial hover:text-safety-orange transition-colors flex items-center gap-2">
            Show all catalogs <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="swiss-card group cursor-pointer hover:bg-slate-50">
              <div className="aspect-square bg-slate-100 mb-6 overflow-hidden border border-slate-200">
                 <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                 />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 group-hover:text-safety-orange transition-colors">
                {cat.name}
              </h3>
              <div className="h-0.5 w-8 bg-slate-300 mt-2 group-hover:w-full group-hover:bg-safety-orange transition-all"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1">
             <div className="label-industrial">Inventory</div>
             <h2 className="text-3xl font-black uppercase text-slate-900">Featured Components</h2>
          </div>
        </div>

        {status === 'loading' ? (
          <div className="flex items-center gap-4 py-20 text-slate-400 font-bold uppercase tracking-widest text-xs">
             <div className="w-4 h-4 border-2 border-slate-200 border-t-safety-orange animate-spin"></div>
             Analyzing global inventory...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {products.map((product) => (
              <Link 
                to={`/product/${product._id}`} 
                key={product._id}
                className="bg-white p-8 group flex flex-col hover:z-10 hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/3] mb-8 relative overflow-hidden bg-slate-50 border border-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="label-industrial">{product.brand}</div>
                <h3 className="text-lg font-black text-slate-900 leading-tight mb-4 group-hover:text-safety-orange transition-colors min-h-[3.5rem]">
                  {product.name}
                </h3>
                <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-100">
                  <span className="text-xl font-black text-slate-900">
                    ${product.price.toLocaleString()}
                  </span>
                  <div className="label-industrial text-[8px] border border-slate-200 px-2 py-1">
                    In Stock
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
