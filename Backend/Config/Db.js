const mongoose = require("mongoose");




async function DbConnection(){
   
    const connectionDB = await mongoose.connect(process.env.MONGODB_URI)
    if(connectionDB)  console.log("MONGO DB ATLAS IS CONNECTED SUCCESSFULLY")

    }


module.exports = {DbConnection}
