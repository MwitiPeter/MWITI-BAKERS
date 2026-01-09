import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import Mpesa from "./pages/Mpesa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems, calculateTotals } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  // Calculate totals whenever cart changes (for persisted data)
  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen text-[var(--cream-50)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -left-24 -top-32 w-72 h-72 bg-white/5 blur-3xl rounded-full" />
        <div className="absolute right-0 top-10 w-80 h-80 bg-[var(--accent-mint)]/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-50 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={!user ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/secret-dashboard"
              element={
                user?.role === "admin" ? (
                  <AdminPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-success"
              element={
                user ? <PurchaseSuccessPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/purchase-cancel"
              element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/mpesa"
              element={user ? <Mpesa /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
