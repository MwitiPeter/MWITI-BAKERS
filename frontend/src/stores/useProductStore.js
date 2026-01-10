import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.error || "Failed to create product",
      });
      toast.error(error.response?.data?.error || "Failed to create product");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to fetch products",
        loading: false,
      });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/products/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to fetch products",
        loading: false,
      });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/products/${productId}`);
      // Update the products list by removing the deleted product
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.error || "Failed to delete product",
      });
      toast.error(error.response?.data?.error || "Failed to delete product");
    }
  },

  updateProduct: async (productId, productData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/products/${productId}`, productData);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId ? res.data : product
        ),
        loading: false,
      }));
      toast.success("Product updated successfully");
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.error || "Failed to update product",
      });
      toast.error(error.response?.data?.error || "Failed to update product");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.patch(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.error || "Failed to update product",
      });
      toast.error(error.response?.data?.error || "Failed to update product");
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.error || "Failed to fetch featured products",
        loading: false,
      });
      console.log("Error fetching featured products:", error);
    }
  },
}));
