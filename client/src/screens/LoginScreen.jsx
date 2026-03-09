import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction } from '../slices/userSlice';
import { User, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, status, error } = useSelector((state) => state.user);
  const isLoading = status === 'loading';

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white border-2 border-slate-900 shadow-[20px_20px_0px_0px_rgba(15,23,42,0.05)]">
        
        {/* Left: Branding/Info */}
        <div className="bg-slate-950 p-12 text-white flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10 space-y-6">
             <div className="label-industrial text-safety-orange tracking-[0.3em]">Access Portal</div>
             <h2 className="text-5xl font-black uppercase leading-[0.9] italic">Industrial<br/>Grade<br/>Support</h2>
             <p className="text-slate-400 text-sm font-medium tracking-tight max-w-xs">
                Log in to access your professional account, track shipments, and manage industrial component orders.
             </p>
          </div>
          
          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-safety-orange" />
                Secure Data Port
             </div>
             <div className="h-px bg-white/10 w-full"></div>
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                &copy; 2024 UCT INTERNSHIP PROJECT - ALL RIGHTS RESERVED
             </p>
          </div>

          {/* Abstract Geometry */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 border-4 border-white/5 rotate-12"></div>
          <div className="absolute top-1/2 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right: Form */}
        <div className="p-12 md:p-16 space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-black uppercase text-slate-900">User Login</h1>
            <div className="h-1.5 w-12 bg-safety-orange"></div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-xs font-black uppercase text-red-600 tracking-tight">Access Denied: Invalid Credentials</span>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-1">
              <label className="label-industrial">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  className="input-industrial pl-12"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="label-industrial">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  className="input-industrial pl-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-orange w-full py-5 text-sm group"
            >
              {isLoading ? 'Authenticating...' : 'Authorize Login'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="pt-8 border-t border-slate-100 flex justify-between items-baseline">
             <div className="label-industrial lowercase text-slate-400 italic">No account profile?</div>
             <Link 
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-safety-orange transition-colors"
             >
               Initialize Registration
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
