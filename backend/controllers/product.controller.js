import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // find all products
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    // Always fetch from MongoDB first to ensure we have the latest data
    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    // Update the Redis cache with the latest data
    if (featuredProducts.length === 0) {
      await redis.del("featured_products");
      return res.json([]);
    }

    // Store in redis for future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, category } = req.body;

    let cloudinaryResponses = [];

    if (images && images.length > 0) {
      if (images.length > 3) {
        return res
          .status(400)
          .json({ message: "Maximum 3 images allowed per product" });
      }

      // Upload each image to cloudinary
      for (const image of images) {
        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
        cloudinaryResponses.push(cloudinaryResponse.secure_url);
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      images: cloudinaryResponses,
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete all images from cloudinary
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        try {
          await cloudinary.uploader.destroy(`products/${publicId}`);
          console.log("deleted image from cloudinary");
        } catch (error) {
          console.log("error deleting image from cloudinary", error);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    // Update the featured products cache after deletion
    await updateFeaturedProductsCache();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const { category } = req.query; // Get category from query parameters
    
    const pipeline = [
      { $sample: { size: 4 } },
      { $project: { _id: 1, name: 1, description: 1, images: 1, price: 1 } },
    ];

    if (category) {
      pipeline.unshift({ $match: { category: category } }); // Add match stage if category is provided
    }

    const products = await Product.aggregate(pipeline);

    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category.toLowerCase() });
    res.json({ products });
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (featuredProducts.length === 0) {
      await redis.del("featured_products");
    } else {
      await redis.set("featured_products", JSON.stringify(featuredProducts));
    }
  } catch (error) {
    console.log("error in update cache function");
  }
}
