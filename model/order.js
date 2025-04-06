import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: String, required: true }, // Firebase UID
    products: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String },
            quantity: { type: Number, required: true },
        },
    ],
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
