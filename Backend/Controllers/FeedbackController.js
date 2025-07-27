const { FeedBack } = require('../Models/FeedBackModel'); // FeedBack model import

// Create: Create a new Feedback
const createFeedBack = async (req, res) => {
    try {
        const newFeedBack = new FeedBack(req.body);
        await newFeedBack.save();
        res.status(201).json({ message: "Feedback created successfully!", data: newFeedBack });
    } catch (error) {
        res.status(400).json({ message: "Error creating feedback", error: error.message });
    }
};

// Read: Get all Feedbacks and populate user and expo information
const getAllFeedBacks = async (req, res) => {
    try {
        const allFeedbacks = await FeedBack.find()
            .populate('userID')  // Populate user details
            .populate('expoID'); // Populate expo details
        res.status(200).json({ message: "Feedbacks fetched successfully!", data: allFeedbacks });
    } catch (error) {
        res.status(400).json({ message: "Error fetching feedbacks", error: error.message });
    }
};

// Read: Get Feedback by ID and populate user and expo information
const getFeedBackById = async (req, res) => {
    try {
        const feedBack = await FeedBack.findById(req.params.id)
            .populate('userID')  // Populate user details
            .populate('expoID'); // Populate expo details
        if (!feedBack) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json({ message: "Feedback fetched successfully!", data: feedBack });
    } catch (error) {
        res.status(400).json({ message: "Error fetching feedback", error: error.message });
    }
};

// Update: Update Feedback by ID
const updateFeedBack = async (req, res) => {
    try {
        const updatedFeedBack = await FeedBack.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFeedBack) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json({ message: "Feedback updated successfully!", data: updatedFeedBack });
    } catch (error) {
        res.status(400).json({ message: "Error updating feedback", error: error.message });
    }
};

// Delete: Delete Feedback by ID
const deleteFeedBack = async (req, res) => {
    try {
        const deletedFeedBack = await FeedBack.findByIdAndDelete(req.params.id);
        if (!deletedFeedBack) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json({ message: "Feedback deleted successfully!", data: deletedFeedBack });
    } catch (error) {
        res.status(400).json({ message: "Error deleting feedback", error: error.message });
    }
};

module.exports = {
    createFeedBack,
    getAllFeedBacks,
    getFeedBackById,
    updateFeedBack,
    deleteFeedBack
};
