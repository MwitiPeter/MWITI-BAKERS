import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import ImageCarousel from "./ImageCarousel";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleImageError = (e) => {
    e.target.src = "/images/placeholder.svg";
  };

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[var(--navy-900)] text-[var(--cream-50)] p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        {/* Image */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <div
            className="relative bg-white/5 rounded-lg overflow-hidden shadow-md flex items-center justify-center p-2"
            style={{ aspectRatio: "1/1", width: "200px", height: "200px", maxWidth: "100%" }}
          >
            <ImageCarousel
              images={item.images || ["/images/placeholder.svg"]}
              aspectRatio="1/1"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <p className="text-lg font-semibold line-clamp-2">
            {item.name}
          </p>
          <p className="text-sm text-white/70 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Quantity and Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--navy-900)] focus:outline-none transition-all duration-200 hover:scale-110 shadow-lg"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="w-4 h-4" />
            </button>
            <p className="text-lg font-bold text-gray-800 min-w-[2rem]">
              {item.quantity}
            </p>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--navy-900)] focus:outline-none transition-all duration-200 hover:scale-110 shadow-lg"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xl font-bold text-[var(--accent-gold)] mt-2 sm:mt-0">
            KSh {item.price}
          </p>
        </div>

        {/* Remove Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            className="inline-flex items-center justify-center h-10 w-10 text-sm font-medium text-white hover:bg-red-600 bg-red-500 p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
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
