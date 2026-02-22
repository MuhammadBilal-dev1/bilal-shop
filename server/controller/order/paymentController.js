const stripe = require("../../config/stripe.js");
const userModel = require("../../models/userModel.js");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    console.log("cartItems", cartItems);
    
    const user = await userModel.findOne({ _id: req.userId });

    console.log("user", user);

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      // shipping_options: [
      //   {
      //     shipping_rate: "shr_1T3NaNPVO39dBhyFEejPNEL0",
      //   },
      // ],
      customer_email: user.email,
      metadata: {
        userId: req.userId,
      },
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: item.productId.productName,
              images: [item.productId.productImage[0]],
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: Math.round(item.productId.sellingPrice * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    console.log("params", params);
    

    const session = await stripe.checkout.sessions.create(params);

    console.log("session", session);

    return res.status(200).json(session);
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
