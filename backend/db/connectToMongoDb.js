import mongoose from "mongoose";


const mongooseConnection = async () =>{

   try {

    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected to Mongo DB");
    
   } catch (error) {
    console.log("error connecting to mongo DB",error.message)
   }
    
}


export default mongooseConnection;