import { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  {
    href: "/accesssories",
    name: "Accessories",
    imageUrl: "/accessories.jpg",
  },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  { href: "/tops", name: "Tops", imageUrl: "/tops.jpg" },
  { href: "/dresses", name: "Dresses", imageUrl: "/dresses.jpg" },
  {
    href: "/two piece set",
    name: "Two-Piece Set",
    imageUrl: "/twopieceset.jpg",
  },
  { href: "/hats", name: "Hats", imageUrl: "/hats.jpg" },
  { href: "/baby wear", name: "Baby Wear", imageUrl: "/babywear.jpg" },
  { href: "/beach wear", name: "Beach Wear", imageUrl: "/beachwear.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-purple-100 via-purple-200 to-purple-50 text-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-800 mb-4">
            Explore Our Categories
          </h1>
          <p className="text-lg text-purple-600">
            Discover the latest trends in eco-friendly fashion
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CategoryItem category={category} />
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Products */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
              Featured Products
            </h2>
            {products && products.length > 0 ? (
              <FeaturedProducts featuredProducts={products} />
            ) : (
              <p className="text-center text-gray-600">
                No featured products available at the moment.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;
