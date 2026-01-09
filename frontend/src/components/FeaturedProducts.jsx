import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";
import ImageCarousel from "./ImageCarousel";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled =
    currentIndex >= (featuredProducts?.length || 0) - itemsPerPage;

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <div className="py-16 bg-[var(--navy-900)]">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl sm:text-5xl font-semibold text-white mb-6">
            Featured Products
          </h2>
          <p className="text-center text-white/80">
            No featured products available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-[var(--navy-900)]">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl sm:text-5xl font-semibold text-white mb-6">
          Featured Products
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3"
                >
                  <div className="glass-panel h-full flex flex-col justify-between min-h-[400px] transition-all duration-300">
                    <div className="relative overflow-hidden bg-white/5 flex items-center justify-center p-2" style={{ aspectRatio: "3/4" }}>
                      <ImageCarousel images={product.images || ["/images/placeholder.svg"]} aspectRatio="3/4" />
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between h-full">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-[var(--accent-gold)] font-semibold mb-4">
                          KSh {product.price?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-semibold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center hover:-translate-y-[2px] mt-auto"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-6 transform -translate-y-1/2 p-2 sm:p-3 rounded-full border border-white/20 transition-all duration-300 ${
              isStartDisabled
                ? "bg-white/10 cursor-not-allowed text-white/50"
                : "bg-white text-[var(--navy-900)] hover:scale-110"
            }`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-6 transform -translate-y-1/2 p-2 sm:p-3 rounded-full border border-white/20 transition-all duration-300 ${
              isEndDisabled
                ? "bg-white/10 cursor-not-allowed text-white/50"
                : "bg-white text-[var(--navy-900)] hover:scale-110"
            }`}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
