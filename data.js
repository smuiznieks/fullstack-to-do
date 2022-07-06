// This is from the mongodb documentation on npmjs.com
// https://www.npmjs.com/package/mongodb
import { MongoClient } from "mongodb";

// Connection URL
// const url = "mongodb://localhost:27017";
// const url = "mongodb://127.0.0.1:27017";
const url = "mongodb+srv://selga:03p8Fo1RUMLjslib@cluster0.mw0ub5m.mongodb.net/?retryWrites=true&w=majority";
const dbName = "to-do-list";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;
let collection;

const connectToServer = () => {
  client.connect(function (err, db) {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db("to-do-list");
    collection = dbConnection.collection("tasks");
    console.log("Successfully connected to MongoDB.");
  });
};

connectToServer();

const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    collection.find({}).toArray(function(err, tasks){
      err ? reject(err) : resolve(tasks);
    })
  })
}

const createTask = ({description, userId}) => {
  return new Promise((resolve, reject) => {
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
}

export { getAllTasks, createTask };
