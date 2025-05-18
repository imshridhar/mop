import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import WorkOrders from './pages/WorkOrders';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import WorkerDashboard from './pages/WorkerDashboard';
import ClientDashboard from './pages/ClientDashboard';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Worker Routes */}
            <Route path="/worker" element={<DashboardLayout />}>
              <Route index element={<WorkerDashboard />} />
            </Route>

            {/* Client Routes */}
            <Route path="/client" element={<DashboardLayout />}>
              <Route index element={<ClientDashboard />} />
            </Route>

            {/* Main Dashboard Routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="work-orders" element={<WorkOrders />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;