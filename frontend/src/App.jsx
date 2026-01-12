import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCartStore } from "./stores/useCartStore";

// Lazy load route components for better code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const Mpesa = lazy(() => import("./pages/Mpesa"));
const CartPage = lazy(() => import("./pages/CartPage"));
const PurchaseSuccessPage = lazy(() => import("./pages/PurchaseSuccessPage"));
const PurchaseCancelPage = lazy(() => import("./pages/PurchaseCancelPage"));

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
          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
