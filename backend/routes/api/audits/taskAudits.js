const express = require("express");
const router = express.Router();

const TaskAudit = require("../../../models/Audit/TaskAudit");

router.get("/", async (req,res) => {
    const tasks = await TaskAudit.find({});
    res.status(200).json({
     data: tasks
    });
})

router.get(":id", async (req, res, next) => {
  try{
    const id = req.params.id
    const task = await TaskAudit.findById(id)
    console.log(task)
    if(!task) return next(new Error("No existe el activo"));
    res.status(200).json({
      data: task
    })
  } catch (error){
    next(error)
  }
})

module.exports = router;