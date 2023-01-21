"use strict";

var express = require("express");
const router = express();
const morgan = require("morgan");
const todos = require("../models/todos");
module.exports = router;

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan

router.use(morgan("tiny"));
router.use(express.json());

router.get("/", (req, res) => {
  const peopleList = todos.listPeople();
  res.status(200).send(peopleList);
});

router.get("/:name/tasks", (req, res) => {
  let taskList = todos.list(req.params.name);
  //si el usuaio no existe
  if (!taskList) res.status(404).send();
  // obtener el query
  let status = req.query["status"];
  // si solo quiero obtener las tasks completas
  if (status === "complete") {
    const filterTask = taskList.filter((task) => task.complete == true);
    res.status(200).send(filterTask);
    // si solo quiero obtener las tasks incompletas
  } else if (status === "active") {
    const filterTask = taskList.filter((task) => task.complete == false);
    res.status(200).send(filterTask);
  }
  //devuelve una lista con las tareas de cierto usuario
  else res.status(200).send(taskList);
});

router.post("/:name/tasks", (req, res) => {
  const task = req.body;
  const name = req.params.name;
  const keys = Object.keys(req.body);
  if (!keys.every((item) => item == "content" || item == "complete")) {
    res.status(400).send();
  } else {
    todos.add(name, task);
    res.status(201).send(task);
  }
});

router.put("/:name/tasks/:id", (req, res) => {
  const data = todos.complete(req.params.name, req.params.id);
  res.status(200).send(data);
});

router.delete("/:name/tasks/:id", (req, res) => {
  const data = todos.remove(req.params.name, req.params.id);
  res.status(204).send(data);
});
