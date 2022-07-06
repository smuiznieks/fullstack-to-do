import express from "express";
import { Low, JSONFile } from "lowdb";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { getAllTasks, createTask } from "./data.js";

const app = express();
app.use(express.static(path.join(path.resolve(), "build")));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
console.log(port);


// Use JSON file for storage
// const file = path.join(path.resolve(), "db.json");
// const adapter = new JSONFile(file);
// const db = new Low(adapter);

// await db.read();
// db.data ||= { users: [], tasks: [] }

// READ
app.get("/tasks", (req, res) => {
  // res.json(db.data.tasks);
  getAllTasks().then(result => {
    let transformResults = result.map(({_id, userId, description, isComplete}) => {
      return {
        id: _id.toString(),
        userId,
        description,
        isComplete
      }
    })
    console.log(transformResults);
    res.json(transformResults);
  })
});

// CREATE 
app.post('/create', (req, res) => {
  createTask(req.body).then(id => {
    res.json({id});
  });
  // let id = uuidv4();
  // db.data.tasks.push({
  //   id,
  //   userId: req.body.userId,
  //   description: req.body.description,
  //   isComplete: false
  // });
  // db.write();
  // res.json({id});
})

// DELETE
app.delete('/delete/:id', (req, res) => {
  // deleteTask(req.params.id).then(() => {
  //   res.send('Task deleted')
  // })
  // db.data.tasks = db.data.tasks.filter((task) => task.id !== req.params.id);
  // db.write();
  // res.send('Task deleted');
});

// UPDATE DESCRIPTION
app.patch('/update/:id/:description', (req, res) => {
  // let updatedTask = db.data.tasks.find((task) => task.id === req.params.id);
  // updatedTask.description = req.params.description;
  // db.write();
  // res.send('Task updated!');
});

// UPDATE COMPLETE
app.patch("/complete/:id", (req, res) => {
  // let updatedTask = db.data.tasks.find((task) => task.id === req.params.id);
  // let isComplete = !updatedTask.isComplete;
  // updatedTask.isComplete = isComplete;
  // db.write();
  // res.send("Task updated!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
