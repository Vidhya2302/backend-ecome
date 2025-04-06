import express from "express";
import { createOrder, getUserOrders } from "../controlers/order.js";
import  {isAuth} from "../middleware/isAuth.js";

const router = express.Router();

router.post('/orders/created',isAuth,createOrder)
router.get('/orders',isAuth,getUserOrders)

export default router;
