const mongoose = require("mongoose");

const AttendeeSchema = mongoose.Schema(
    {
        
        Interests:{ 
            type: String,
            required: true,
        },
        
        RegisteredSession:{
            type: String,
            required:true 
        },
        userID: [{
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
        }],
    }
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);

module.exports = { Attendee };
