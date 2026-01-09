import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const categories = [
  "ourinfo",
  "ourprices",
  "bentocupcakes",
  "bunsscones",
  "orange",
  "animateddesign",
  "ganacheckae",
  "layeredcake",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newProduct.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    try {
      await createProduct(newProduct);
      toast.success("Product created successfully!");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
    } catch (error) {
      toast.error("Failed to create product");
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (newProduct.images.length + files.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    files.forEach(file => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct(prev => ({
            ...prev,
            images: [...prev.images, reader.result]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      className="glass-panel shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto text-[var(--cream-50)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-center text-3xl font-bold mb-6">
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
            className="mt-1 block w-full bg-[var(--navy-900)] border border-white/20 rounded-lg py-2 px-3 text-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40"
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
            className="mt-1 block w-full bg-[var(--navy-900)] border border-white/20 rounded-lg py-2 px-3 text-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40"
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
            <span className="absolute left-3 top-2.5 text-white/70 select-none">
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
              className="block w-full bg-[var(--navy-900)] border border-white/20 rounded-lg py-2 pl-12 pr-3 text-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40"
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
            className="mt-1 block w-full bg-[var(--navy-900)] border border-white/20 rounded-lg py-2 px-3 text-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40"
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-[#D1D5DB]">
              Images (Max 3)
            </label>
            <span className="text-sm text-[#D1D5DB]">
              {newProduct.images.length}/3
            </span>
          </div>
          
          {/* Preview Images */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {newProduct.images.map((image, index) => (
              <div key={index} className="relative bg-white/5 rounded-lg overflow-hidden flex items-center justify-center" style={{ aspectRatio: "3/4" }}>
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto'
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {newProduct.images.length < 3 && (
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="images"
                className="sr-only"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <label
                htmlFor="images"
                className="cursor-pointer bg-[var(--navy-900)] py-2 px-3 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white/10"
              >
                <Upload className="h-5 w-5 inline-block mr-2" />
                Upload Images
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 pill-button rounded-full text-sm font-semibold text-[var(--navy-900)] bg-[var(--accent-gold)] hover:bg-[#eab54a] disabled:opacity-50"
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
