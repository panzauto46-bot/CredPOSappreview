// Simulasi Firebase dengan LocalStorage
// Dapat dengan mudah diganti dengan Firebase sebenarnya

import { Product, Transaction, User } from '../types';

const KEYS = {
  USER: 'credpos_user',
  PRODUCTS: 'credpos_products',
  TRANSACTIONS: 'credpos_transactions',
  USERS: 'credpos_users',
};

// Demo data untuk fitur Demo Login
const DEMO_USER: User = {
  id: 'demo-user-001',
  email: 'demo@credpos.id',
  businessName: 'Warung Demo CredPOS',
  ownerName: 'Demo User',
  createdAt: Date.now(),
};

const DEMO_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Kopi Susu', price: 18000, stock: 50, createdAt: Date.now() },
  { id: 'p2', name: 'Es Teh Manis', price: 8000, stock: 100, createdAt: Date.now() },
  { id: 'p3', name: 'Nasi Goreng', price: 25000, stock: 30, createdAt: Date.now() },
  { id: 'p4', name: 'Mie Goreng', price: 22000, stock: 35, createdAt: Date.now() },
  { id: 'p5', name: 'Ayam Geprek', price: 28000, stock: 25, createdAt: Date.now() },
  { id: 'p6', name: 'Es Jeruk', price: 10000, stock: 80, createdAt: Date.now() },
  { id: 'p7', name: 'Roti Bakar', price: 15000, stock: 40, createdAt: Date.now() },
  { id: 'p8', name: 'Indomie Rebus', price: 12000, stock: 60, createdAt: Date.now() },
];

const DEMO_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    timestamp: Date.now() - 3600000,
    totalAmount: 53000,
    paymentMethod: 'cash',
    items: [
      { product: DEMO_PRODUCTS[0], quantity: 2 },
      { product: DEMO_PRODUCTS[5], quantity: 1 },
      { product: DEMO_PRODUCTS[6], quantity: 1 },
    ],
    userId: 'demo-user-001',
  },
  {
    id: 't2',
    timestamp: Date.now() - 7200000,
    totalAmount: 75000,
    paymentMethod: 'qris',
    items: [
      { product: DEMO_PRODUCTS[2], quantity: 2 },
      { product: DEMO_PRODUCTS[4], quantity: 1 },
    ],
    userId: 'demo-user-001',
  },
  {
    id: 't3',
    timestamp: Date.now() - 1800000,
    totalAmount: 40000,
    paymentMethod: 'transfer',
    items: [
      { product: DEMO_PRODUCTS[1], quantity: 2 },
      { product: DEMO_PRODUCTS[3], quantity: 1 },
    ],
    userId: 'demo-user-001',
  },
];

// Auth functions
export const authStorage = {
  login: (email: string, _password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(KEYS.USERS) || '[]') as User[];
        const user = users.find(u => u.email === email);
        console.log('Login attempt with password validation:', !!_password);
        
        if (user) {
          localStorage.setItem(KEYS.USER, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Email atau password salah'));
        }
      }, 800);
    });
  },

  demoLogin: (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(KEYS.USER, JSON.stringify(DEMO_USER));
        
        // Set demo products if not exists
        const existingProducts = localStorage.getItem(KEYS.PRODUCTS);
        if (!existingProducts) {
          localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEMO_PRODUCTS));
        }
        
        // Set demo transactions
        const existingTransactions = JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]');
        if (existingTransactions.length === 0) {
          localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(DEMO_TRANSACTIONS));
        }
        
        resolve(DEMO_USER);
      }, 800);
    });
  },

  register: (email: string, _password: string, businessName: string, ownerName: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Register with password:', !!_password);
        const users = JSON.parse(localStorage.getItem(KEYS.USERS) || '[]') as User[];
        
        if (users.find(u => u.email === email)) {
          reject(new Error('Email sudah terdaftar'));
          return;
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          businessName,
          ownerName,
          createdAt: Date.now(),
        };

        users.push(newUser);
        localStorage.setItem(KEYS.USERS, JSON.stringify(users));
        localStorage.setItem(KEYS.USER, JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  },

  logout: (): void => {
    localStorage.removeItem(KEYS.USER);
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
};

// Product functions
export const productStorage = {
  getAll: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
        resolve(products);
      }, 300);
    });
  },

  add: (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]') as Product[];
        const newProduct: Product = {
          ...product,
          id: `prod-${Date.now()}`,
          createdAt: Date.now(),
        };
        products.push(newProduct);
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
        resolve(newProduct);
      }, 500);
    });
  },

  update: (id: string, updates: Partial<Product>): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]') as Product[];
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
          products[index] = { ...products[index], ...updates };
          localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
        }
        resolve();
      }, 300);
    });
  },

  delete: (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]') as Product[];
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(filtered));
        resolve();
      }, 300);
    });
  },

  updateStock: (id: string, quantitySold: number): Promise<void> => {
    return new Promise((resolve) => {
      const products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]') as Product[];
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index].stock = Math.max(0, products[index].stock - quantitySold);
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      }
      resolve();
    });
  },
};

// Transaction functions
export const transactionStorage = {
  getAll: (): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactions = JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]');
        resolve(transactions);
      }, 300);
    });
  },

  add: (transaction: Omit<Transaction, 'id' | 'timestamp'>): Promise<Transaction> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactions = JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]') as Transaction[];
        const newTransaction: Transaction = {
          ...transaction,
          id: `txn-${Date.now()}`,
          timestamp: Date.now(),
        };
        transactions.unshift(newTransaction);
        localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
        resolve(newTransaction);
      }, 500);
    });
  },

  getTodayTotal: (): Promise<number> => {
    return new Promise((resolve) => {
      const transactions = JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]') as Transaction[];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = today.getTime();
      
      const total = transactions
        .filter(t => t.timestamp >= todayTimestamp)
        .reduce((sum, t) => sum + t.totalAmount, 0);
      
      resolve(total);
    });
  },

  getTodayTransactions: (): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      const transactions = JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]') as Transaction[];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = today.getTime();
      
      const todayTxns = transactions.filter(t => t.timestamp >= todayTimestamp);
      resolve(todayTxns);
    });
  },
};
