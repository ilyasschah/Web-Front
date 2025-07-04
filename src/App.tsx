import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { POSTerminal } from '@/components/pos/POSTerminal';
import { ProductManagement } from '@/components/products/ProductManagement';
import { useAuthStore } from '@/store/authStore';
import { Toaster } from '@/components/ui/toaster';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Mock login for demo purposes
const MockLogin: React.FC = () => {
  const { login } = useAuthStore();

  React.useEffect(() => {
    // Auto-login for demo
    login(
      {
        id: '1',
        name: 'Demo Admin',
        email: 'admin@demo.com',
        role: 'admin',
        isActive: true,
      },
      'demo-token'
    );
  }, [login]);

  return <div>Loading...</div>;
};

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          {!isAuthenticated ? (
            <MockLogin />
          ) : (
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/pos" replace />} />
                <Route path="pos" element={<POSTerminal />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="categories" element={<div>Categories Management</div>} />
                <Route path="customers" element={<div>Customer Management</div>} />
                <Route path="orders" element={<div>Order Management</div>} />
                <Route path="inventory" element={<div>Inventory Management</div>} />
                <Route path="tables" element={<div>Table Management</div>} />
                <Route path="users" element={<div>User Management</div>} />
                <Route path="discounts" element={<div>Discount Management</div>} />
                <Route path="reports" element={<div>Reports</div>} />
                <Route path="settings" element={<div>Settings</div>} />
              </Route>
            </Routes>
          )}
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;