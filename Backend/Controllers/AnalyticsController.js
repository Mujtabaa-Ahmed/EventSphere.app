const { Analytics } = require('../Models/AnalyticsModel');  // Analytics model import


// Create: Creating an Analytics entry
const createAnalytics = async (req, res) => {
    try {
        const newAnalytics = new Analytics(req.body);
        await newAnalytics.save();
        res.status(201).json({ message: "Analytics data created successfully!", data: newAnalytics });
    } catch (error) {
        res.status(400).json({ message: "Error creating Analytics data", error: error.message });
    }
};

// Read: Fetching all Analytics records and populating ExpoID
const getAllAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.find().populate('ExpoID');  // Populate ExpoID field
        res.status(200).json({ message: "Analytics fetched successfully!", data: analytics });
    } catch (error) {
        res.status(400).json({ message: "Error fetching Analytics", error: error.message });
    }
};

// Read: Fetching Analytics record by ID and populating ExpoID
const getAnalyticsById = async (req, res) => {
    try {
        const analytics = await Analytics.findById(req.params.id).populate('ExpoID');  // Populate ExpoID field
        if (!analytics) {
            return res.status(404).json({ message: "Analytics data not found" });
        }
        res.status(200).json({ message: "Analytics data fetched successfully!", data: analytics });
    } catch (error) {
        res.status(400).json({ message: "Error fetching Analytics data", error: error.message });
    }
};

// Update: Updating Analytics data by ID
const updateAnalytics = async (req, res) => {
    try {
        const updatedAnalytics = await Analytics.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnalytics) {
            return res.status(404).json({ message: "Analytics data not found" });
        }
        res.status(200).json({ message: "Analytics data updated successfully!", data: updatedAnalytics });
    } catch (error) {
        res.status(400).json({ message: "Error updating Analytics data", error: error.message });
    }
};

// Delete: Deleting Analytics data by ID
const deleteAnalytics = async (req, res) => {
    try {
        const deletedAnalytics = await Analytics.findByIdAndDelete(req.params.id);
        if (!deletedAnalytics) {
            return res.status(404).json({ message: "Analytics data not found" });
        }
        res.status(200).json({ message: "Analytics data deleted successfully!", data: deletedAnalytics });
    } catch (error) {
        res.status(400).json({ message: "Error deleting Analytics data", error: error.message });
    }
};

module.exports = {
    createAnalytics,
    getAllAnalytics,
    getAnalyticsById,
    updateAnalytics,
    deleteAnalytics
};
