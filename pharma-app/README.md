# Aadhya Pharmex Distribution DMS

A comprehensive, responsive Pharmaceutical Distribution Management System (DMS) built with React, Vite, and Node.js/Express. 

## Overview
Aadhya Pharmex DMS is designed to streamline pharmaceutical supply chains, offering complete control over:
- Live Inventory and Stock Allocation
- Real-time Delivery Tracking and Dispatch Control
- Retailer Network Management
- Purchase and GRN Processing
- Scheme and Promotion Management
- GST, Billing, and Regulatory Compliance

## Features
- **Frontend App (`pharma-app`):** Built with React 19 + Vite 6. Features a fully custom UI using `theme.js` with beautifully styled dashboard layouts, modals, and charts.
- **Backend API (`pharma-api`):** Built with Node.js and Express. Connects to MongoDB via Mongoose for storing retailer and inventory data. Implements OTP generation for authentication.
- **Modals System:** A highly interactive experience for creating new orders, stocks, dispatches, retailers, purchases, schemes, and invoices without leaving the current page.
- **Responsive Dashboard Layouts:** Adaptive sidebar and widget grids constructed natively with CSS and modern utility classes, supporting seamless mobile and desktop experiences.
- **Iconography:** Powered by Tabler Icons.

## Project Structure
The repository contains two main directories:
1. `pharma-app/` - The React frontend application.
   - `src/pages/` - All the primary route views (Dashboard, Orders, Inventory, Delivery, Retailers, Purchase, Schemes, Billing, Settings, Auth).
   - `src/components/` - Reusable UI components including Layout, Charts, Modals, and standard UI elements.
   - `src/api/` - Axios API client configuration.
2. `pharma-api/` - The Node.js/Express backend server.
   - `models/` - Mongoose data schemas (User, Otp).
   - `server.js` - Main Express server entry point.

## Tech Stack
- **Frontend Framework:** React 19 + Vite 6
- **Backend Framework:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Styling:** Vanilla CSS (`index.css`) + Custom Design System (`theme.js`)
- **Icons:** Tabler Icons

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Server running locally on port 27017

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arshitraj-123/Aadhya-Pharmex.git
   ```

2. **Start the Backend**
   ```bash
   cd Aadhya-Pharmex/pharma-api
   npm install
   node server.js
   ```

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd Aadhya-Pharmex/pharma-app
   npm install
   npm run dev
   ```

## License
© Aadhya Pharmex 2026. All Rights Reserved.
