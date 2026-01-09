import { ArrowRight, XCircle, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const PurchaseSuccessPage = () => {
  return (
    <div className="h-screen flex items-center justify-center px-4 text-[var(--cream-50)]">
      <div className="max-w-md w-full glass-panel rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-[var(--accent-gold)] w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            This Payment System is Coming oon !!!
          </h1>

          <p className="text-white/80 text-center mb-2">
            You can Continue with Mpesa Checkout Button in the Cart Page
          </p>
          <p className="text-white/70 text-center text-sm mb-6">
            Then follow the instructions to complete your purchase.
          </p>
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Order number</span>
              <span className="text-sm font-semibold text-[var(--accent-gold)]">
                #12345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Estimated delivery</span>
              <span className="text-sm font-semibold text-[var(--accent-gold)]">
                3-5 business days
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-bold py-2 px-4 
              rounded-full transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/"}
              className="w-full bg-transparent border border-white/30 text-white font-bold py-2 px-4 
              rounded-full transition duration-300 flex items-center justify-center hover:bg-white/10"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
