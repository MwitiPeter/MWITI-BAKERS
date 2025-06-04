import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51Q6flHCEQbSiCIkMINDq3g4Y83sQTOJQQLJRrTLQsWYJkvvqu48uvw6KFjS3KIc6oE7VmeaNFk0gXg9bvO4m6Vj800SYIaVh8e"
);

const OrderSummary = () => {
  const navigate = useNavigate();
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;

    try {
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon?.code || null,
      });

      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error.message);
      }
    } catch (error) {
      console.error("Payment Initialization Failed:", error.message);
    }
  };

  const handleMpesaRedirect = () => {
    navigate("/mpesa");
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto space-y-6 rounded-xl bg-[#F5F5F5] p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-2xl font-semibold text-center text-[#6A4C93]">
        Order Summary
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-[#4A4A4A]">Original Price</dt>
            <dd className="text-base font-medium text-[#6A4C93]">
              KSh {formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-[#4A4A4A]">Savings</dt>
              <dd className="text-base font-medium text-[#FBBF24]">
                -KSh {formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-[#4A4A4A]">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-[#FBBF24]">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4 border-t border-[#E0E0E0] pt-2">
            <dt className="text-base font-semibold text-[#6A4C93]">Total</dt>
            <dd className="text-base font-semibold text-[#6A4C93]">
              KSh {formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="w-full py-3 bg-[#6A4C93] hover:bg-[#7D3BD3] text-white font-medium rounded-md shadow-md transition duration-150"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMpesaRedirect}
        >
          Mpesa Checkout
        </motion.button>

        {/* <motion.button
          className="w-full py-3 bg-[#6A4C93] hover:bg-[#7D3BD3] text-white font-medium rounded-md shadow-md transition duration-150"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Paypal and Credit Card Checkout
        </motion.button> */}

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-[#A1A6B1]">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6A4C93] hover:underline"
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
