import { Link } from 'react-router-dom';
import { ShoppingCart, User, Wrench, LogOut, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 p-2 rounded-none transition-transform duration-200 group-hover:bg-safety-orange">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              UCT<span className="text-safety-orange">PARTS</span>
            </span>
          </Link>

          <div className="flex gap-10 items-center">
            <div className="hidden lg:flex items-center border-b-2 border-slate-100 focus-within:border-safety-orange transition-colors py-1 px-1">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="PART NUMBER OR KEYWORD" 
                className="bg-transparent border-none focus:ring-0 text-[10px] font-black tracking-[0.15em] w-48 text-slate-900 placeholder:text-slate-400 outline-none uppercase"
              />
            </div>

            <Link to="/cart" className="relative group transition-colors flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-slate-900 group-hover:text-safety-orange transition-colors" />
              <div className="hidden md:block">
                <div className="label-industrial leading-none">Your Cart</div>
                <div className="text-[10px] font-black text-slate-900 leading-none">
                  {cartItems.length} ITEMS
                </div>
              </div>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-safety-orange text-[8px] font-black px-1 py-0.5 min-w-[16px] text-center text-white">
                   {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            
            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

            {userInfo ? (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <div className="label-industrial leading-none">Account</div>
                  <span className="text-[10px] font-black text-slate-900 uppercase">
                    {userInfo.name.split(' ')[0]}
                  </span>
                </div>
                <button 
                  onClick={logoutHandler}
                  className="p-2 border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-900 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-orange text-[10px] py-3 px-6 h-fit">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
