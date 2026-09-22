# 💊 Aadhya Pharmex

> Modern, full-featured pharmaceutical distribution, e-commerce, and enterprise supply platform.

[![TanStack Start](https://img.shields.io/badge/TanStack-Start-blue?style=flat-square)](https://tanstack.com/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare_Workers-F38020?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com/)

---

## 🌟 Overview

**Aadhya Pharmex** is a high-performance digital pharmaceutical distribution portal designed to streamline supply chains between healthcare manufacturers, distributors, pharmacies, and patients. Built on TanStack Start and React, it combines lightning-fast edge rendering with an intuitive commerce experience.

---

## ✨ Key Features

- **Dynamic Product & Brand Catalog**:
  - Filterable pharmaceutical catalog (`/products`, `/products/$id`)
  - Dedicated brand showcase and manufacturer landing pages (`/brands/$slug`)
- **Ordering & Cart Flow**:
  - Interactive shopping cart and prescription supply ordering (`/cart`)
- **Corporate & Regulatory Showcase**:
  - Compliance, licensing, and certifications (`/about/certifications`)
  - Corporate history, leadership message, and mission statement
- **Administrative Portal**:
  - Internal management panel (`/admin`) for inventory and catalog moderation
- **Authentication**:
  - Secure user onboarding and login (`/login`, `/signup`)
- **Edge Deployment**:
  - Ultra-fast global delivery powered by Cloudflare Workers and Vite

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | TanStack Start (SSR & File-based Routing) |
| **Frontend** | React, TypeScript |
| **UI Components** | Radix UI primitives, Lucide Icons |
| **Styling** | Tailwind CSS / Modern CSS Modules |
| **Bundler & Runtime** | Vite, Bun / Node.js |
| **Deployment** | Cloudflare Workers (`wrangler.jsonc`) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have one of the following runtimes installed:
- [Node.js](https://nodejs.org/) (v18+) or [Bun](https://bun.sh/)
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Arshitraj-123/Aadhya-Pharmex.git
   cd Aadhya-Pharmex
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── assets/          # Static branding, images, and icons
├── components/      # Reusable Radix & custom UI components
├── contexts/        # Global state and auth context providers
├── data/            # Mock data and static pharmaceutical datasets
├── hooks/           # Custom React hooks
├── lib/             # Utility helpers and API clients
├── routes/          # TanStack Start file-based route definitions
│   ├── about/       # Mission, history, certifications, CEO notes
│   ├── brands/      # Brand listings and slug pages
│   ├── admin.tsx    # Admin dashboard
│   ├── cart.tsx     # Shopping cart
│   └── index.tsx    # Homepage
├── router.tsx       # Router configuration
└── styles.css       # Global stylesheet & design tokens
```

---

## 👥 Contributors

- **Arshit Raj** ([@Arshitraj-123](https://github.com/Arshitraj-123))
- **Zeeshan** ([@zeeshandz](https://github.com/zeeshandz))

---

## 📄 License

This project is licensed under the MIT License — see the repository for details.
