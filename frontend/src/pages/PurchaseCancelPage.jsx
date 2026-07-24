import { XCircle, ShoppingCart, Home, MessageCircle, HelpCircle } from "lucide-react";
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
            Payment Cancelled
          </h1>
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-white/80 text-center text-sm">
              Your payment was not completed. No charges have been made.
              You can try again or reach out to us for help.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to={"/cart"}
              className="w-full pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center hover:-translate-y-[2px]"
            >
              <ShoppingCart className="mr-2" size={18} />
              Try Again — Return to Cart
            </Link>

            <Link
              to={"/"}
              className="w-full bg-transparent border border-white/30 text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center hover:bg-white/10"
            >
              <Home className="mr-2" size={18} />
              Continue Shopping
            </Link>

            <div className="pt-4 border-t border-white/10 mt-4">
              <p className="text-xs text-white/50 text-center mb-3">
                Need help with your order?
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://wa.me/254757365203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--accent-gold)] hover:underline"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
                <a
                  href="mailto:mwitibakers@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-[var(--accent-gold)] hover:underline"
                >
                  <HelpCircle size={16} />
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
