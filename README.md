# POS System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [User Roles](#user-roles)
- [Components Overview](#components-overview)
- [API Integration](#api-integration)
- [Discount Functionality](#discount-functionality)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The POS (Point of Sale) System is designed to manage inventory, process sales, and issue receipts for shop vendors. It includes both admin and cashier functionalities, allowing users to manage products, track sales, and analyze profit margins efficiently.

## Features

- **User Authentication:** Login system with separate access for admin and cashier.
- **Inventory Management:** Add, update, and manage stock levels of products.
- **Sales Processing:** Process transactions and issue receipts to customers.
- **Discount Application:** Apply discounts to sales transactions.
- **Profit Margins:** Track and analyze profit margins over selected periods.
- **Supplier Management:** Store and manage details of suppliers.
- **Responsive UI:** Easy-to-use interface with navigation between different sections.

## Technologies Used

- **Frontend:** React.js
- **State Management:** React Context API
- **Authentication:** Google OAuth (for initial versions), custom login system
- **Styling:** CSS
- **Routing:** React Router
- **Backend:** Node.js (Optional, if API integration is required)
- **Hosting:** Heroku (or your preferred hosting provider)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pos-system.git
    ```

2. Navigate to the project directory:
    ```bash
    cd pos-system
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Admin Login:**
   - Log in with admin credentials.
   - Manage inventory, view sales data, and analyze profit margins.
   - Add or remove users with specific roles.

2. **Cashier Login:**
   - Log in with cashier credentials.
   - Process sales and issue receipts to customers.
   - Apply discounts when applicable.

3. **Inventory Management:**
   - Add new products, update existing ones, and ensure stock levels are accurate.
   - Price and stock should never be set to a negative number.

4. **Sales Processing:**
   - Navigate to the Sales section to begin processing customer transactions.
   - View transaction history and issue receipts.

## User Roles

- **Admin:** 
  - Full access to all features.
  - Can manage users, inventory, sales, and system settings.
  
- **Cashier:** 
  - Limited access to sales processing and receipt issuance.

## Components Overview

- **Home Component:** The main dashboard for navigating between sections.
- **AdminLogin Component:** Handles admin authentication.
- **ProcessSale Component:** Allows searching, viewing, and processing sales by date.
- **IssueReceipt Component:** Displays sold items and issues receipts.
- **Inventory Management:** Interface for adding, updating, and deleting products.

## API Integration

- Optional integration with external APIs for features like product data fetching or external authentication.

## Discount Functionality

- The system allows applying percentage-based discounts to transactions during the sales process. Ensure that discounts are properly validated to prevent errors in sales data.

## Project Structure

```bash
pos-system/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   ├── routes.js
│   └── styles/
├── .gitignore
├── package.json
└── README.md
