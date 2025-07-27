const { boothschema } = require('../Models/boothModel'); 


// Create: Booth create karna
const createBooth = async (req, res) => {
    try {
        const newBooth = new boothschema(req.body);
        await newBooth.save();
        res.status(201).json({ message: "Booth created successfully!", data: newBooth });
    } catch (error) {
        res.status(400).json({ message: "Error creating Booth", error: error.message });
    }
};

// Read: Sab Booths ko get karna
const getAllBooths = async (req, res) => {
    try {
        const booths = await boothschema.find().populate('ExpoID');  // Populate ExpoID here
        res.status(200).json({ message: "Booths fetched successfully!", data: booths });
    } catch (error) {
        res.status(400).json({ message: "Error fetching Booths", error: error.message });
    }
};

// Read: Specific Booth ko get karna by ID
const getBoothById = async (req, res) => {
    try {
        const booth = await boothschema.findById(req.params.id).populate('ExpoID');  // Populate ExpoID here
        if (!booth) {
            return res.status(404).json({ message: "Booth not found" });
        }
        res.status(200).json({ message: "Booth fetched successfully!", data: booth });
    } catch (error) {
        res.status(400).json({ message: "Error fetching Booth", error: error.message });
    }
};

// Update: Booth ko update karna by ID
const updateBooth = async (req, res) => {
    try {
        const updatedBooth = await boothschema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooth) {
            return res.status(404).json({ message: "Booth not found" });
        }
        res.status(200).json({ message: "Booth updated successfully!", data: updatedBooth });
    } catch (error) {
        res.status(400).json({ message: "Error updating Booth", error: error.message });
    }
};

// Delete: Booth ko delete karna by ID
const deleteBooth = async (req, res) => {
    try {
        const deletedBooth = await boothschema.findByIdAndDelete(req.params.id);
        if (!deletedBooth) {
            return res.status(404).json({ message: "Booth not found" });
        }
        res.status(200).json({ message: "Booth deleted successfully!", data: deletedBooth });
    } catch (error) {
        res.status(400).json({ message: "Error deleting Booth", error: error.message });
    }
};

module.exports = {
    createBooth,
    getAllBooths,
    getBoothById,
    updateBooth,
    deleteBooth
};
