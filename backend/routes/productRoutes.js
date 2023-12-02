import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productFilterController,
    productPhotoController,
    updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";


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

export default router