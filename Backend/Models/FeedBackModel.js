const mongoose = require("mongoose");

const FeedBackSchema = mongoose.Schema({
    Content: {
        type: String, 
        required: true,
    },
    TimeStamp: {
        type: Date,   
        required: true
    },
    userID: [{
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    }],
    expoID: [{
        type: mongoose.Schema.ObjectId,
        ref: 'expo_management',
        required: true
    }],
    
});

const FeedBack = mongoose.model('FeedBack', FeedBackSchema);

module.exports = {
    FeedBack
};
