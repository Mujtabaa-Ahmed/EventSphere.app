const express = require("express");

const App = express();
const cors = require('cors'); 
require("dotenv").config();


// middleware
App.use(express.json());
App.use(express.urlencoded({extended:true}))
App.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from localhost:3000 (adjust if needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // You can allow other headers if needed
}));    

// Connection
const {DbConnection} = require("./Config/Db")



// requiring function from 'Booth Controller'
const {
    createBooth,
    getAllBooths,
    getBoothById,
    updateBooth,
    deleteBooth
} = require('./Controllers/boothController')

// Booth Routes
App.route("/booth")
    .get(getAllBooths)  // Get all booth
    .post(createBooth);  // Create a new booth

App.route("/booth/:id")
    .get(getBoothById)  // Get booth by ID
    .put(updateBooth)  // Update booth by ID
    .delete(deleteBooth);  // Delete booth by ID



// requiring function from 'Expo Management Controller'
const {
    createExpoEvent,
    getAllExpoEvents,
    getExpoEventById,
    updateExpoEvent,
    deleteExpoEvent
} = require('./Controllers/expoManagementController')

// Expo Management Routes
App.route("/expo")
.get(getAllExpoEvents)  // Get all expo
.post(createExpoEvent);  // Create a new expo

App.route("/expo/:id")
.get(getExpoEventById)  // Get expo by ID
.put(updateExpoEvent)  // Update expo by ID
.delete(deleteExpoEvent);  // Delete expo by ID



//requiring function from 'Session Controller'
const {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession
} = require('./Controllers/SessionController')

//Session Routes
App.route("/session")
.get(getAllSessions)  // Get all session
.post(createSession);  // Create a new session

App.route("/session/:id")
.get(getSessionById)  // Get session by ID
.put(updateSession)  // Update session by ID
.delete(deleteSession);  // Delete session by ID

// requiring function from 'Analytics Controller'
const {
    createAnalytics,
    getAllAnalytics,
    getAnalyticsById,
    updateAnalytics,
    deleteAnalytics
} = require('./Controllers/AnalyticsController')

//Analytics Routes
App.route("/analytics")
.get(getAllAnalytics)  // Get all analytics
.post(createAnalytics);  // Create a new analytics

App.route("/analytics/:id")
.get(getAnalyticsById)  // Get analytics by ID
.put(updateAnalytics)  // Update analytics by ID
.delete(deleteAnalytics);  // Delete analytics by ID


//requiring function from 'userController'
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('./Controllers/userController')

// user routes
App.route("/user")
.get(getAllUsers)  // Get all user
.post(createUser);  // Create a new user

App.route("/user/:id")
.get(getUserById)  // Get user by ID
.put(updateUser)  // Update user by ID
.delete(deleteUser);  // Delete user by ID


// requiring function from 'Feedback Controller'
const {
    createFeedBack,
    getAllFeedBacks,
    getFeedBackById,
    updateFeedBack,
    deleteFeedBack
} = require('./Controllers/FeedbackController')

// feedback routes
App.route("/feedback")
.get(getAllFeedBacks)  // Get all feedback
.post(createFeedBack);  // Create a new feedback

App.route("/feedback/:id")
.get(getFeedBackById)  // Get feedback by ID
.put(updateFeedBack)  // Update feedback by ID
.delete(deleteFeedBack);  // Delete feedback by ID


// requiring function from 'Message Controller'
const {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage
} = require('./Controllers/MessageController')

// message routes
App.route("/message")
.get(getAllMessages)  // Get all message
.post(createMessage);  // Create a new message

App.route("/message/:id")
.get(getMessageById)  // Get message by ID
.put(updateMessage)  // Update message by ID
.delete(deleteMessage);  // Delete message by ID




// requiring function from 'Exhibitor Controller'
const {
    createExhibitor,
    getAllExhibitors,
    getExhibitorById,
    updateExhibitor,
    deleteExhibitor
} = require('./Controllers/ExhibitorController')

// exhibitor routes
App.route("/exhibitor")
.get(getAllExhibitors)  // Get all exhibitor
.post(createExhibitor);  // Create a new exhibitor

App.route("/exhibitor/:id")
.get(getExhibitorById)  // Get exhibitor by ID
.put(updateExhibitor)  // Update exhibitor by ID
.delete(deleteExhibitor);  // Delete exhibitor by ID





// requiring function from 'Attendee Controller'
const {
    createAttendee,
    getAllAttendees,
    getAttendeeById,
    updateAttendee,
    deleteAttendee
} = require('./Controllers/AttendeeController')

// attendee routes
App.route("/attendee")
.get(getAllAttendees)  // Get all attendee
.post(createAttendee);  // Create a new attendee

App.route("/attendee/:id")
.get(getAttendeeById)  // Get attendee by ID
.put(updateAttendee)  // Update attendee by ID
.delete(deleteAttendee);  // Delete attendee by ID





// Checking Connection is running or not in console.
App.listen(process.env.PORT,function(){
    console.log(`Server is running on the PORT ${process.env.PORT}`)
    DbConnection();
})