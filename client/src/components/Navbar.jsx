import { Link } from 'react-router-dom';
import { ShoppingCart, User, Wrench, LogOut, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="sticky top-0 z-50 px-4 py-4">
      <div className="container mx-auto">
        <div className="glass-card flex justify-between items-center py-4 px-8 border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-extrabold tracking-tighter text-white">
              AUTOPARTS<span className="text-indigo-500">PRO</span>
            </span>
          </Link>

          <div className="flex gap-8 items-center">
            <div className="hidden md:flex items-center bg-slate-900/40 border border-white/5 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search parts..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-48 text-slate-200"
              />
            </div>

            <Link to="/cart" className="relative group transition-colors">
              <ShoppingCart className="w-6 h-6 text-slate-300 group-hover:text-indigo-400" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-950">
                0
              </span>
            </Link>
            
            {userInfo ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-xs shadow-inner">
                    {userInfo.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-200 hidden lg:block">
                    {userInfo.name}
                  </span>
                </div>
                <button 
                  onClick={logoutHandler}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-6 text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
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
