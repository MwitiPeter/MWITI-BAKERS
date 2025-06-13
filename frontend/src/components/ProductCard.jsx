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

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-[hsla(274, 90%, 85%, 1)] shadow-lg bg-white">
      <div className="relative mx-3 mt-3 h-72 overflow-hidden rounded-xl bg-white">
        <ImageCarousel images={product.images} />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-[hsla(276, 83%, 95%, 1)]">
          {product.name}
        </h5>
        <p className="mt-2 text-sm text-[hsla(276, 83%, 85%, 1)] line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-[hsla(275, 93%, 89%, 1)]">
              KSh {product.price}
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg bg-[hsla(276, 83%, 95%, 1)] px-5 py-2.5 text-center text-sm font-medium 
           text-[hsla(274, 90%, 85%, 1)] hover:bg-[hsla(276, 83%, 95%, 1)] focus:outline-none focus:ring-4 focus:ring-[hsla(275, 93%, 89%, 1)]"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
