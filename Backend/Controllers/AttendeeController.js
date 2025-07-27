const { Attendee } = require('../Models/AttendeeModel');  // Attendee model import

// Create: Create a new Attendee
const createAttendee = async (req, res) => {
    try {
        const newAttendee = new Attendee(req.body);
        await newAttendee.save();
        res.status(201).json({ message: "Attendee created successfully!", data: newAttendee });
    } catch (error) {
        res.status(400).json({ message: "Error creating attendee", error: error.message });
    }
};

// Read: Get all Attendees and populate userID
const getAllAttendees = async (req, res) => {
    try {
        const attendees = await Attendee.find()
            .populate('userID');  // Populate user details
        res.status(200).json({ message: "Attendees fetched successfully!", data: attendees });
    } catch (error) {
        res.status(400).json({ message: "Error fetching attendees", error: error.message });
    }
};

// Read: Get Attendee by ID and populate userID
const getAttendeeById = async (req, res) => {
    try {
        const attendee = await Attendee.findById(req.params.id)
            .populate('userID');  // Populate user details
        if (!attendee) {
            return res.status(404).json({ message: "Attendee not found" });
        }
        res.status(200).json({ message: "Attendee fetched successfully!", data: attendee });
    } catch (error) {
        res.status(400).json({ message: "Error fetching attendee", error: error.message });
    }
};

// Update: Update Attendee by ID
const updateAttendee = async (req, res) => {
    try {
        const updatedAttendee = await Attendee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAttendee) {
            return res.status(404).json({ message: "Attendee not found" });
        }
        res.status(200).json({ message: "Attendee updated successfully!", data: updatedAttendee });
    } catch (error) {
        res.status(400).json({ message: "Error updating attendee", error: error.message });
    }
};

// Delete: Delete Attendee by ID
const deleteAttendee = async (req, res) => {
    try {
        const deletedAttendee = await Attendee.findByIdAndDelete(req.params.id);
        if (!deletedAttendee) {
            return res.status(404).json({ message: "Attendee not found" });
        }
        res.status(200).json({ message: "Attendee deleted successfully!", data: deletedAttendee });
    } catch (error) {
        res.status(400).json({ message: "Error deleting attendee", error: error.message });
    }
};

module.exports = {
    createAttendee,
    getAllAttendees,
    getAttendeeById,
    updateAttendee,
    deleteAttendee
};
