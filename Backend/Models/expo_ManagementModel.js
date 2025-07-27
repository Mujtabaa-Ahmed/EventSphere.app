const mongoose = require("mongoose");


const expoEventSchema =  mongoose.Schema({
    title: {
    type: String, 
    required: true,
},
    date: {
    type: Date,
    required: true 
},
    location: {
    type: String,
    required: true,
},

    description: { 
    type: String,
    required:true
 },

    theme: {
    type: String,
    required:true,
    maxlength: 100
 }

});

const ExpoEvent = mongoose.model('expo_management', expoEventSchema);

module.exports = {
    ExpoEvent
}