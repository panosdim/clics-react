import {RemoteMongoClient, Stitch} from "mongodb-stitch-browser-sdk";

const APP_ID = process.env.REACT_APP_MONGODB_APP_ID;

// 1. Initialize the app client
const app = Stitch.initializeAppClient(APP_ID);

// 2. Instantiate a RemoteMongoClient client and create a RemoteMongoDatabase object
//    for the 'clics' collection.
const db = app
    .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
    .db("clics");

// 3. Create a RemoteMongoCollection for the `items` collection.
let items = db.collection("items");

export {app, items};
