import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";

const Mpesa = () => {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#9B4D96]">
          ✅ Payment Instructions
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-[#3E1A47] py-8 px-4 shadow sm:rounded-lg sm:px-10 text-[#D3BCC7] space-y-6">
          <p>To complete your order, kindly follow the steps below:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Send the total amount via <strong>M-Pesa</strong> to the following
              number:
              <br />
              <span className="text-lg font-bold text-[#BB86FC]">
                📱 +254713552374
              </span>
            </li>
            <li>
              Take a screenshot of:
              <ul className="list-disc list-inside ml-5 mt-1">
                <li>The M-Pesa payment confirmation.</li>
                <li>
                  Your Cart Page showing the selected products and total amount.
                </li>
              </ul>
            </li>
            <li>
              Send both screenshots to us via WhatsApp by clicking the button
              below.
            </li>
          </ol>

          <a
            href="https://wa.me/254713552374"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full flex justify-center items-center px-4 py-2 border border-transparent 
            text-sm font-medium rounded-md shadow-sm text-white bg-[#9B4D96] hover:bg-[#7F3F8C] 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9B4D96]"
          >
            <MessageCircleHeart className="h-5 w-5 mr-2" />
            Send Screenshots via WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Mpesa;
