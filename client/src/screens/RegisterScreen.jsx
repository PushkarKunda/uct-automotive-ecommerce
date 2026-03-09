import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerAction } from '../slices/userSlice';
import { User, Mail, Lock, Key, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);

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
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    setLocalError(null);
    dispatch(registerAction({ name, email, password }));
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white border-2 border-slate-900 shadow-[20px_20px_0px_0px_rgba(255,95,31,0.05)]">
        
        {/* Left Content */}
        <div className="bg-slate-950 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-8">
             <div className="label-industrial text-safety-orange tracking-[0.3em]">Corporate Registration</div>
             <h2 className="text-6xl font-black uppercase leading-[0.8] tracking-tighter italic">Create<br/>Expert<br/>Profile</h2>
             <div className="h-1 w-20 bg-safety-orange"></div>
             <p className="text-slate-400 text-sm font-medium tracking-tight max-w-xs">
                Unlock industrial-tier pricing, fleet management tools, and priority logistics support with a professional account.
             </p>
          </div>

          <div className="relative z-10 pt-10">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <ShieldCheck className="w-6 h-6 text-safety-orange" />
                   <div className="text-[10px] font-black uppercase tracking-widest leading-tight">Data Integrity<br/>Guaranteed</div>
                </div>
                <div className="space-y-2">
                   <Key className="w-6 h-6 text-safety-orange" />
                   <div className="text-[10px] font-black uppercase tracking-widest leading-tight">Instant Account<br/>Authorization</div>
                </div>
             </div>
          </div>

          {/* Visual Elements */}
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
             <div className="grid grid-cols-6 h-full border-l border-white/20">
                {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white/20"></div>)}
             </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-12 md:p-16 space-y-10">
           <div className="space-y-1">
             <h1 className="text-3xl font-black uppercase text-slate-900">Initialize Profile</h1>
             <p className="label-industrial lowercase text-slate-400 italic">Phase 01: Account Setup</p>
           </div>

           {(error || localError) && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-xs font-black uppercase text-red-600 tracking-tight">
                {localError || error || 'Registration Fault Detected'}
              </span>
            </div>
          )}

           <form onSubmit={submitHandler} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="label-industrial">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      className="input-industrial pl-12"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="label-industrial">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      className="input-industrial pl-12"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="label-industrial">Define Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    className="input-industrial pl-12"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 pb-4">
                <label className="label-industrial">Verify Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    className="input-industrial pl-12"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-orange w-full py-5 text-sm group"
              >
                {isLoading ? 'Processing...' : 'Complete Registration'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </form>

           <div className="pt-8 border-t border-slate-100 flex justify-between items-baseline">
             <div className="label-industrial lowercase text-slate-400 italic">Existing corporate member?</div>
             <Link 
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-safety-orange transition-colors"
             >
               Return to Login
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
