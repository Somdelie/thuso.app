import { default as mongoose } from "mongoose";

const connectToDb = async () => {
  const connectionURL = process.env.NEXT_MONGODB_URL;
  mongoose
    .connect(connectionURL)
    .then(() => console.log("MongoDb connected successfully!"))
    .catch((error) => console.log(error));
};

export default connectToDb;
