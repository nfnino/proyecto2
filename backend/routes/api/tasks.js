const express = require("express");
const router = express.Router();

const validateTaskInput = require("../../validation/taskValidator");
const roomForAct = require("../../validation/roomForAct");
const sendEmail = require("../../util/email");

const Task = require("../../models/Task");
const Asset = require("../../models/Asset");

const TaskAudit = require("../../models/Audit/TaskAudit");

router.get("/tasks", async (req,res) => {
    const tasks = await Task.find({});
    res.status(200).json({
     data: tasks
    });
})

router.get("/tasks/:activo/:tipo/:descripcion", async (req,res) => {
  const activo = req.params.activo
  const tipo = req.params.tipo
  const descripcion = req.params.descripcion
  const tasks = await Task.find({activo: RegExp(activo, "i"), tipo_mant: RegExp(tipo, "i"), desc_falla: RegExp(descripcion, "i")});
  res.status(200).json({
    data: tasks
  });
})

router.get("/tasks/:id", async (req, res, next) => {
    try{
      const id = req.params.id
      const task = await Task.findById(id)
      console.log(asset)
      if(!task) return next(new Error("No existe la tarea"));
      res.status(200).json({
        data: task
      })
    } catch (error){
      next(error)
    }
  })

router.post("/newTask", async (req, res) => {

  const { errors, isValid } = validateTaskInput(req.body);
  console.log(isValid)
  console.log(errors)
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  Asset.findOne({nombre: req.body.activo}).then(asset => {

    const { errors, isv} = roomForAct(asset)
    console.log(isv)
    console.log(errors)
    if (!isv) {
        return res.status(400).json(errors);
    } else {
            const newTask = new Task({
                activo: req.body.activo,
                tipo_mant: req.body.tipo_mant,
                fecha_inicial_tent: req.body.fecha_inicial_tent,
                fecha_final_tent: req.body.fecha_final_tent,
                imagen_antes_mant: req.body.imagen_antes_mant,
                desc_falla: req.body.desc_falla,
                email_compras: req.body.email_compras,
                desc_materiales_compras: req.body.desc_materiales_compras,
                ejecutor_interno: req.body.ejecutor_interno,
                supervisor: req.body.supervisor,
                nit_empresa_externa: req.body.nit_empresa_externa,
                nombre_empresa_externa: req.body.nombre_empresa_externa,
                doc_orden_compra: req.body.doc_orden_compra,
                valor_externo: req.body.valor_externo,
                fecha_inicial_real: req.body.fecha_inicial_real,
                fecha_final_real: req.body.fecha_final_real,
                responsable: req.body.responsable,
                estado: req.body.estado,
              });
        const id_activo = asset._id;
        const nuevastareas = asset.tareas_activas+1;
        try {
          Asset.findByIdAndUpdate(id_activo, {tareas_activas: nuevastareas}, function(err,r) {
            if(err) {
              console.log("err: ", err)
            } else {
              console.log("result: ", r)
            }
          })
        } catch {
          error: console.log(error)
        }

        if(newTask.email_compras !== "" && newTask.desc_materiales_compras !== "") {
          try{
            sendEmail.enviarEmailCompras(req.body.usuario, newTask.activo, newTask.email_compras, newTask.desc_materiales_compras);
          } catch(e) {
            return res.status(400);
          }
        }
        console.log(newTask)

        const audit = { task_id:newTask._id, task_asset:newTask.activo, task_type: newTask.tipo_mant, action:"CREATE", user_id: req.body.user_id, user_name: req.body.usuario, date: new Date()}
        const newaudit = new TaskAudit(audit);

        newTask
        .save()
        .then(newaudit.save())
        .then(task => res.json(task))
        }
    })
})

router.put("/tasks/:id/:estado", async (req, res, next) => {
  const id = req.params.id
  const update = req.params.estado
  const u = update+""
  Task.findById(id).then(task => {
    if(!task) {
      return res.status(404).json({tasknotfound: "Actividad no existe"})
    }
  })
  try {
    let task = await Task.findByIdAndUpdate(id, {estado: u})

    const audit = { task_id: id, task_asset:task.activo, task_type: task.tipo_mant, action:"DELETE", user_id: req.body.user_id, user_name: req.body.user_name, date: new Date()}
    const newaudit = new TaskAudit(audit);
    newaudit
    .save()

    res.status(200).json({
      data: task,
      message: "Ha actualizado el estado de la actividad"
    })
  } catch (error) {
    next(error)
  }
})

router.put('/taskImage/:id/:date', async (req, res, next) => {
  const id = req.params.id;
  const date = req.params.date;
  if(req.files === null){
    return res.status(400).json({ msg: 'No se cargó ninguna imagen' })
  }
  const file = req.files.file;
  const file2 = req.files.file2;
  console.log(file)
  file.mv(`../public/uploads/${file.name}`, err => {
    if(err) {
      console.log(err);
      return res.status(500).send(err);
    }
  })
  console.log(file2)
  file.mv(`../public/uploads/${file2.name}`, err => {
    if(err) {
      console.log(err);
      return res.status(500).send(err);
    }
  })
  try {
    const update = {
      imagen_antes_mant : `/uploads/${file.name}`,
      imagen_despu_mant : `/uploads/${file.name}`,
      fecha_inicial_real: date,
      fecha_final_real : new Date(),
      estado: "Cerrada"
    }
    let task = await Task.findByIdAndUpdate(id, update)
    res.status(200).json({
      data: task,
      message: "Ha actualizado la tarea"
    }) 
  } catch (error) {
    console.log(error)
  }
})

router.put('/update/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const update = req.body
    let task = await Task.findByIdAndUpdate(id, update)

    const audit = { task_id: id, task_asset: task.activo, task_type: task.tipo_mant, action:"UPDATE", user_id: req.body.user_id, user_name: req.body.user_name, date: new Date()}
    const newaudit = new TaskAudit(audit);
    newaudit
    .save()

    res.status(200).json({
      data: task,
      message: "Ha actualizado la tarea"
    }) 
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;