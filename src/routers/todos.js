const express = require("express");
const Todos = require("./../models/todos");
const todoRouter = express.Router();

todoRouter.get("/all", async (req, res) => {
  const todos = await Todos.find();
  
  res.status(200).json({
    status: 200,
    data: todos,
  });
});

todoRouter.post("/new", async (req, res) => {
  const todo = new Todos({
    activityname: req.body.activityname,
    activitytime: req.body.activitytime,
    comment: req.body.comment,
  });

  try {
    const response = await todo.save();
    res.status(201).send({
      status: 200,
      data: response,
    });
  } catch (err) {
    res.send({
      status: 400,
      error: err,
    });
  }
});

todoRouter.patch("/:id", async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    todo.status = req.body.status;
    const resp = await todo.save();
    res.json(resp);
  } catch (err) {
    res.send({
      status: 500,
      errror: err,
    });
  }
});
todoRouter.delete("/remove/:id", async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    const resp = await todo.delete();
    res.json(resp);
  } catch (err) {
    res.send({
      status: 500,
      errror: err,
      
    });
  }
});

todoRouter.get("/pending", async(req, res) => {
    try {
        const todos = await Todos.find({status:"pending"});
        res.json(todos);
      } catch (err) {
        res.send({
          status: 500,
          errror: err,
        });
      }
});

todoRouter.get("/done", async(req, res) => {
    try {
        const todo = await Todos.find({status:"done"});
        res.json(todo);
      } catch (err) {
        res.send({
          status: 500,
          errror: err,
        });
      }
});

module.exports = todoRouter;
