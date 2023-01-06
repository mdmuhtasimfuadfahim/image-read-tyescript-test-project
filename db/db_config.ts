import * as Mongoose from 'mongoose';

let db: Mongoose.Connection;

export const connectDB = () => {
    const uri: any = process.env.MONGODB_CONNECTION_URL;
    if(db) return;

    const mongoOptions: object = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    Mongoose.connect(uri, mongoOptions).then(() => {
        console.log('Connected to MongoDB');
    });
};

export const disconnect = () => {
    if (!db) return;
    Mongoose.disconnect();
};
