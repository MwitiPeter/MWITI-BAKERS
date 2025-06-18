import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import ImageCarousel from "./ImageCarousel";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  // Handle image display with fallback
  const getProductImages = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    if (product.image) {
      return [product.image];
    }
    return ["/images/placeholder.svg"];
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-xl border border-purple-200 shadow-lg bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="relative mx-3 mt-3 overflow-hidden rounded-xl bg-gray-50">
        <ImageCarousel 
          images={getProductImages()} 
          aspectRatio="3/4"
        />
      </div>

      <div className="mt-4 px-5 pb-5 flex-1 flex flex-col">
        <h5 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-800 line-clamp-2 mb-2">
          {product.name}
        </h5>
        <p className="text-sm text-gray-600 line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>
        <div className="mt-auto">
          <div className="mb-4 flex items-center justify-between">
            <p>
              <span className="text-2xl sm:text-3xl font-bold text-purple-600">
                KSh {product.price}
              </span>
            </p>
          </div>
          <button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
