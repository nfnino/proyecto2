const express = require("express");
const router = express.Router();

const validatePantalla = require("../../../validation/routines/pantallaValidator");
const validateTablero = require("../../../validation/routines/tableroValidator");
const { Tablero, Pantalla } = require("../../../models/Routines/Pantalla");

router.get("/", async (req,res) => {
    const rutinas = await Pantalla.find({});
    res.status(200).json({
     data: rutinas
    });
})

router.get("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const rutina = await Tablero.find({rutina: id});
        if(!rutina) return next(new Error("No existen"));
        res.status(200).json({
            data: rutina
        })
    }
    catch (e) {
        next(e);
    }
})

router.post("/newPantalla", async (req, res) => {
    const { errors, isValid } = validatePantalla(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new Pantalla({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor,
        falla: req.body.falla, 
        paneles: req.body.paneles,
        tipo_falla: req.body.tipo_falla,
        cpu: req.body.cpu, 
        control: req.body.control,
        tableros: req.body.tableros,
        plano: req.body.plano,
        corriente_f1: req.body.corriente_f1, 
        corriente_f2: req.body.corriente_f2,
        corriente_f3: req.body.corriente_f3,
        observacion: req.body.observacion
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(routine => res.json(routine))
})

router.put("/newdetpantalla", async (req, res) => {
    const { errors, isValid } = validateTablero(req.body);
    if (!isValid) {
        console.log("not valid")
        return res.status(400).json(errors);
    }

    let prueba = await Tablero.findOne({nombre: req.body.nombre, rutina: req.body.rutina})
    if(prueba) {
        console.log("ya existe")
        return res.status(400).json({msg:"Ya existe el detalle de la rutina"});
    }

    try {
        const newpantalla = new Tablero({
            nombre: req.body.nombre,
            brak1: req.body.brak1,
            brak2: req.body.brak2,
            brak3: req.body.brak3,
            brak4: req.body.brak4,
            brak5: req.body.brak5,
            brak6: req.body.brak6,
            brak7: req.body.brak7,
            brak8: req.body.brak8,
            brak9: req.body.brak9,
            rutina: req.body.rutina,
        })
        console.log(newpantalla)

        let update= {};
        update[req.body.nombre] = newpantalla._id;

        let rutina = await Pantalla.findByIdAndUpdate(req.body.rutina, update)
        newpantalla
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

router.put("/updatePantalla/:id", async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    update['fecha_fin'] = new Date();
    console.log(id)
    console.log(update)

    Pantalla.findById(id).then(test => {
        console.log(test)
        if(!test) {
            console.log("no existe")
            return res.status(404).json({msg: "Rutina no existe"})
        }
    })
    try {
        const temp = await Pantalla.findByIdAndUpdate(id, update)
        res.status(200).json({
            data: temp,
            message: "Rutina actualizada"
        });
    } catch(e) {
        console.log("catch")
        next(e)
    }
})

module.exports = router;