import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between space-x-6">
        <div className="flex-shrink-0">
          <img
            className="h-20 w-20 rounded object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>

        <div className="flex flex-1 flex-col space-y-2">
          <p className="text-base font-medium text-gray-800 hover:text-gray-600">
            {item.name}
          </p>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus />
            </button>
            <p className="text-base text-gray-800">{item.quantity}</p>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus />
            </button>
          </div>

          <p className="text-base font-bold text-gray-800">${item.price}</p>
        </div>

        <div className="flex items-center">
          <button
            className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 hover:underline"
            onClick={() => removeFromCart(item._id)}
          >
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
