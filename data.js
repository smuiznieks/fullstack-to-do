// This is from the mongodb documentation on npmjs.com
// https://www.npmjs.com/package/mongodb
import { MongoClient } from "mongodb";

// Connection URL
// const url = "mongodb://localhost:27017";
// const url = "mongodb://127.0.0.1:27017";
const url = "mongodb+srv://selga:d063NMIdf7mbSmmZ@cluster0.mw0ub5m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
// Database Name
const dbName = "to-do-list";
let db;
let collection;

async function connect() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(dbName);
  collection = db.collection("tasks");
  return "done.";
}

const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      collection.find({}).toArray(function(err, tasks){
        err ? reject(err) : resolve(tasks);
      })
    });
  })
}

const createTask = ({description, userId}) => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      collection.insertOne({
        userId,
        description,
        isComplete: false
      }).then(function(res) {
        resolve(res.insertedId.toString())
      }).catch(function(err) {
        reject(err)
      })
    })
  })
}

export { getAllTasks, createTask };
