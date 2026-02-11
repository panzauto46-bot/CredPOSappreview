import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productStorage, transactionStorage } from '../utils/storage';
import { Product } from '../types';
import { 
  ArrowLeft, 
  Package, 
  Loader2, 
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  X,
  CreditCard,
  Wallet,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

export const CashierPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, addToCart, updateQuantity, removeFromCart, clearCart, getTotal, getItemCount } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qris' | 'transfer'>('cash');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productStorage.getAll();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert('Stok habis!');
      return;
    }
    
    const existingItem = items.find(item => item.product.id === product.id);
    if (existingItem && existingItem.quantity >= product.stock) {
      alert('Stok tidak mencukupi!');
      return;
    }
    
    addToCart(product);
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      // Save transaction
      await transactionStorage.add({
        totalAmount: getTotal(),
        paymentMethod,
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity,
        })),
        userId: user?.id || '',
      });

      // Update stock for each product
      for (const item of items) {
        await productStorage.updateStock(item.product.id, item.quantity);
      }

      // Reload products to get updated stock
      await loadProducts();
      
      // Clear cart
      clearCart();
      
      // Show success
      setShowPayment(false);
      setShowSuccess(true);
      
      // Hide success after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Error processing transaction:', err);
      alert('Gagal memproses transaksi');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCartItemQuantity = (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-[#0F172A] pt-12 pb-6 px-4 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 bg-white/10 rounded-xl text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Kasir</h1>
          </div>
          <button 
            onClick={() => setShowCart(true)}
            className="relative p-3 bg-[#2C7DF7] rounded-xl text-white"
          >
            <ShoppingCart className="w-5 h-5" />
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full text-xs flex items-center justify-center font-bold">
                {getItemCount()}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C7DF7]"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#2C7DF7] animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk'}
            </h3>
            <p className="text-gray-500 text-sm">
              {searchQuery ? 'Coba kata kunci lain' : 'Tambahkan produk terlebih dahulu'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const inCartQty = getCartItemQuantity(product.id);
              const isOutOfStock = product.stock <= 0;
              
              return (
                <div 
                  key={product.id}
                  className={`bg-white rounded-xl p-4 shadow-sm relative ${isOutOfStock ? 'opacity-60' : ''}`}
                >
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">HABIS</span>
                    </div>
                  )}
                  
                  <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  
                  <h4 className="font-semibold text-[#0F172A] text-sm mb-1 truncate">{product.name}</h4>
                  <p className="text-[#2C7DF7] font-bold text-sm mb-2">{formatCurrency(product.price)}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Stok: {product.stock}</span>
                    
                    {inCartQty > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(product.id, inCartQty - 1)}
                          className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="font-bold text-[#0F172A] w-6 text-center">{inCartQty}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={inCartQty >= product.stock}
                          className="w-7 h-7 bg-[#2C7DF7] rounded-lg flex items-center justify-center disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isOutOfStock}
                        className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center shadow-sm disabled:opacity-50"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Total Bar */}
      {getItemCount() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">{getItemCount()} item</p>
              <p className="text-xl font-bold text-[#0F172A]">{formatCurrency(getTotal())}</p>
            </div>
            <button
              onClick={() => setShowPayment(true)}
              className="bg-[#10B981] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-green-500/30"
            >
              Bayar
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div 
            className="absolute inset-0"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl animate-slide-left">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-[#0F172A]">Keranjang</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="p-2 bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Keranjang kosong</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#0F172A] text-sm">{item.product.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#2C7DF7] font-bold text-sm">{formatCurrency(item.product.price)}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="font-bold text-[#0F172A] w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-7 h-7 bg-[#2C7DF7] rounded-lg flex items-center justify-center disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Subtotal: {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Total</span>
                  <span className="text-xl font-bold text-[#0F172A]">{formatCurrency(getTotal())}</span>
                </div>
                <button
                  onClick={() => { setShowCart(false); setShowPayment(true); }}
                  className="w-full bg-[#10B981] text-white font-semibold py-3.5 rounded-xl"
                >
                  Lanjut Bayar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">Pembayaran</h2>
              <button 
                onClick={() => setShowPayment(false)}
                className="p-2 bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">{getItemCount()} item</span>
                <span className="text-sm text-gray-500">Detail ▼</span>
              </div>
              <div className="text-2xl font-bold text-[#0F172A]">{formatCurrency(getTotal())}</div>
            </div>

            {/* Payment Methods */}
            <h3 className="font-semibold text-[#0F172A] mb-3">Pilih Metode Pembayaran</h3>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'cash' 
                    ? 'border-[#2C7DF7] bg-[#2C7DF7]/5' 
                    : 'border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  paymentMethod === 'cash' ? 'bg-[#2C7DF7]' : 'bg-gray-100'
                }`}>
                  <Wallet className={`w-6 h-6 ${paymentMethod === 'cash' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#0F172A]">Tunai</h4>
                  <p className="text-sm text-gray-500">Pembayaran cash</p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('qris')}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'qris' 
                    ? 'border-[#2C7DF7] bg-[#2C7DF7]/5' 
                    : 'border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  paymentMethod === 'qris' ? 'bg-[#2C7DF7]' : 'bg-gray-100'
                }`}>
                  <Smartphone className={`w-6 h-6 ${paymentMethod === 'qris' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#0F172A]">QRIS</h4>
                  <p className="text-sm text-gray-500">Scan QR Code</p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'transfer' 
                    ? 'border-[#2C7DF7] bg-[#2C7DF7]/5' 
                    : 'border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  paymentMethod === 'transfer' ? 'bg-[#2C7DF7]' : 'bg-gray-100'
                }`}>
                  <CreditCard className={`w-6 h-6 ${paymentMethod === 'transfer' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#0F172A]">Transfer Bank</h4>
                  <p className="text-sm text-gray-500">Virtual Account</p>
                </div>
              </button>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-[#10B981] text-white font-semibold py-4 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Konfirmasi Pembayaran</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 mx-6 text-center animate-bounce-in">
            <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Transaksi Berhasil!</h2>
            <p className="text-gray-500">Pembayaran telah dikonfirmasi</p>
          </div>
        </div>
      )}
    </div>
  );
};
