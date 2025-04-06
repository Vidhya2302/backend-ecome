import  User  from "../model/User.js";
export const saveUserDetails = async (req, res) => {
  try {
    const { firebaseUid, name, email, contact, address, role } = req.body;

    if (!firebaseUid) {
      return res.status(400).json({ message: "Firebase UID is required" });
    }

    let user = await User.findOneAndUpdate(
      { firebaseUid },
      { name, email, contact, address, role }, 
      { new: true, upsert: true } // Creates if not found
    );

    return res.status(200).json({ message: "User details saved successfully", user });
  } catch (error) {
    console.error("Error saving user details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


  export const getUserProfile = async (req, res) => {
    try {
      const { firebaseUid } = req.user;
  
      console.log("Searching for user with firebaseUid:", firebaseUid); // 🔍 Debugging log
  
      const user = await User.findOne({ firebaseUid }).select("-_id -__v");
      
      if (!user) {
        console.log("User not found in DB for firebaseUid:", firebaseUid); // 🔍 Log error
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const updateUserProfile = async (req, res) => {
    try {
      const { contact, address, role } = req.body;
      const { firebaseUid } = req.user; // Extracted from token
  
      let user = await User.findOne({ firebaseUid });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update only the provided fields
      if (contact) user.contact = contact;
      if (address) user.address = address;
      if (role) user.role = role; // Only update role if necessary
  
      await user.save();
  
      return res.status(200).json({ message: "User profile updated successfully", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  