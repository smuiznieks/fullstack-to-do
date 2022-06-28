// This is from the mongodb documentation on npmjs.com
// https://www.npmjs.com/package/mongodb
import { MongoClient } from "mongodb";

// Connection URL
// const url = "mongodb://localhost:27017";
const url = "mongodb://127.0.0.1:27017";
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
  //   { a: 1 },
  //   { a: 2 },
  //   { a: 3 },
  // ]);
  // console.log("Inserted documents =>", insertResult);

  // return "done.";
}

main();
  // .then(console.log)
  // .catch(console.error)
  // .finally(() => client.close());

const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    collection.find({}).toArray(function(err, tasks){
      err ? reject(err) : resolve(tasks);
    })
  })
}

export default getAllTasks;
