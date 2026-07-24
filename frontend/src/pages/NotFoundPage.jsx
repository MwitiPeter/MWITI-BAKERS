import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-[var(--cream-50)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-panel rounded-lg shadow-xl overflow-hidden relative z-10 p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="text-8xl font-extrabold text-[var(--accent-gold)] mb-2">404</h1>
          <div className="w-16 h-1 bg-[var(--accent-gold)] mx-auto mb-6 rounded-full" />
          <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
          <p className="text-white/70 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center hover:-translate-y-[2px]"
          >
            <Home className="mr-2" size={18} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-transparent border border-white/30 text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center hover:bg-white/10"
          >
            <ArrowLeft className="mr-2" size={18} />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
