const express = require("express");
const router = express.Router();

const validateRutLocales = require("../../../validation/routines/rutlocalesValidator");
const validateLocal = require("../../../validation/routines/localValidator");
const { Local, RutinaLocal } = require("../../../models/Routines/Local");

router.get("/", async (req,res) => {
    const rutinas = await RutinaLocal.find({});
    res.status(200).json({
     data: rutinas
    });
})

router.get("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const detalles = await Local.find({rutina: id});
        if(!detalles) return next(new Error("No existen"));
        res.status(200).json({
            data: detalles
        })
    }
    catch (e) {
        next(e);
    }
})

router.post("/newLocal", async (req, res) => {
    const { errors, isValid } = validateRutLocales(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newRoutine = new RutinaLocal({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor,
        supervisor: req.body.supervisor,
        observacion: req.body.observacion
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(rutinalocal => res.json(rutinalocal))
})

router.put("/updateLocal/:id", async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    update['fecha_fin'] = new Date();
    console.log(id)
    console.log(update)

    RutinaLocal.findById(id).then(test => {
        console.log(test)
        if(!test) {
            console.log("no existe")
            return res.status(404).json({msg: "Rutina no existe"})
        }
    })
    try {
        const temp = await RutinaLocal.findByIdAndUpdate(id, update)
        res.status(200).json({
            data: temp,
            message: "Rutina actualizada"
        });
    } catch(e) {
        console.log("catch")
        next(e)
    }
})

router.put("/newdetlocal", async (req, res) => {
    const { errors, isValid } = validateLocal(req.body);
    if (!isValid) {
        console.log("not valid")
        return res.status(400).json(errors);
    }

    let prueba = await Local.findOne({nombre: req.body.nombre, rutina: req.body.rutina})
    if(prueba) {
        console.log("ya existe")
        return res.status(400).json({msg:"Ya existe el detalle de la rutina"});
    }

    try {
        const newlocal = new Local({
            nombre: req.body.nombre,
            ubicacion: req.body.ubicacion,
            puertas: req.body.puertas,
            agua: req.body.agua,
            gas: req.body.gas,
            electricidad: req.body.electricidad,
            lamparas: req.body.lamparas,
            ventaneria: req.body.ventaneria,
            pasillos: req.body.pasillos,
            observacion: req.body.observacion,
            rutina: req.body.rutina,
        })
        console.log(newlocal)

        let update= {};
        update[req.body.nombre] = newlocal._id;

        let rutina = await RutinaLocal.findByIdAndUpdate(req.body.rutina, update)
        newlocal
        .save()

        res.status(200).json({
            data: rutina,
            message: "Rutina actualizada"
        });
        return;
    }
    catch(e) {
        console.log("catch")
        next(e)
    }
})

module.exports = router;