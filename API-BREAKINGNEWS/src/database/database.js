import mongoose from "mongoose";

const connectDataBase = () => {
  console.log("wait connecting to the database");
 

  mongoose
    .connect( process.env.MONGODB_URI,
      
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB atlas Connected"))
    .catch((error) => console.log(error));
};

export default connectDataBase;
