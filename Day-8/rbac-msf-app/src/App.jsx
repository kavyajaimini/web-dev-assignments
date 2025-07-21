
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RBACProvider, useRBAC } from './rbac/RBACProvider';
import OnboardingFormPage from './pages/OnboardingFormPage';
import DashboardPage from './pages/DashboardPage';
import RoleSelectPage from './pages/RoleSelectPage';
import PermissionGuard from './components/PermissionGuard';
import { isEmployeeOnboarded } from './utils/employeeOnboarded';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient();

function Navbar() {
  const { role } = useRBAC();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const showDashboard = role === 'HR' || (role === 'Employee' && isEmployeeOnboarded());

  if (!user) return null;

  return (
    <header className="w-full sticky top-0 z-30 bg-white/95 border-b border-gray-200 shadow flex items-center justify-between px-8 py-4 mb-10">
      <div className="flex items-center gap-8">
        <span className="flex items-center gap-2 select-none">
          <span className="text-xl font-bold text-gray-800 tracking-tight">Onboard</span>
        </span>
        <nav className="flex gap-6 text-base font-medium" aria-label="Main Navigation">
          {showDashboard && (
            <a href="/dashboard" className="text-gray-700 hover:text-blue-700 transition-colors px-3 py-1 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200">Dashboard</a>
          )}
          {role === 'Employee' && (
            <a href="/onboarding" className="text-gray-700 hover:text-blue-700 transition-colors px-3 py-1 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200">Onboarding</a>
          )}
        </nav>
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <span className="text-gray-600 font-medium">{user?.name} ({user?.role})</span>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 font-semibold border border-red-600 transition-all duration-150"
          onClick={() => { logout(); navigate('/login'); }}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
import { useLocation } from 'react-router-dom';
function AuthGuard({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RBACProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <AuthGuard>
                    <RoleSelectPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <PermissionGuard permission="view_dashboard">
                      <DashboardPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />
              <Route
                path="/onboarding"
                element={
                  <AuthGuard>
                    <PermissionGuard permission="submit_form">
                      <OnboardingFormPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </RBACProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;