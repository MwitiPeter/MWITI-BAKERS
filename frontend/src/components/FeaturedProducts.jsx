import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      // add to cart
      addToCart(product);
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
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="py-16 bg-gradient-to-b from-[#1E1B2F] to-[#2D2A41]">
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
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3"
                >
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl transform hover:scale-105">
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[#A1A6B1] font-medium mb-4">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-[#A78BFA] hover:bg-[#8B5CF6] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
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
            className={`absolute top-1/2 -left-6 transform -translate-y-1/2 p-3 rounded-full transition-colors duration-300 ${
              isStartDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#A78BFA] hover:bg-[#8B5CF6]"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-6 transform -translate-y-1/2 p-3 rounded-full transition-colors duration-300 ${
              isEndDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#A78BFA] hover:bg-[#8B5CF6]"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
