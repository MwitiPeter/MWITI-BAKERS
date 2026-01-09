import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-[var(--cream-50)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-panel rounded-lg shadow-xl overflow-hidden relative z-10"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-[var(--accent-gold)] w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            This payment system is Coming soon !!!
          </h1>
          <p className="text-white/80 text-center mb-6">
          You can Continue with Mpesa Checkout Button in the Cart Page 
          </p>
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-white/80 text-center">
            Then follow the instructions to complete your purchase.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              to={"/"}
              className="w-full pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-bold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Return to Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
