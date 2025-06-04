import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "accessories",
  "bags",
  "tops",
  "dresses",
  "two piece set",
  "hats",
  "baby wear",
  "beach wear",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch {
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file); // base64
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-[#1E1B2F] via-[#2D2A41] to-[#1E1B2F] shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-center text-3xl font-bold text-[#E7C9FD] mb-6">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#D1D5DB]"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-[#1E1B2F] border border-[#4B4A6B] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E7C9FD] focus:border-[#E7C9FD]"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#D1D5DB]"
          >
            Description
          </label>
          <textarea
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-[#1E1B2F] border border-[#4B4A6B] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E7C9FD] focus:border-[#E7C9FD]"
            required
          />
        </div>

        {/* Price with Ksh prefix */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-[#D1D5DB]"
          >
            Price
          </label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2.5 text-[#D1D5DB] select-none">
              Ksh
            </span>
            <input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              step="0.01"
              min="0"
              className="block w-full bg-[#1E1B2F] border border-[#4B4A6B] rounded-md py-2 pl-12 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E7C9FD] focus:border-[#E7C9FD]"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-[#D1D5DB]"
          >
            Category
          </label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-[#1E1B2F] border border-[#4B4A6B] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E7C9FD] focus:border-[#E7C9FD]"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-[#1E1B2F] py-2 px-3 border border-[#4B4A6B] rounded-md shadow-sm text-sm font-medium text-[#D1D5DB] hover:bg-[#4A3A65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E7C9FD]"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-[#E7C9FD]">Image uploaded</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-[#A78BFA] hover:bg-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E7C9FD] disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
