const express = require("express");
const router = express.Router();
const userSignUpController = require("../controller/user/userSignUp.js");
const userSignInController = require("../controller/user/userSignIn.js");
const userDetailsController = require("../controller/user/userDetails.js");
const authToken = require("../middleware/authToke.js");
const userLogout = require("../controller/user/userLogout.js");
const allUsers = require("../controller/user/allUsers.js");
const updateUser = require("../controller/user/updateUser.js");
const UploadProductController = require("../controller/product/uploadProduct.js");
const getProductController = require("../controller/product/getProduct.js");
const updateProductController = require("../controller/product/updateProduct.js");
const getCategoryProduct = require("../controller/product/getOneCategoryProduct.js");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct.js");
const getProductDetails = require("../controller/product/getProductDetails.js");
const addToCartController = require("../controller/user/addToCartController.js");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct.js");
const ViewAddToCartProduct = require("../controller/user/ViewAddToCartProduct.js");
const updateAddToCardProduct = require("../controller/user/updateAddToCardProduct.js");
const deleteAddToCardProduct = require("../controller/user/deleteAddToCartProduct.js");
const searchProduct = require("../controller/product/searchProduct.js");
const filterProductController = require("../controller/product/filterProduct.js");
const paymentController = require("../controller/order/paymentController.js");
const orderController = require("../controller/order/order.controller.js");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout);

// Admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, ViewAddToCartProduct);
router.post("/update-cart-product", authToken, updateAddToCardProduct);
router.post("/delete-cart-product", authToken, deleteAddToCardProduct);

// payment and order
router.post("/checkout", authToken, paymentController);
router.get("/order-list", authToken, orderController);

module.exports = router;
