
# <img src="frontend\public\logo.png"  height="40"> SpendWise 

SpendWise is a MERN personal finance management application that helps users track income, expenses, and savings with real-time analytics and interactive dashboards.

---

## 🚀 Features

### 🔐 Authentication
- Secure user registration & login using JWT
- Protected routes with middleware

### 💵 Income & Expense Management
- Add, edit, delete transactions
- Categorize income and expenses
- Track financial history

### 📊 Dashboard & Analytics
- Real-time financial overview (Income, Expenses, Savings)
- Interactive gauge charts and category-wise pie charts
- Timeframe filtering (Daily, Weekly, Monthly, Yearly)

### 📅 Smart Insights
- Automatic savings calculation (Income - Expenses)
- Historical trend analysis
- Category-based spending insights

### 📁 Export Functionality
- Export transactions to Excel using XLSX  
- (Implemented via utility function)

### 🎨 Modern UI/UX
- Built with Tailwind CSS for responsive design  
- Custom styling system for consistent UI  
- Smooth modals, dashboards, and animations  
- Custom scrollbar & modal styling 

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Recharts (for data visualization)
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Utilities
- XLSX (Excel export)
- UUID (unique IDs)

---

## 🧠 Core Functionalities

- Financial calculations engine (income, expenses, savings)
- Timeframe-based data filtering (daily → yearly)
- Dynamic chart generation
- Reusable component architecture
- Centralized styling system

---

## 📂 Project Structure

```

/backend
├── controllers
├── models
├── routes
├── middleware
└── utils

/frontend
├── components
├── pages
├── styles
├── assets
└── utils

````

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/spendwise.git
cd spendwise
````

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run the application

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```
