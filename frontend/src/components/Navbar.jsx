import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full bg-[#E7C9FD] bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-[#E0B8FD]"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-[#1E1B2F] items-center space-x-2 flex"
          >
            Acey Crochets
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-[#2D2A41] hover:text-[#4C9D6C] transition duration-300 ease-in-out"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative group text-[#2D2A41] hover:text-[#4C9D6C] transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-[#4C9D6C]"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-[#2D2A41] text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-[#E0B8FD] transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-[#DAAFFC] hover:bg-[#2D2A41] text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-[#DAAFFC] hover:bg-[#2D2A41] text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-[#2D2A41] hover:bg-[#1E1B2F] text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-[#2D2A41] hover:bg-[#1E1B2F] text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
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
