import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  const [logoError, setLogoError] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full bg-[var(--navy-900)]/90 backdrop-blur-xl shadow-lg z-40 transition-all duration-300 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-white"
          >
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
              <img
                src={logoError ? "/mwitibakersLogo.jpg" : "/mwitiblogo.webp"}
                alt="Mwiti Bakers Logo"
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            </div>
            <div className="leading-tight">
              <span className="block text-xl sm:text-2xl font-bold tracking-tight">
                Mwiti Bakers
              </span>
              <span className="block text-xs sm:text-sm text-white/70">
                Home of Sweetness — Where We Make Lasting Memories.
              </span>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base">
            <Link
              to="/"
              className="text-white/80 hover:text-white transition duration-200 font-semibold"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative group pill-button bg-white text-[var(--navy-900)] px-4 py-2 font-semibold flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--accent-gold)] text-[var(--navy-900)] rounded-full px-2 py-0.5 text-xs font-bold shadow-sm">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="pill-button bg-[var(--accent-mint)] text-[var(--navy-900)] px-4 py-2 font-semibold flex items-center gap-2"
              >
                <Lock size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="pill-button bg-transparent border border-white/40 text-white px-4 py-2 font-semibold flex items-center gap-2 hover:bg-white/10"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">
                  Log Out
                </span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] px-4 py-2 font-semibold flex items-center gap-2"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  className="pill-button bg-transparent border border-white/40 text-white px-4 py-2 font-semibold flex items-center gap-2 hover:bg-white/10"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
