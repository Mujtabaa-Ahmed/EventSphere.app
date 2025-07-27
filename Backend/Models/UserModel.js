const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        UserRole: {
            type: String,
            required: true,
            default: 'Attendee', // Set 'Attendee' by default
        },
        Name: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
        },
        PhoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d{11}$/.test(v); // Only 11 digits allowed
                },
                message: 'Number is not valid', // Custom message if validation fails
            },
        },
        ProfilePic: {
            type: String,
            required: true,
            default: 'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg', // Default profile picture URL
        },
    }
);

const users = mongoose.model("users", userSchema);

module.exports = { users };
