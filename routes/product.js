import express from "express";
import { uploadFiles } from "../middleware/multer.js";
import { 
    createProduct, 
    deleteProduct, 
    fetchAllProduct, 
    fetchProductByCategory, 
    fetchProductById
} from "../controlers/product.js";

const router = express.Router();

// Product Routes
router.post('/products',uploadFiles, createProduct);
router.get('/products', fetchAllProduct); 
router.get('/product/:id', fetchProductById); 
router.get('/products/:category',fetchProductByCategory)
router.delete('/products/:id', deleteProduct); 

export default router;
