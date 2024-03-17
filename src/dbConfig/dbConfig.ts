  import mongoose from "mongoose";

  export async function connect()
  {
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () =>{
            console.log("mongoDb connection established");
        })
        connection.on("error", (err) =>{
            console.log("mongoDb connection error . please make sure mongoose is running "+  err);
            process.exit();
        })

    }catch(error){
        console.log("something went wrong")
        console.log(error);
    }
  }