import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { total, subtotal, coupon, isCouponApplied } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handleMpesaRedirect = () => {
    navigate("/mpesa");
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto space-y-6 rounded-xl bg-[var(--navy-900)] text-[var(--cream-50)] p-6 shadow-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-2xl font-semibold text-center">
        Order Summary
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-white/70">Original Price</dt>
            <dd className="text-base font-medium text-[var(--accent-gold)]">
              KSh {formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-white/70">Savings</dt>
              <dd className="text-base font-medium text-[var(--accent-gold)]">
                -KSh {formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-white/70">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-[var(--accent-gold)]">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4 border-t border-white/10 pt-2">
            <dt className="text-base font-semibold">Total</dt>
            <dd className="text-base font-semibold">
              KSh {formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="w-full py-3 pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-semibold rounded-full transition duration-150"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMpesaRedirect}
        >
          Mpesa Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-white/70">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-gold)] hover:underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
