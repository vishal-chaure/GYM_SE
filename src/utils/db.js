import mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    console.log("MongoDB URL:", process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Mongo Connection successfully established.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;