import mongoose from "mongoose";

const connectMongoDB = () =>
    mongoose.connect(process.env.MONGODB_URI as string)
        .then(() => {
            console.log("Connection established!");
        })
        .catch((err) => {
            console.error(err);
        });

export default connectMongoDB;