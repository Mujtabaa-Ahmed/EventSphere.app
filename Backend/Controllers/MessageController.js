const { Messages } = require('../Models/MessageModel'); // Messages model import

// Create: Create a new Message
const createMessage = async (req, res) => {
    try {
        const newMessage = new Messages(req.body);
        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully!", data: newMessage });
    } catch (error) {
        res.status(400).json({ message: "Error sending message", error: error.message });
    }
};

// Read: Get all Messages and populate sender and receiver details
const getAllMessages = async (req, res) => {
    try {
        const allMessages = await Messages.find()
            .populate('SenderID')  // Populate sender details
            .populate('ReceiverID'); // Populate receiver details
        res.status(200).json({ message: "Messages fetched successfully!", data: allMessages });
    } catch (error) {
        res.status(400).json({ message: "Error fetching messages", error: error.message });
    }
};

// Read: Get Message by ID and populate sender and receiver details
const getMessageById = async (req, res) => {
    try {
        const message = await Messages.findById(req.params.id)
            .populate('SenderID')  // Populate sender details
            .populate('ReceiverID'); // Populate receiver details
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message fetched successfully!", data: message });
    } catch (error) {
        res.status(400).json({ message: "Error fetching message", error: error.message });
    }
};

// Update: Update Message by ID
const updateMessage = async (req, res) => {
    try {
        const updatedMessage = await Messages.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message updated successfully!", data: updatedMessage });
    } catch (error) {
        res.status(400).json({ message: "Error updating message", error: error.message });
    }
};

// Delete: Delete Message by ID
const deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await Messages.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully!", data: deletedMessage });
    } catch (error) {
        res.status(400).json({ message: "Error deleting message", error: error.message });
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage
};
