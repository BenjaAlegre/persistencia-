import express from "express";
import fs from "fs/promises";

import {
  getUserById,
  getUsers,
  saveUser,
  patchInfo,
  updateUserById,
  deleteUser,
} from "./baseDeDatos.js";
import path from "path";
import { deleteTask, getTaskById, getTasks, saveTask, updateTaskById } from "./respository.js";
import { randomUUID } from "crypto";
const app = express();
const PORT = 3000;

const checkPermissions = (req, res, next) => {
  const { permitir } = req.headers;

  if (permitir != "true") return res.sendStatus(401);

  next();
};
const logRequest = (req, res, next) => {
  console.log(req.method, req.url);

  next();
};

app.use(logRequest);
app.use(express.json());

app.get("/tasks", async (req, res) => {

  try {
    const data = await getTasks();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Fail' });
  }
  
});

app.get("/tasks/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const data = await getTaskById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Fail' });
  }
  
});
 
app.post("/tasks", async (req, res) => {

  try {
    const { body } = req;
    console.log(body);

    //const newId= randomUUID();
 
    await saveTask(body, randomUUID());
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Fail' });
  } 
});

app.put("/tasks/:id", (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedTask = updateTaskById(id, newData);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Fail' });
  } 
  
});

app.delete("/tasks/:id", (req, res) => {

  try {
    const { id } = req.params;
    deleteTask(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Fail' });
  } 
  
});

app.get("/users", checkPermissions, (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);
  res.json(user);
});

app.post("/users", checkPermissions, async (req, res) => {
  const newUser = req.body;
  saveUser(newUser);
  res.send(newUser);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  updateUserById(id, newData);
  res.sendStatus(200);
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  patchInfo(id, newData);
  res.sendStatus(200);
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  deleteUser(id);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log("running!"));


//CRUD con tareas, con persistencia en archivos
//editar tareas, crear, logear el body
//fs.readFile("")
//autogenerar id por cada tarea randomUUID

