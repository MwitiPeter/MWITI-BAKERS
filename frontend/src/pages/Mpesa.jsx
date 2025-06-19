import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircleHeart,
  Camera,
  MessageCircle,
  CheckCircle,
  Sparkles,
  ShoppingBasket,
} from "lucide-react";

const steps = [
  {
    icon: <Camera className="h-7 w-7 text-[#BB86FC]" />,
    title: "Snap Your Cart Page",
    description: (
      <>
        Take a screenshot of your cart page showing the items you'd like to
        order.
      </>
    ),
  },
  {
    icon: <MessageCircle className="h-7 w-7 text-[#BB86FC]" />,
    title: "Share on WhatsApp",
    description: (
      <>
        Send the screenshot to us on WhatsApp. Once we receive it, we'll chat
        with you directly about the following:
        <ul className="list-disc ml-6 mt-2 text-[#E7C9FD] text-sm">
          <li>
            How you'd like your crochet items to look{" "}
            <span className="italic">(customizations)</span>
          </li>
          <li>Payment details</li>
          <li>How long it will take to complete your order</li>
        </ul>
      </>
    ),
  },
  {
    icon: <CheckCircle className="h-7 w-7 text-[#BB86FC]" />,
    title: "Order Confirmed!",
    description: (
      <>
        Once everything is agreed on, sit back and relax while we handcraft your
        beautiful crochet items.
        <br />
        <span className="font-semibold text-[#FFD700]">
          Thank you for supporting handmade!
        </span>
      </>
    ),
  },
];

const Mpesa = () => {
  const [showThanks, setShowThanks] = useState(false);

  const handleWhatsAppClick = () => {
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 3500);
  };

  return (
    <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#F5E9FD] via-[#E7C9FD] to-[#DAAFFC]">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#9B4D96] drop-shadow-lg flex items-center justify-center gap-2">
          <ShoppingBasket className="inline-block h-8 w-8 text-[#BB86FC]" />
          Order Confirmation
        </h2>
      </motion.div>

      <motion.div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-[#3E1A47] py-10 px-4 sm:px-10 shadow-xl rounded-2xl text-[#D3BCC7] space-y-8">
          <ol className="space-y-8">
            {steps.map((step, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-4 group"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.03, backgroundColor: "#4B225A" }}
                whileTap={{ scale: 0.98 }}
                style={{ borderRadius: "1rem", padding: "0.5rem 0.75rem" }}
              >
                <div className="flex-shrink-0">{step.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-[#BB86FC] mb-1 group-hover:text-[#FFD700] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <div className="text-base text-[#E7C9FD]">
                    {step.description}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.a
            href="https://wa.me/254713552374"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full flex justify-center items-center px-6 py-3 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-[#9B4D96] to-[#BB86FC] hover:from-[#7F3F8C] hover:to-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9B4D96] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleWhatsAppClick}
          >
            <MessageCircleHeart className="h-6 w-6 mr-3 animate-bounce" />
            Send Screenshot via WhatsApp
          </motion.a>

          {showThanks && (
            <motion.div
              className="mt-6 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-10 w-10 text-[#FFD700] mb-2 animate-pulse" />
              <span className="text-lg font-bold text-[#FFD700] text-center">
                Thanks for supporting Acey Crochet!
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Mpesa;
