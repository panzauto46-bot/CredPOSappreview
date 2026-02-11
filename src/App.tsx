import { useState, useEffect } from 'react'
import { Download, Github } from 'lucide-react'

import loginMockup from './assets/login-mockup.jpg'
import dashboardMockup from './assets/dashboard-mockup.jpg'
import cashierMockup from './assets/cashier-mockup.jpg'
import productsMockup from './assets/products-mockup.jpg'
import settingsMockup from './assets/settings-mockup.jpg'
import paymentMockup from './assets/payment-mockup.jpg'

function App() {
  const [isZoomedOut, setIsZoomedOut] = useState(false)
  const [activeScreen, setActiveScreen] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Zoom out animation after 1 second
    const zoomTimer = setTimeout(() => {
      setIsZoomedOut(true)
    }, 800)

    // Show details after zoom out
    const detailsTimer = setTimeout(() => {
      setShowDetails(true)
    }, 1500)

    return () => {
      clearTimeout(zoomTimer)
      clearTimeout(detailsTimer)
    }
  }, [])

  const screens = [
    {
      id: 'login',
      title: 'Login',
      subtitle: 'Secure Authentication',
      color: 'from-[#0F172A] to-[#1e293b]'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      subtitle: 'Business Overview',
      color: 'from-[#0F172A] to-[#1e293b]'
    },
    {
      id: 'cashier',
      title: 'POS Cashier',
      subtitle: 'Fast Transactions',
      color: 'from-[#0F172A] to-[#1e293b]'
    },
    {
      id: 'products',
      title: 'Products',
      subtitle: 'Inventory Management',
      color: 'from-[#0F172A] to-[#1e293b]'
    },
    {
      id: 'payment',
      title: 'Payment',
      subtitle: 'Payments',
      color: 'from-[#0F172A] to-[#1e293b]'
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Account Settings',
      color: 'from-[#0F172A] to-[#1e293b]'
    }
  ]

  // Login Screen
  const LoginScreen = () => (
    <div className="h-full w-full bg-[#0F172A]">
      <img
        src={loginMockup}
        alt="Login Screen"
        className="w-full h-full object-cover"
      />
    </div>
  )



  // Dashboard Screen
  const DashboardScreen = () => (
    <div className="h-full w-full bg-[#0F172A]">
      <img
        src={dashboardMockup}
        alt="Dashboard Screen"
        className="w-full h-full object-cover"
      />
    </div>
  )

  // Cashier Screen
  const CashierScreen = () => (
    <div className="h-full w-full bg-[#0F172A]">
      <img
        src={cashierMockup}
        alt="Cashier Screen"
        className="w-full h-full object-cover"
      />
    </div>
  )

  // Products Screen
  const ProductsScreen = () => (
    <div className="h-full w-full bg-[#0F172A]">
      <img
        src={productsMockup}
        alt="Products Screen"
        className="w-full h-full object-cover"
      />
    </div>
  )

  // Payment Screen
  const PaymentScreen = () => (
    <div className="h-full w-full bg-[#0F172A]">
      <img
        src={paymentMockup}
        alt="Payment Screen"
        className="w-full h-full object-cover"
      />
    </div>
  )

  // Settings Screen
  const SettingsScreen = () => (
    <div className="h-full w-full bg-[#0F172A]">
      <img
        src={settingsMockup}
        alt="Settings Screen"
        className="w-full h-full object-cover"
      />
    </div>
  )

  const renderScreen = (screenId: string) => {
    switch (screenId) {
      case 'login': return <LoginScreen />
      case 'dashboard': return <DashboardScreen />
      case 'cashier': return <CashierScreen />
      case 'products': return <ProductsScreen />
      case 'payment': return <PaymentScreen />
      case 'settings': return <SettingsScreen />
      default: return <LoginScreen />
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2C7DF7]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-8 pb-4">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2C7DF7] to-[#1e5bc7] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-white font-bold text-xl">CredPOS</span>
        </div>
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
          The Future of SME Payments
        </h1>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Smart POS with Blockchain Integration for Unbanked Merchants
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <button className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-[#10B981]/20 cursor-pointer">
            <Download size={18} />
            <span>Download APK</span>
          </button>
          <a href="#" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105 cursor-pointer">
            <Github size={18} />
            <span>View Source Code</span>
          </a>
        </div>
      </header>

      {/* Main Phone Display - Zoom Out Effect */}
      <div className="relative z-10 flex justify-center items-center py-8">
        <div
          className={`transition-all duration-1000 ease-out ${isZoomedOut ? 'scale-100' : 'scale-150'
            }`}
        >
          {/* Phone Frame */}
          <div className="relative">
            {/* Floating Labels */}
            <div
              className={`absolute -left-32 top-1/4 transition-all duration-500 ${showDetails ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-right">
                <p className="text-[#2C7DF7] text-xs font-semibold">Real-time Sync</p>
                <p className="text-white/50 text-[10px]">Firebase Connected</p>
              </div>
            </div>

            <div
              className={`absolute -right-32 top-1/3 transition-all duration-500 delay-100 ${showDetails ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
                <p className="text-[#10B981] text-xs font-semibold">Blockchain Ready</p>
                <p className="text-white/50 text-[10px]">Credit Score Integration</p>
              </div>
            </div>

            <div
              className={`absolute -left-28 bottom-1/4 transition-all duration-500 delay-200 ${showDetails ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-right">
                <p className="text-purple-400 text-xs font-semibold">Scalable POS</p>
                <p className="text-white/50 text-[10px]">Architecture</p>
              </div>
            </div>

            <div
              className={`absolute -right-28 bottom-1/3 transition-all duration-500 delay-300 ${showDetails ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
                <p className="text-orange-400 text-xs font-semibold">Offline Mode</p>
                <p className="text-white/50 text-[10px]">Works Anywhere</p>
              </div>
            </div>

            {/* Phone Body */}
            <div className="w-[280px] h-[580px] bg-[#1a1a1a] rounded-[45px] p-2 shadow-2xl shadow-black/50 border border-white/10">
              {/* Inner Frame */}
              <div className="w-full h-full bg-[#0F172A] rounded-[38px] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1a1a] rounded-b-2xl z-20" />

                {/* Screen Content */}
                <div className="h-full">
                  {renderScreen(screens[activeScreen].id)}
                </div>
              </div>
            </div>

            {/* Side Buttons */}
            <div className="absolute right-0 top-24 w-1 h-12 bg-[#2a2a2a] rounded-l-sm" />
            <div className="absolute left-0 top-20 w-1 h-8 bg-[#2a2a2a] rounded-r-sm" />
            <div className="absolute left-0 top-32 w-1 h-16 bg-[#2a2a2a] rounded-r-sm" />
          </div>
        </div>
      </div>

      {/* Screen Selector */}
      <div
        className={`relative z-10 transition-all duration-500 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <div className="flex justify-center gap-2 px-4 flex-wrap max-w-md mx-auto">
          {screens.map((screen, index) => (
            <button
              key={screen.id}
              onClick={() => setActiveScreen(index)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeScreen === index
                ? 'bg-[#2C7DF7] text-white shadow-lg shadow-[#2C7DF7]/30'
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
            >
              {screen.title}
            </button>
          ))}
        </div>

        {/* Screen Info */}
        <div className="text-center mt-6">
          <h2 className="text-white text-xl font-bold">{screens[activeScreen].title}</h2>
          <p className="text-white/50 text-sm">{screens[activeScreen].subtitle}</p>
        </div>
      </div>

      {/* Features Grid */}
      <div
        className={`relative z-10 mt-12 px-6 pb-12 transition-all duration-700 delay-500 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <h3 className="text-white/40 text-xs font-semibold text-center mb-6 uppercase tracking-wider">
          Key Features
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { icon: '⚡', title: 'Super Fast', desc: '< 1 second transaction' },
            { icon: '🔒', title: 'Secure', desc: 'Firebase Auth' },
            { icon: '📊', title: 'Analytics', desc: 'Complete Reports' },
            { icon: '🔗', title: 'Blockchain', desc: 'Credit Score ready' },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <p className="text-white text-sm font-medium">{feature.title}</p>
              <p className="text-white/40 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div
        className={`relative z-10 px-6 pb-16 transition-all duration-700 delay-700 ${showDetails ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-white/40 text-xs font-semibold text-center mb-4 uppercase tracking-wider">
            Tech Stack
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { name: 'React', color: '#61DAFB' },
              { name: 'TypeScript', color: '#3178C6' },
              { name: 'Tailwind', color: '#06B6D4' },
              { name: 'Firebase', color: '#FFCA28' },
            ].map((tech, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-1 mx-auto"
                  style={{ backgroundColor: `${tech.color}20` }}
                >
                  <span className="text-lg" style={{ color: tech.color }}>
                    {tech.name[0]}
                  </span>
                </div>
                <p className="text-white/60 text-xs">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Demo Section */}
      <div
        className={`relative z-10 px-6 pb-16 transition-all duration-700 delay-1000 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div className="max-w-3xl mx-auto">
          <h3 className="text-white/40 text-xs font-semibold text-center mb-6 uppercase tracking-wider">
            Watch CredPOS in Action
          </h3>
          <div className="relative rounded-2xl overflow-hidden border border-[#2C7DF7]/30 shadow-[0_0_50px_-12px_rgba(44,125,247,0.25)]">
            <div className="aspect-video bg-black/50">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/d4ksmyFDHAY"
                title="CredPOS Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-8">
        <p className="text-white/30 text-xs">
          CredPOS © 2026 • Smart POS for Indonesian SMEs
        </p>
      </footer>
    </div>
  )
}

export default App
