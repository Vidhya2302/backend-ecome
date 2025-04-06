import mongoose from "mongoose";
import { Product } from "../model/product.js";
import { unlink } from "fs/promises"; // Use promises for file deletion
import  APIFeatures  from '../controlers/apiFeatures.js';



export const createProduct = async (req, res) => {
    try {
        // Check if user is admin before proceeding
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized Access" });
        }

        const { title, description, category, price, stock, mrp,sold,offers,Details } = req.body;
        const image = req.file;

        if (!image) {
            return res.status(400).json({ message: "Please select an image" });
        }

        const product = await Product.create({
            title,
            description,
            category,
            price,
            image: `uploads/${image.filename}`, // Ensure correct path
            stock,
            mrp,
            sold,
            offers,
            Details 
        });

        return res.status(201).json({
            message: "Product details added successfully",
            product,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
};


export const fetchAllProduct = async (req, res) => {
    try {
        const resPerPage = 8; // Number of products per page
        const page = Number(req.query.page) || 1; // Default page number

        const ApiFeatures = new APIFeatures(Product.find(), req.query).search().filter();
        const productsQuery = ApiFeatures.query;

        // Apply pagination
        const products = await productsQuery.limit(resPerPage).skip((page - 1) * resPerPage);

      
        const totalProducts = await Product.countDocuments();

        // 🔹 Fetch related products for ALL categories on the current page
        const categories = [...new Set(products.map((product) => product.category))]; // Unique categories

        let relatedProducts = await Product.find({
            category: { $in: categories }, // Fetch from all categories
            _id: { $nin: products.map((product) => product._id) }, // Exclude already displayed products
        }).limit(8);

       // console.log("✅ Matching Products:", products.length);
        //console.log("✅ Related Products:", relatedProducts.length);

        return res.status(200).json({ 
            message: "List of products", 
            resPerPage, 
            currentPage: page,
            relatedProducts,
            totalPages: Math.ceil(totalProducts / resPerPage),
            products 
        });

    } catch (error) {
        console.error("❌ Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
};



export const fetchProductById = async (req, res) => {
    try {
       
        const  { id } = req.params;
        //console.log("Received ID:", id); // Debugging log
        const product = await Product.findById( id );


        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product found", product });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
}; 


export const fetchProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const resPerPage = 8;
        const page = Number(req.query.page) || 1;

        const products = await Product.find({ category: { $regex: new RegExp(category, "i") }  })
            .limit(resPerPage)
            .skip((page - 1) * resPerPage)
            .lean(); // Optimize performance

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        return res.status(200).json({ 
            message: "Products found in this category", 
            currentPage: page,
            products 
        });

    } catch (error) {
        console.error("❌ Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        // Check if user is admin before proceeding
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized Access" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Invalid product details" });
        }

        // Delete the image file
        try {
            await unlink(product.image);
            console.log("Image deleted successfully");
        } catch (err) {
            console.error("Failed to delete image:", err.message);
        }

        await product.deleteOne();
        return res.json({ message: "Product details deleted successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
