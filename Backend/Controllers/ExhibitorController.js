const { ExhibitorUser } = require('../Models/ExhibitorModel');  // Exhibitor model import

// Create: Create a new Exhibitor
const createExhibitor = async (req, res) => {
    try {
        const newExhibitor = new ExhibitorUser(req.body);
        await newExhibitor.save();
        res.status(201).json({ message: "Exhibitor created successfully!", data: newExhibitor });
    } catch (error) {
        res.status(400).json({ message: "Error creating exhibitor", error: error.message });
    }
};

// Read: Get all Exhibitors and populate userID and boothID
const getAllExhibitors = async (req, res) => {
    try {
        const exhibitors = await ExhibitorUser.find()
            .populate('userID')  // Populate user details
            .populate('boothID'); // Populate booth details
        res.status(200).json({ message: "Exhibitors fetched successfully!", data: exhibitors });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error fetching exhibitors", error: error.message });
    }
};

// Read: Get Exhibitor by ID and populate userID and boothID
const getExhibitorById = async (req, res) => {
    try {
        const exhibitor = await ExhibitorUser.findById(req.params.id)
            .populate('userID')  // Populate user details
            .populate('boothID'); // Populate booth details
        if (!exhibitor) {
            return res.status(404).json({ message: "Exhibitor not found" });
        }
        res.status(200).json({ message: "Exhibitor fetched successfully!", data: exhibitor });
    } catch (error) {
        res.status(400).json({ message: "Error fetching exhibitor", error: error.message });
    }
};

// Update: Update Exhibitor by ID
const updateExhibitor = async (req, res) => {
    try {
        const updatedExhibitor = await ExhibitorUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExhibitor) {
            return res.status(404).json({ message: "Exhibitor not found" });
        }
        res.status(200).json({ message: "Exhibitor updated successfully!", data: updatedExhibitor });
    } catch (error) {
        res.status(400).json({ message: "Error updating exhibitor", error: error.message });
    }
};

// Delete: Delete Exhibitor by ID
const deleteExhibitor = async (req, res) => {
    try {
        const deletedExhibitor = await ExhibitorUser.findByIdAndDelete(req.params.id);
        if (!deletedExhibitor) {
            return res.status(404).json({ message: "Exhibitor not found" });
        }
        res.status(200).json({ message: "Exhibitor deleted successfully!", data: deletedExhibitor });
    } catch (error) {
        res.status(400).json({ message: "Error deleting exhibitor", error: error.message });
    }
};

module.exports = {
    createExhibitor,
    getAllExhibitors,
    getExhibitorById,
    updateExhibitor,
    deleteExhibitor
};
