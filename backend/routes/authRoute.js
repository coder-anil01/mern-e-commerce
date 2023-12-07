import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forget Password
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

// Procted user route auth
router.get('/user-auth', requireSignIn, (req, res)=>{
  res.status(200).send({ok: true});
});

// Procted admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res)=>{
  res.status(200).send({ok: true});
});

//Update Profile
router.put('/profile', requireSignIn, updateProfileController)

// order Routes
router.get('/orders', requireSignIn, getOrderController)

// all order Routes
router.get('/all-orders', getAllOrderController)

// order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);

export default router;
