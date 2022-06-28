import express from "express";
import { Low, JSONFile } from "lowdb";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import getAllTasks from "./data.js";

const app = express();
app.use(express.static(path.join(path.resolve(), "build")));
app.use(cors());
app.use(express.json());

const port = process.env.port || 3001;

// Use JSON file for storage
const file = path.join(path.resolve(), "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
db.data ||= { users: [], tasks: [] }

// READ
app.get("/tasks", (req, res) => {
  // res.json(db.data.tasks);
  getAllTasks().then(result => {
    console.log(result);
    res.json(result);
  })
});

// CREATE 
app.post('/create', (req, res) => {
  let id = uuidv4();
  db.data.tasks.push({
    id,
    userId: req.body.userId,
    description: req.body.description,
    isComplete: false
  });
  db.write();
  res.json({id});
})

// DELETE
app.delete('/delete/:id', (req, res) => {
  db.data.tasks = db.data.tasks.filter((task) => task.id !== req.params.id);
  db.write();
  res.send('Task deleted');
});

// UPDATE DESCRIPTION
app.patch('/update/:id/:description', (req, res) => {
  let updatedTask = db.data.tasks.find((task) => task.id === req.params.id);
  updatedTask.description = req.params.description;
  db.write();
  res.send('Task updated!');
});

// UPDATE COMPLETE
app.patch("/complete/:id", (req, res) => {
  let updatedTask = db.data.tasks.find((task) => task.id === req.params.id);
  let isComplete = !updatedTask.isComplete;
  updatedTask.isComplete = isComplete;
  db.write();
  res.send("Task updated!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
