import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </main>
      <footer className="bg-white border-t border-slate-200 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-black text-slate-900 tracking-tighter">
              UCT<span className="text-safety-orange">PARTS</span>
            </div>
            
            <div className="flex gap-12">
               <div className="space-y-4">
                  <div className="label-industrial">Legal</div>
                  <div className="flex flex-col gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                     <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                     <a href="#" className="hover:text-slate-900 transition-colors">Privacy Protocol</a>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="label-industrial">Support</div>
                  <div className="flex flex-col gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                     <a href="#" className="hover:text-slate-900 transition-colors">Technical Docs</a>
                     <a href="#" className="hover:text-slate-900 transition-colors">Order Tracking</a>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} UCT AUTOMOTIVE E-COMMERCE. INDUSTRIAL DIVISION.
            </p>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-safety-orange rounded-none"></div>
               <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Authorized Site</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
