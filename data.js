// This is from the mongodb documentation on npmjs.com
// https://www.npmjs.com/package/mongodb
import { MongoClient } from "mongodb";

// Connection URL
// const url = "mongodb://localhost:27017";
// const url = "mongodb://127.0.0.1:27017";
const url =
  "mongodb+srv://admin:eDqx0OtJAdX4fqAQ@cluster0.e5srgl7.mongodb.net/admin?authSource=admin&replicaSet=atlas-1vq3so-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
const client = new MongoClient(url);
// Database Name
const dbName = "to-do-list";
let db;
let collection;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(dbName);
  collection = db.collection("tasks");

  // const insertResult = await collection.insertMany([
  //   { a: 11 },
  //   { a: 22 },
  //   { a: 33 },
  // ]);
  // console.log("Inserted documents =>", insertResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  // .finally(() => client.close());

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
