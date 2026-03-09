import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice';
import { ArrowLeft, ShoppingCart, Check, X } from 'lucide-react';

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
    dispatch(addToCart({ ...product, product: product._id, qty }));
    navigate('/cart');
  };

  if (loading) return <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div></div>;
  if (error) return <div className="text-center py-20 text-red-600 font-bold">Error loading product data.</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-8 transition">
        <ArrowLeft className="w-4 h-4" /> Go Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <img 
            src={product.image || 'https://via.placeholder.com/600x400?text=Auto+Part'} 
            alt={product.name} 
            className="w-full h-auto rounded-lg shadow-md border border-gray-100" 
          />
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-6 border-b pb-6">Brand: <span className="font-semibold text-gray-800">{product.brand}</span></p>
          
          <h3 className="font-bold text-lg mb-2">Description:</h3>
          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          
          <h3 className="font-bold text-lg mb-2 mt-auto">Compatible Vehicles:</h3>
          <ul className="text-sm text-gray-600 bg-gray-50 p-4 rounded border border-gray-200">
            {product.compatibleVehicles && product.compatibleVehicles.length > 0 ? (
              product.compatibleVehicles.map((v, i) => (
                <li key={i} className="mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  {v.year} {v.make} {v.model}
                </li>
              ))
            ) : (
               <li className="flex items-center gap-2">
                 <X className="w-4 h-4 text-gray-400" /> Universal Fitment
               </li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <span className="text-gray-600">Price:</span>
              <span className="text-2xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <span className="text-gray-600">Status:</span>
              <span className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <span className="text-gray-600">Qty:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 text-center"
                >
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}

            <button 
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`w-full flex justify-center items-center gap-2 py-3 mt-2 rounded font-bold transition ${
                product.countInStock === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
