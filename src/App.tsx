import { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import POSSales from "./components/pos/POSSales";
import SettingsPage from "./components/settings/SettingsPage";
import Sidebar from "./components/layout/Sidebar";
import routes from "tempo-routes";

interface User {
  username: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("pos");

  const handleLogin = (userData: any) => {
    setUser({
      username: userData.username,
      role: userData.role,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("pos");
  };

  // If user is not logged in, show login page
  if (!user) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    );
  }

  // Main POS interface after login
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "pos":
        return <POSSales />;
      case "dashboard":
        return <Home />;
      case "settings":
        return <SettingsPage />;
      default:
        return <POSSales />;
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <div className="flex h-screen bg-background">
          {/* Sidebar */}
          <div className="w-64 border-r border-border">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-primary">POS System</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Welcome, {user.username} ({user.role})
              </p>
            </div>
            <nav className="px-2 py-4 space-y-1">
              <button
                onClick={() => setCurrentPage("pos")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  currentPage === "pos"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <span className="text-xl">🛒</span>
                <span className="font-medium">POS Sales</span>
              </button>
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  currentPage === "dashboard"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <span className="text-xl">📊</span>
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentPage("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                  currentPage === "settings"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <span className="text-xl">⚙️</span>
                <span className="font-medium">Settings</span>
              </button>
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <span className="text-xl">🚪</span>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">{renderCurrentPage()}</div>
        </div>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
