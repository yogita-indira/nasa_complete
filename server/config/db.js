import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.DB_URL;

mongoose.connection.on('open', () => {
  console.log("Mongo Connection Ready");
});

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

export default connectToDatabase;
