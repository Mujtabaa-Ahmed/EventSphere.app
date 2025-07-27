const { ExpoEvent } = require('../Models/expo_ManagementModel'); // ExpoEvent model import


// Create: Creating ExpoEvent
const createExpoEvent = async (req, res) => {
    try {
        const newExpoEvent = new ExpoEvent(req.body);
        await newExpoEvent.save();
        res.status(201).json({ message: "ExpoEvent created successfully!", data: newExpoEvent });
    } catch (error) {
        res.status(400).json({ message: "Error creating ExpoEvent", error: error.message });
    }
};

// Read: Getting All Record of ExpoEvent
const getAllExpoEvents = async (req, res) => {
    try {
        const expoEvents = await ExpoEvent.find();
        res.status(200).json({ message: "ExpoEvents fetched successfully!", data: expoEvents });
    } catch (error) {
        res.status(400).json({ message: "Error fetching ExpoEvents", error: error.message });
    }
};

// Read: Getting ExpoEvent Record by ID
const getExpoEventById = async (req, res) => {
    try {
        const expoEvent = await ExpoEvent.findById(req.params.id);
        if (!expoEvent) {
            return res.status(404).json({ message: "ExpoEvent not found" });
        }
        res.status(200).json({ message: "ExpoEvent fetched successfully!", data: expoEvent });
    } catch (error) {
        res.status(400).json({ message: "Error fetching ExpoEvent", error: error.message });
    }
};

// Update: Updating ExpoEvent by ID
const updateExpoEvent = async (req, res) => {
    try {
        const updatedExpoEvent = await ExpoEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExpoEvent) {
            return res.status(404).json({ message: "ExpoEvent not found" });
        }
        res.status(200).json({ message: "ExpoEvent updated successfully!", data: updatedExpoEvent });
    } catch (error) {
        res.status(400).json({ message: "Error updating ExpoEvent", error: error.message });
    }
};

// Delete: Deleteing ExpoEvent by ID
const deleteExpoEvent = async (req, res) => {
    try {
        const deletedExpoEvent = await ExpoEvent.findByIdAndDelete(req.params.id);
        if (!deletedExpoEvent) {
            return res.status(404).json({ message: "ExpoEvent not found" });
        }
        res.status(200).json({ message: "ExpoEvent deleted successfully!", data: deletedExpoEvent });
    } catch (error) {
        res.status(400).json({ message: "Error deleting ExpoEvent", error: error.message });
    }
};

module.exports = {
    createExpoEvent,
    getAllExpoEvents,
    getExpoEventById,
    updateExpoEvent,
    deleteExpoEvent
}