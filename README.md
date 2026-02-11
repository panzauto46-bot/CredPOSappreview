# 📱 CredPOS Mobile App

**DeFi-Integrated Point of Sale Solution for Android**

The CredPOS Mobile App bridges the gap between traditional retail Point of Sale systems and decentralized finance (DeFi). It allows merchants and users to interact with blockchain networks directly from their mobile devices, enabling features like crypto-backed credit scoring and seamless wallet connectivity.

---

## 🌟 Key Features

### 🔗 **Multi-Chain Wallet Connect**
- **Consolidated Interface**: Connect seamlessly to multiple blockchain networks from a single app.
- **Supported Networks**:
    - **Tezos (Ghostnet)**: Integration effectively via TZIP-10 beacon-like patterns.
    - **Sui (Devnet)**: Direct integration with Sui Wallet standards.
- **Wallet Detection**: Automatically detects installed wallets (Temple, AirGap, Sui Wallet, Ethos, etc.) and guides users if no wallet is found.

### 🛡️ **Secure Architecture**
- **Non-Custodial**: The app never stores private keys. All signing operations are delegated to external wallet apps.
- **Network Switcher**: Architecture designed to safely switch between different blockchain environments without state pollution.
- **Encrypted Local Storage**: Sensitive session data is stored using Android's encrypted SharedPreferences.

### 💳 **Merchant Tools**
- **Credit Score Signing**: unique feature allowing users to sign their credit scores on-chain for immutable reputation tracking.
- **Offline-First**: Built to function in low-connectivity environments, syncing data when connections are restored.

---

## 🛠️ Architecture & Tech Stack

- **Platform**: Native Android (Kotlin) & Hybrid Bridge
- **UI Toolkit**: [Jetpack Compose](https://developer.android.com/jetpack/compose) (Modern, declarative UI)
- **Architecture**: MVVM (Model-View-ViewModel) with Clean Architecture principles.
- **Bridge Technology**: Capacitor (Custom Plugins for Blockchain communication)
- **Blockchain Integration**:
    - `CryptoNetwork` Sealed Classes for type-safe network handling.
    - Repository Pattern for abstracting wallet operations.

---

## 📂 Project Structure Overview

```kotlin
com.credpos.app
├── blockchain/         # Core Blockchain Logic
│   ├── CryptoNetwork.kt      # Network Definitions (Tezos/Sui)
│   ├── BlockchainRepository.kt # Wallet Interfaces
│   └── plugin/               # Capacitor Bridge
├── ui/                 # Jetpack Compose UI
│   ├── components/           # NetworkSwitcher, WalletCard
│   └── screens/              # Main Screens
└── viewmodel/          # State Management
```

---

## 🔐 Security & Hackathon Note

This repository is set to **Private** to ensure the integrity of the proprietary algorithms used for the Credit Scoring mechanism during the Hacktoon competition.

**For Jury & Evaluators:**
- **APK Download**: Please verify the functionality using the provided APK file.
- **Demo Video**: Refer to the submission video for a walkthrough of the multi-chain connection features.

---

*Built with ❤️ for the Hacktoon Competition.*
