import formidable from "express-formidable";
import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFilterController,
    productListController,
    productPhotoController,
    relatedProductController,
    serchProductController,
    updateProductController } from "../controllers/productController.js";


const router = express.Router();


//Created Product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//Update Product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//Get product
router.get('/get-product', getProductController);

//Get single product
router.get("/get-product/:slug", getSingleProductController);

//Get photo
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete("/delete-product/:pid", deleteProductController);

//Filter Product
router.post('/product-filter', productFilterController)

//product count
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page', productListController)

//Product Serch
router.get("/search/:keyword", serchProductController)

//simler Product
router.get('/related-product/:pid/:cid', relatedProductController)

//Categoris wise Product
router.get('/product-category/:slug', productCategoryController)

//Payment routes
//token
router.get('/braintree/token', braintreeTokenController)

//Payment
router.post('/braintree/payment', requireSignIn, brainTreePaymentController)

export default router