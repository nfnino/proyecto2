const express = require("express");
const router = express.Router();

//const validateRoutineInput = require("../../../validation/routineValidator");

const Bath = require("../../../models/Routines/Bath");
const Fachada = require("../../../models/Routines/Fachada");
const Local = require("../../../models/Routines/Local");
const Pantalla = require("../../../models/Routines/Pantalla");
const Parking = require("../../../models/Routines/Parking");
const RCI = require("../../../models/Routines/RCI");
const Silleteria = require("../../../models/Routines/Silleteria");
const VIP = require("../../../models/Routines/VIP");


router.get("/routines", async (req,res) => {
    const baths = await Bath.find({});
    const fachadas = await Fachada.find({});
    const locals = await Local.find({});
    const pantallas = await Pantalla.find({});
    const parkings = await Parking.find({});
    const rcis = await RCI.find({});
    const silleterias = await Silleteria.find({});
    const vips = await VIP.find({});

    const routines = baths + fachadas + locals + pantallas + parkings + rcis + silleterias + vips

    res.status(200).json({
     data: routines
    });
})

router.get("/routines/:ejecutor/:supervisor", async (req,res) => {
    const ejecutor = req.params.ejecutor
    const supervisor = req.params.supervisor

    const baths = await Bath.find({ ejecutor: RegExp(ejecutor, "i"), supervisor: RegExp(supervisor, "i")});
    const fachadas = await Fachada.find({ ejecutor: RegExp(ejecutor, "i"), supervisor: RegExp(supervisor, "i")});
    const locals = await Local.find({ ejecutor: RegExp(ejecutor, "i"), supervisor: RegExp(supervisor, "i")});
    const pantallas = await Pantalla.find({ ejecutor: RegExp(ejecutor, "i"), supervisor: RegExp(supervisor, "i")});
    const parkings = await Parking.find({ ejecutor: RegExp(ejecutor, "i"), supervisor: RegExp(supervisor, "i")});
    const rcis = await RCI.find({ ejecutor: RegExp(ejecutor, "i"), supervisor: RegExp(supervisor, "i")});
    const silleterias = await Silleteria.find({ ejecutor: RegExp(ejecutor, "i"), supervisor: RegExp(supervisor, "i")});
    const vips = await VIP.find({ ejecutor: RegExp(ejecutor, "i"), supervisor: RegExp(supervisor, "i")});
    const routines = baths + fachadas + locals + pantallas + parkings + rcis + silleterias + vips
    res.status(200).json({
        data: routines
    });
  })

/* router.post("/newRoutine", async (req, res) => {

    const { errors, isValid } = validateRoutineInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    Routine.findOne({ejecutor: req.body.ejecutor}).then(routine => {
        console.log(routine)
        if(routine) {
            return res.status(400).json({ desc: "Ejecutor ya tiene una rutina asignada" });
        } else {
            const newRoutine = new Routine({
                fecha: req.body.fecha,
                ejecutor: req.body.ejecutor,
                supervisor: req.body.supervisor,
                espacio_vip: req.body.espacio_vip,
                espacio_local: req.body.espacio_local,
                espacio_banio: req.body.espacio_banio,
                espacio_parq: req.body.espacio_parq,
                espacio_fach: req.body.espacio_fach,
                espacio_pant: req.body.espacio_pant,
                espacio_rci: req.body.espacio_rci,
                estado: req.body.estado,
                observaciones: req.body.email_reporte,
                recinto: req.body.recinto
              });
              console.log(newRoutine)
        newRoutine
        .save()
        .then(routine => res.json(routine))
        }
    })
})

router.put("/updateRoutine/:id", async (req, res) => {
    const id = req.params.id
    const update = req.body
    Routine.findById(id).then(routine => {
        if(!routine) {
            return res.status(404).json({routinenotfound: "Rutina no existe"})
        }
    })
    try {
        let routine = await Routine.findByIdAndUpdate(id, update)
        res.status(200).json({
        data: routine,
        message: "Ha actualizado la rutina"
        })
    } catch (error) {
        next(error)
    }
}) */

module.exports = router;