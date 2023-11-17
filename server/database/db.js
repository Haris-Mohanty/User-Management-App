import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(
      `Connected to MongoDb databse ${mongoose.connection.host}.`.bgBrightGreen
        .black
    );
  } catch (err) {
    console.log(`Mongodb Database error ${err}`.bgBrightRed.white);
    process.exit(1);
  }
};

export default connectDB;
