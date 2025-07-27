const mongoose = require("mongoose");

const sessionModelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    Speaker: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,    
    },
    StartTime: {
        type: Date,
        required: true,
        
    },
    EndTime: {
        type: Date,
        required: true,
    },
    ExpoID:[ {
        type: mongoose.Schema.ObjectId,
        ref: 'expo_management',
        required: true
    }]
});

const Session = mongoose.model('Session', sessionModelSchema);

module.exports = {
    Session
};
