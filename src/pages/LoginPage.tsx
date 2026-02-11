import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Store, Mail, Lock, Loader2, Zap, Shield, TrendingUp } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsDemoLoading(true);
    
    try {
      await demoLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo login gagal');
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#2C7DF7] to-[#1E5FC7] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
          <Store className="w-10 h-10 text-white" />
        </div>
        
        {/* Brand */}
        <h1 className="text-3xl font-bold text-white mb-2">CredPOS</h1>
        <p className="text-gray-400 text-center mb-8">Smart Kasir untuk UMKM Indonesia</p>

        {/* Features Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <div className="flex items-center gap-1.5 bg-[#1E293B] px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-[#2C7DF7]" />
            <span className="text-xs text-gray-300">Cepat</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1E293B] px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs text-gray-300">Aman</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1E293B] px-3 py-1.5 rounded-full">
            <TrendingUp className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-xs text-gray-300">Credit Score Ready</span>
          </div>
        </div>
      </div>

      {/* Login Form Card */}
      <div className="bg-white rounded-t-[32px] px-6 py-8 shadow-xl">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6 text-center">Masuk ke Akun</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@usaha.com"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C7DF7] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C7DF7] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2C7DF7] text-white font-semibold py-4 rounded-xl hover:bg-[#1E6CE0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Demo Button */}
        <button
          onClick={handleDemoLogin}
          disabled={isDemoLoading}
          className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
        >
          {isDemoLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Menyiapkan Demo...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Coba Demo Gratis</span>
            </>
          )}
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">
          Langsung coba tanpa registrasi dengan data contoh
        </p>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="text-[#2C7DF7] font-semibold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};
