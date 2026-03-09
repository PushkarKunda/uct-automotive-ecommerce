import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);
  
  // Fitment search state
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
    <div>
      {/* Fitment Search Box */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100 mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Find Parts For Your Vehicle</h2>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Make (e.g., Toyota)"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Model (e.g., Camry)"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Year (e.g., 2020)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition"
          >
            Search
          </button>
          <button 
            type="button"
            onClick={() => { setMake(''); setModel(''); setYear(''); dispatch(fetchProducts('')); }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded transition"
          >
            Clear
          </button>
        </form>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Featured Products</h1>
      
      {status === 'loading' && <div className="text-center py-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div></div>}
      {status === 'failed' && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">{error}</div>}
      
      {status === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">No products found matching your vehicle.</div>
          ) : (
            products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col hover:shadow-lg transition">
                <img src={product.image || 'https://via.placeholder.com/300x200?text=Auto+Part'} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                  <Link to={`/product/${product._id}`}>
                    <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600 mb-2 line-clamp-2">{product.name}</h2>
                  </Link>
                  <div className="mt-auto flex justify-between items-center pt-4">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
