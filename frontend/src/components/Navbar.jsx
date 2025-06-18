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
      className="fixed top-0 left-0 w-full bg-white bg-opacity-95 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-purple-200"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent items-center space-x-2 flex"
          >
            Acey Crochets
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition duration-300 ease-in-out font-medium"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ShoppingCart className="inline-block mr-2" size={20} />
                <span className="hidden sm:inline font-medium">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out flex items-center shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Lock className="inline-block mr-2" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-2 px-4 rounded-lg flex items-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-105"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2 font-medium">
                  Log Out
                </span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg flex items-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <UserPlus className="mr-2" size={18} />
                  <span className="font-medium">Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-2 px-4 rounded-lg flex items-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <LogIn className="mr-2" size={18} />
                  <span className="font-medium">Login</span>
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
