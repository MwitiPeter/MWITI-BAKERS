import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleImageError = (e) => {
    e.target.src = "/images/placeholder.svg";
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        {/* Image */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <div className="relative bg-gray-50 rounded-lg overflow-hidden shadow-md flex items-center justify-center p-1" style={{ aspectRatio: "1/1", width: "96px" }}>
            <img
              className="max-w-full max-h-full object-contain rounded"
              src={item.images?.[0] || "/images/placeholder.svg"}
              alt={item.name}
              onError={handleImageError}
              loading="lazy"
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <p className="text-base font-medium text-gray-800 hover:text-gray-600 line-clamp-2">
            {item.name}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Quantity and Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 hover:scale-105"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="w-4 h-4" />
            </button>
            <p className="text-base text-gray-800 min-w-[2rem]">
              {item.quantity}
            </p>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 hover:scale-105"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-base font-bold text-gray-800 mt-2 sm:mt-0">
            Ksh {item.price}
          </p>
        </div>

        {/* Remove Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 hover:underline p-2 rounded-full hover:bg-red-50 transition-all duration-200"
            onClick={() => removeFromCart(item._id)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
