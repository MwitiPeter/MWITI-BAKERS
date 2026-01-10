import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const categories = [
  "Our Info",
  "Our Prices",
  "Bento&Cupcakes",
  "Buns & Scones",
  "Orange Cake",
  "Animated Design",
  "Ganache Cake",
  "Layered Cake",
];

const EditProductModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    category: product.category || "",
    images: product.images || [],
  });

  const [newImages, setNewImages] = useState([]);
  const { updateProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updateData = {
      ...formData,
      images: [...formData.images, ...newImages],
    };

    if (updateData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (updateData.images.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    try {
      await updateProduct(product._id, updateData);
      onClose();
    } catch (error) {
      console.log("error updating product", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    const totalImages = formData.images.length + newImages.length + files.length;
    if (totalImages > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    files.forEach((file) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        className="glass-panel shadow-2xl rounded-lg p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-[var(--cream-50)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#D1D5DB] mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-[var(--navy-800)] border border-white/10 rounded-md shadow-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#D1D5DB] mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-2 bg-[var(--navy-800)] border border-white/10 rounded-md shadow-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-transparent"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-[#D1D5DB] mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              step="0.01"
              className="w-full px-4 py-2 bg-[var(--navy-800)] border border-white/10 rounded-md shadow-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-transparent"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-[#D1D5DB] mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 bg-[var(--navy-800)] border border-white/10 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-transparent"
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

          {/* Existing Images */}
          {formData.images.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Current Images
              </label>
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images */}
          {newImages.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                New Images to Add
              </label>
              <div className="grid grid-cols-3 gap-4">
                {newImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`New ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Upload */}
          {formData.images.length + newImages.length < 3 && (
            <div>
              <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                Add Images ({formData.images.length + newImages.length}/3)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-white/10 rounded-md hover:border-[var(--accent-gold)] transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-white/40" />
                  <div className="flex text-sm text-white/60">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer rounded-md font-medium text-[var(--accent-gold)] hover:text-[#eab54a] focus-within:outline-none"
                    >
                      <span>Upload files</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white/40">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 pill-button bg-[var(--accent-gold)] text-[var(--navy-900)] font-semibold py-2 px-4 rounded-full transition-all duration-300 hover:-translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 pill-button bg-white/10 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProductModal;
