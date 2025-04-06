import admin from "./firebaseAdmin.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    
    console.log("🔍 Decoded Token:", decodedToken); // 🔍 Log full token data

    req.user = { firebaseUid: decodedToken.uid }; // ✅ Extract Firebase UID

    console.log("✅ Extracted firebaseUid:", req.user.firebaseUid);

    next();
  } catch (error) {
    console.error("❌ Invalid token:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
