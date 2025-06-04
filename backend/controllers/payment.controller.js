import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = product.price; // Use price in KES directly
      totalAmount += amount * product.quantity;

      return {
        name: product.name,
        image: product.image,
        price: amount,
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= (totalAmount * coupon.discountPercentage) / 100;
      }
    }

    // Create a "fake" session object since Stripe is not used
    const session = {
      id: "session_" + Math.random().toString(36).substring(2, 10),
      line_items: lineItems,
      total: totalAmount,
      userId: req.user._id.toString(),
      couponCode: couponCode || "",
      products,
    };

    if (totalAmount >= 20000) {
      await createNewCoupon(req.user._id);
    }

    res.status(200).json({ session, totalAmount });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({
      message: "Error processing checkout",
      error: error.message,
    });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { session } = req.body;

    if (session?.couponCode) {
      await Coupon.findOneAndUpdate(
        {
          code: session.couponCode,
          userId: session.userId,
        },
        {
          isActive: false,
        }
      );
    }

    const products = session.products;
    const newOrder = new Order({
      user: session.userId,
      products: products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: session.total,
      reference: session.id,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message:
        "Payment successful, order created, and coupon deactivated if used.",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    userId,
  });

  await newCoupon.save();
  return newCoupon;
}
