import Order from "../model/order.js";


export const createOrder = async (req, res) => {
    try {
        if (!req.user || !req.user.firebaseUid) { // ✅ Updated from `uid` to `firebaseUid`
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const { products } = req.body;
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "No products in order." });
        }

        const newOrder = new Order({
            user: req.user.firebaseUid, // ✅ Updated here
            products: products.map(({ name, price, image, quantity }) => ({
                name,
                price,
                image,
                quantity,
            })),
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getUserOrders = async (req, res) => {
    try {
        if (!req.user || !req.user.firebaseUid) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const orders = await Order.find({ user: req.user.firebaseUid });

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
