const express = require("express");
const router = express.Router();

const validateFachada = require("../../../validation/routines/fachadaValidator");
const validateDetFachada = require("../../../validation/routines/detfachadaValidator");
const {Fachada, DetalleFachada } = require("../../../models/Routines/Fachada");

router.get("/", async (req,res) => {
    const fachadas = await Fachada.find({});
    res.status(200).json({
     data: fachadas
    });
})

router.get("/:id", async (req,res) => {
    const id = req.params.id;
    const fachada = await DetalleFachada.find({rutina:id});
    res.status(200).json({
     data: fachada
    });
})

router.get("/newDetFachada/:rutina/:id", async (req,res) => {
    const id = req.params.id;
    const rut = req.params.rutina;
    
    const det = await DetalleFachada.find({nombre: id, rutina: rut});
    
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

router.post("/newFachada", async (req, res) => {
    const { errors, isValid } = validateFachada(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new Fachada({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor,
        observacion: req.body.observacion
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(fachada => res.json(fachada))
})

router.put("/updateFachada/:id", async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    update['fecha_fin'] = new Date();
    console.log(id)
    console.log(update)

    Fachada.findById(id).then(test => {
        if(!test) {
            return res.status(404).json({msg: "Rutina no existe"})
        }
    })

    try {
        const temp = await Fachada.findByIdAndUpdate(id, update)
        res.status(200).json({
            data: temp,
            message: "Rutina actualizada"
        });
    } catch(e) {
        next(e)
    }
})

router.put("/newdetfachada", async (req, res) => {
    const { errors, isValid } = validateDetFachada(req.body);
    console.log("errores:",errors);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let prueba = await DetalleFachada.findOne({nombre: req.body.nombre, rutina: req.body.rutina})
    if(prueba) {
        return res.status(400).json({msg:"Ya existe el detalle de la rutina"});
    }
    try {
        const newdetalle = new DetalleFachada({
            rutina: req.body.rutina,
            nombre: req.body.nombre,
            fuga_espirotubo: req.body.fuga_espirotubo,
            presion_sensor: req.body.presion_sensor,
            presion_alta: req.body.presion_alta,
            presion_baja: req.body.presion_baja,
            colchones: req.body.colchones,
            defecto_colchones: req.body.defecto_colchones,
            generador_aire: req.body.generador_aire,
            lamparas: req.body.lamparas,
            defecto_lamparas: req.body.defecto_lamparas,
            control: req.body.control,
            tablero_electrico: req.body.tablero_electrico
        })
        console.log(newdetalle)

        let update= {};
        update[req.body.nombre] = newdetalle._id;
        let rutina = await Fachada.findByIdAndUpdate(req.body.rutina, update, {new: true});
        newdetalle
        .save()

        res.status(200).json({
            data: rutina,
            message: "Rutina actualizada"
        });
        return;
    }
    catch(e) {
        console.log(e)
    }
})

module.exports = router;