import mongoose from "mongoose";

const connectToMongo = async () => {
    const res = await mongoose.connect("mongodb://localhost:27017/BLOGIFY");
    if (res) {
        console.log("connected sucessfully");
    }
};

export default connectToMongo;
