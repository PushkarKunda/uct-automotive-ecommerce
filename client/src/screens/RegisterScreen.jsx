import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../slices/userSlice';
import { User, Mail, Lock, UserPlus, AlertCircle, ChevronRight } from 'lucide-react';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const { userInfo, status, error } = user;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="glass-card p-10 border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="bg-cyan-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-cyan-400 border border-cyan-500/20">
            <UserPlus className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-heading font-black text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 font-medium">Join the professional parts network</p>
        </div>
        
        {(message || error) && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {message || error}
          </div>
        )}
        
        <form onSubmit={submitHandler} className="space-y-5">
          <div className="space-y-2">
            <label className="text-slate-400 text-xs font-black uppercase tracking-widest pl-1" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="name"
                type="text"
                placeholder="YOUR NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-12 border-white/5 bg-slate-950/40 text-sm font-medium uppercase tracking-wider"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 text-xs font-black uppercase tracking-widest pl-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="email"
                type="email"
                placeholder="PRO@AUTOPARTS.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-12 border-white/5 bg-slate-950/40 text-sm font-medium uppercase tracking-wider"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 text-xs font-black uppercase tracking-widest pl-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-12 border-white/5 bg-slate-950/40"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 text-xs font-black uppercase tracking-widest pl-1" htmlFor="confirmPassword">
              Verify Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field pl-12 border-white/5 bg-slate-950/40"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-4 mt-4 flex items-center justify-center gap-2 text-md transition-all group from-indigo-600 to-indigo-700 bg-gradient-to-br"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Initialize Account <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-6 text-center border-t border-white/5">
          <p className="text-slate-500 text-sm font-bold">
            ALREADY PART OF THE NETWORK?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-cyan-400 hover:text-cyan-300 ml-2 transition-colors">
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
