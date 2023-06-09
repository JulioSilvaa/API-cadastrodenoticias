import mongoose from "mongoose";

const connectDatabase = async () => {
  console.log("Connecting");

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.log(err));
};

export default connectDatabase;
