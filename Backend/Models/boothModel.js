const mongoose = require("mongoose");

const Booth_Schema = mongoose.Schema(
    {
        ExpoID: [{
            type: mongoose.Schema.ObjectId,
            ref: 'expo_management',
            required: true
        }],
        boothNumber:
         { type: String,
         required: true,
         maxlength: 10 },

        size: 
        { type: String, 
        required:true,
        maxlength: 50 },

        status:
         { type: String, 
        required:true,

         }
    }
);

const boothschema = mongoose.model("booths", Booth_Schema);

module.exports = { boothschema };
