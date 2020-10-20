const express = require("express");
const router = express.Router();

const validateRCI = require("../../../validation/routines/rciValidator");
const validateGabinete = require("../../../validation/routines/gabineteValidator");
const { Gabinete, RCI } = require("../../../models/Routines/RCI");

router.get("/", async (req,res) => {
    const rcis = await RCI.find({});
    res.status(200).json({
     data: rcis
    });
})

router.get("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const detalles = await Gabinete.find({rutina: id});
        if(!detalles) return next(new Error("No existen"));
        res.status(200).json({
            data: detalles
        })
    }
    catch (e) {
        next(e);
    }
})

router.get("/newGabinete/:rutina/:id", async (req,res) => {
    const id = req.params.id;
    const rut = req.params.rutina;
    
    const det = await Gabinete.find({nombre: id, rutina: rut});
    if(det!==null) {
        res.status(200).json({
            data: det
        });
    } else {
        res.json({
            data: null
        })
    }
})

router.post("/newrci", async (req, res) => {
    const { errors, isValid } = validateRCI(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new RCI({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor,
        supervisor: req.body.supervisor,
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(routine => res.json(routine))
})

router.put("/updaterci/:id", async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    console.log(id)
    console.log("update:",update)

    RCI.findById(id).then(test => {
        if(!test) {
            return res.status(404).json({msg: "Rutina no existe"})
        }
    })

    try {
        const temp = await RCI.findByIdAndUpdate(id, update)
        res.status(200).json({
            data: temp,
            message: "Rutina actualizada"
        });
    } catch(e) {
        next(e)
    }
})

router.put("/newGabinete", async (req, res) => {
    const { errors, isValid } = validateGabinete(req.body);
    console.log("errors ",errors)
    if (!isValid) {
        return res.status(400).json(errors);
    }

    let prueba = await Gabinete.findOne({nombre: req.body.nombre, rutina: req.body.rutina})
    console.log("prueba ",prueba)
    if(prueba) {
        return res.status(400).json({msg:"Ya existe el detalle de la rutina"});
    }

    try {
        const newgabinete = new Gabinete({
            rutina: req.body.rutina,
            nombre: req.body.nombre,
            manguera: req.body.manguera,
            extintor: req.body.extintor,
            conexion: req.body.conexion,
            presion: req.body.presion,
            limpieza: req.body.limpieza,
            seguro: req.body.seguro,
            observacion: req.body.observacion,
        })
        console.log(newgabinete)

        let update= {};
        update[req.body.nombre] = newgabinete._id;
        let rutina = await RCI.findByIdAndUpdate(req.body.rutina, update)
        newgabinete
        .save()

        res.status(200).json({
            data: rutina,
            message: "Rutina actualizada"
        });
        return;
    }
    catch(e) {
        next(e)
    }
})

module.exports = router;