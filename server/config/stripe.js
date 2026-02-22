const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// console.log("stripe", stripe);
module.exports = stripe;
