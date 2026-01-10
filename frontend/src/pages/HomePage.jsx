import { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  {
    href: "/Our Info",
    name: "Our Info",
    imageUrl: "/ourinfo.png",
  },
  { href: "/Our Prices", name: "Our Prices", imageUrl: "/ourprices.png" },
  { href: "/Bento&Cupcakes", name: "Bento&Cupcakes", imageUrl: "/bentocupcakes.jpg" },
  { href: "/Buns & Scones", name: "Buns & Scones", imageUrl: "/bunsscones.jpg" },
  {
    href: "/Orange Cake",
    name: "Orange Cake",
    imageUrl: "/orange.jpg",
  },
  { href: "/Animated Design", name: "Animated Design", imageUrl: "/animateddesign.jpg" },
  { href: "/Ganache Cake", name: "Ganache Cake", imageUrl: "/ganachecake.jpg" },
  { href: "/Layered Cake", name: "Layered Cake", imageUrl: "/layeredcake.jpg" },
];
 
const HomePage = () => {
  const { fetchFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-transparent text-[var(--cream-50)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Page Intro (kept minimal per request) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center space-y-3"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Mwiti Bakers</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Explore Our Products
          </h1>
          <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
            Home of Sweetness — Where We Make Memories. Discover cakes and pastries crafted for every celebration.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          id="categories"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CategoryItem category={category} />
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Products */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            id="featured"
            className="mt-16 sm:mt-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
              Featured Products
            </h2>
            {products && products.length > 0 ? (
              <FeaturedProducts featuredProducts={products} />
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  No featured products available at the moment.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;
