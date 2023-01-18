import mongoose from "mongoose";

mongoose.set("strictQuery", true);

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ts", {});
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
}

export default connect;
