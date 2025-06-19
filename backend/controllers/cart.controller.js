import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getCartProducts = async (req, res) => {
  try {
    // Filter out any old string entries in cartItems
    req.user.cartItems = req.user.cartItems.filter(item => typeof item === 'object' && item.product);
    await req.user.save();
    // Populate product details for each cart item
    await req.user.populate({
      path: "cartItems.product",
      model: "Product"
    });
    const cartItems = req.user.cartItems
      .filter(item => item.product && typeof item.product.toJSON === 'function')
      .map((item) => {
        return {
          ...item.product.toJSON(),
          quantity: item.quantity
        };
      });
    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid or missing productId" });
    }
    const user = req.user;
    // Filter out any old string entries in cartItems
    user.cartItems = user.cartItems.filter(item => typeof item === 'object' && item.product);
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    // Filter out any old string entries in cartItems
    user.cartItems = user.cartItems.filter(item => typeof item === 'object' && item.product);
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    // Filter out any old string entries in cartItems
    user.cartItems = user.cartItems.filter(item => typeof item === 'object' && item.product);
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item.product.toString() !== productId
        );
        await user.save();
        return res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
