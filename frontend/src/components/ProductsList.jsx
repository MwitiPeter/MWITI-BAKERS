import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products, loading, error, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-[#B1B1B1] p-4">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-[#0D0D0D] shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-[#121212]">
        <thead className="bg-[#121212]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#B1B1B1] uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#B1B1B1] uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#B1B1B1] uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#B1B1B1] uppercase tracking-wider">Featured</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#B1B1B1] uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-[#0D0D0D] divide-y divide-[#121212]">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-[#1B1B1B]">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-[#B1B1B1]">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-[#B1B1B1]">
                  Ksh {product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-[#B1B1B1]">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-[#1B1B1B] text-[#B1B1B1]"
                      : "bg-[#FFD700] text-[#808080]"
                  } hover:bg-[#808080] transition-colors duration-200`}
                >
                  <Star className="h-5 w-5 text-[#FFD700]" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-[#FFD700] hover:text-[#B1B1B1]"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
