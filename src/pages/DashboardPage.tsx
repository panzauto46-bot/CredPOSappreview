import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { transactionStorage } from '../utils/storage';
import { 
  Store, 
  ShoppingCart, 
  Package, 
  History, 
  CreditCard, 
  TrendingUp, 
  LogOut,
  ChevronRight,
  Wallet,
  BarChart3
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [todayTotal, setTodayTotal] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const total = await transactionStorage.getTodayTotal();
      const transactions = await transactionStorage.getTodayTransactions();
      setTodayTotal(total);
      setTodayCount(transactions.length);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const menuItems = [
    {
      id: 'cashier',
      icon: ShoppingCart,
      label: 'Kasir (POS)',
      description: 'Mulai transaksi baru',
      color: 'bg-[#2C7DF7]',
      shadowColor: 'shadow-blue-500/30',
      route: '/cashier',
    },
    {
      id: 'products',
      icon: Package,
      label: 'Tambah Barang',
      description: 'Kelola produk',
      color: 'bg-[#10B981]',
      shadowColor: 'shadow-green-500/30',
      route: '/products',
    },
    {
      id: 'history',
      icon: History,
      label: 'Riwayat',
      description: 'Lihat transaksi',
      color: 'bg-purple-500',
      shadowColor: 'shadow-purple-500/30',
      route: '/history',
    },
    {
      id: 'settlement',
      icon: CreditCard,
      label: 'Settlement',
      description: 'Rekap harian',
      color: 'bg-orange-500',
      shadowColor: 'shadow-orange-500/30',
      route: '/settlement',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0F172A] pt-12 pb-24 px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2C7DF7] to-[#1E5FC7] rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">{user?.businessName || 'CredPOS'}</h1>
              <p className="text-gray-400 text-sm">{user?.ownerName}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2.5 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Today Stats Card */}
        <div className="bg-gradient-to-br from-[#2C7DF7] to-[#1E5FC7] rounded-2xl p-5 shadow-xl shadow-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-white/80" />
              <span className="text-white/80 text-sm font-medium">Omzet Hari Ini</span>
            </div>
            <div className="bg-white/20 px-2.5 py-1 rounded-full">
              <span className="text-xs text-white font-medium">Live</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="h-10 bg-white/20 rounded-lg animate-pulse"></div>
          ) : (
            <h2 className="text-3xl font-bold text-white mb-1">
              {formatCurrency(todayTotal)}
            </h2>
          )}
          
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Transaksi</p>
                <p className="text-white font-semibold">{todayCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Rata-rata</p>
                <p className="text-white font-semibold">
                  {todayCount > 0 ? formatCurrency(todayTotal / todayCount) : 'Rp 0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-6 -mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h3 className="text-[#0F172A] font-semibold mb-4 px-1">Menu Utama</h3>
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-left transition-all group"
              >
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-3 shadow-lg ${item.shadowColor}`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#0F172A] mb-0.5">{item.label}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mt-4 mb-6">
          <h3 className="text-[#0F172A] font-semibold mb-3 px-1">Aksi Cepat</h3>
          
          <button
            onClick={() => navigate('/cashier')}
            className="w-full flex items-center justify-between bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl p-4 shadow-lg shadow-green-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-white">Mulai Kasir</h4>
                <p className="text-xs text-white/80">Transaksi cepat & mudah</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Credit Score Banner */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#2C7DF7] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Credit Score Ready</h4>
              <p className="text-xs text-gray-400">Blockchain Integration</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Data penjualan Anda direkap dan siap untuk penilaian kredit. Semakin konsisten, semakin tinggi skor Anda!
          </p>
          <div className="mt-4 flex gap-2">
            <div className="bg-[#10B981]/20 px-3 py-1.5 rounded-full">
              <span className="text-xs text-[#10B981] font-medium">✓ Data Terenkripsi</span>
            </div>
            <div className="bg-[#2C7DF7]/20 px-3 py-1.5 rounded-full">
              <span className="text-xs text-[#2C7DF7] font-medium">✓ Tezos Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
