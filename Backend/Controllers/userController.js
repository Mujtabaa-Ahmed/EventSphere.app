const { users } = require('../Models/UserModel'); // User model import

// Create: Creating a new user
const createUser = async (req, res) => {
    try {
        const newUser = new users(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully!", data: newUser });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
};

// Read: Get all users
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find();
        res.status(200).json({ message: "Users fetched successfully!", data: allUsers });
    } catch (error) {
        res.status(400).json({ message: "Error fetching users", error: error.message });
    }
};

// Read: Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User fetched successfully!", data: user });
    } catch (error) {
        res.status(400).json({ message: "Error fetching user", error: error.message });
    }
};

// Update: Update user by ID
const updateUser = async (req, res) => {
    try {
        const updatedUser = await users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully!", data: updatedUser });
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error: error.message });
    }
};

// Delete: Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully!", data: deletedUser });
    } catch (error) {
        res.status(400).json({ message: "Error deleting user", error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
