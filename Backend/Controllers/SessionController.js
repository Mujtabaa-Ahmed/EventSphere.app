const { Session } = require('../Models/SessionModel'); // Importing Session model

// Create: Session create karna
const createSession = async (req, res) => {
    try {
        const newSession = new Session(req.body);
        await newSession.save();
        res.status(201).json({ message: "Session created successfully!", data: newSession });
    } catch (error) {
        res.status(400).json({ message: "Error creating Session", error: error.message });
    }
};

// Read: Sab Sessions ko get karna
const getAllSessions = async (req, res) => {
    try {
        // Populate 'ExpoID' to fetch related Expo management data
        const sessions = await Session.find().populate('ExpoID');
        res.status(200).json({ message: "Sessions fetched successfully!", data: sessions });
    } catch (error) {
        res.status(400).json({ message: "Error fetching Sessions", error: error.message });
    }
};

// Read: Specific Session ko get karna by ID
const getSessionById = async (req, res) => {
    try {
        // Populate 'ExpoID' to fetch related Expo management data
        const session = await Session.findById(req.params.id).populate('ExpoID');
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        res.status(200).json({ message: "Session fetched successfully!", data: session });
    } catch (error) {
        res.status(400).json({ message: "Error fetching Session", error: error.message });
    }
};

// Update: Session ko update karna by ID
const updateSession = async (req, res) => {
    try {
        const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSession) {
            return res.status(404).json({ message: "Session not found" });
        }
        res.status(200).json({ message: "Session updated successfully!", data: updatedSession });
    } catch (error) {
        res.status(400).json({ message: "Error updating Session", error: error.message });
    }
};

// Delete: Session ko delete karna by ID
const deleteSession = async (req, res) => {
    try {
        const deletedSession = await Session.findByIdAndDelete(req.params.id);
        if (!deletedSession) {
            return res.status(404).json({ message: "Session not found" });
        }
        res.status(200).json({ message: "Session deleted successfully!", data: deletedSession });
    } catch (error) {
        res.status(400).json({ message: "Error deleting Session", error: error.message });
    }
};

module.exports = {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession
};
