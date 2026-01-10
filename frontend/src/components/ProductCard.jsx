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

  // Check if product is in categories where we should hide cart button and price
  const isInfoOrPriceCategory = product.category && 
    (product.category === "Our Info" || product.category === "Our Prices");

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-xl border border-white/10 shadow-xl bg-[var(--navy-900)] text-[var(--cream-50)] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative mx-3 mt-3 overflow-hidden rounded-xl bg-white/5">
        <ImageCarousel 
          images={getProductImages()} 
          aspectRatio="3/4"
        />
      </div>

      <div className="mt-4 px-5 pb-5 flex-1 flex flex-col">
        <h5 className="text-lg sm:text-xl font-semibold tracking-tight line-clamp-2 mb-2">
          {product.name}
        </h5>
        <p className="text-sm text-white/70 line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>
        <div className="mt-auto">
          {!isInfoOrPriceCategory && (
            <div className="mb-4 flex items-center justify-between">
              <p>
                <span className="text-2xl sm:text-3xl font-bold text-[var(--accent-gold)]">
                  KSh {product.price}
                </span>
              </p>
            </div>
          )}
          {!isInfoOrPriceCategory && (
            <button
              className="w-full pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-semibold py-3 px-4 rounded-full transition-all duration-300 flex items-center justify-center hover:-translate-y-[2px]"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
