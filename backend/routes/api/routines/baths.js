const express = require("express");
const router = express.Router();

const validateBath = require("../../../validation/routines/bathValidator");
const validateDetBath = require("../../../validation/routines/detbathValidator");
const { Bath, DetBath } = require("../../../models/Routines/Bath");

router.get("/", async (req,res) => {
    const baths = await Bath.find({});
    res.status(200).json({
     data: baths
    });
})

router.get("/:id", async (req,res) => {
    const id = req.params.id;
    const baths = await DetBath.find({rutina: id});
    res.status(200).json({
     data: baths
    });
})

router.get("/newDetBath/:rutina/:id", async (req,res) => {
    const id = req.params.id;
    const rut = req.params.rutina;
    
    const det = await DetBath.find({nombre: id, rutina: rut});
    
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

router.post("/newBath", async (req, res) => {
    const { errors, isValid } = validateBath(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new Bath({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor,
        supervisor: req.body.supervisor,
        observacion: req.body.observacion
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(bath => res.json(bath))
})

router.put("/updateBath/:id", async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    update['fecha_fin'] = new Date();
    console.log(id)
    console.log(update)

    Bath.findById(id).then(test => {
        if(!test) {
            return res.status(404).json({msg: "Rutina no existe"})
        }
    })

    try {
        const temp = await Bath.findByIdAndUpdate(id, update)
        res.status(200).json({
            data: temp,
            message: "Rutina actualizada"
        });
    } catch(e) {
        next(e)
    }
})

router.put("/newdetbath", async (req, res) => {
    const { errors, isValid } = validateDetBath(req.body);
    console.log("errors ",errors)
    if (!isValid) {
        return res.status(400).json(errors);
    }

    let prueba = await DetBath.findOne({nombre: req.body.nombre, rutina: req.body.rutina})
    console.log("prueba ",prueba)
    if(prueba) {
        return res.status(400).json({msg:"Ya existe el detalle de la rutina"});
    }

    try {
        const newdetalle = new DetBath({
            rutina: req.body.rutina,
            nombre: req.body.nombre,
            sanitarios: req.body.sanitarios,
            orinales: req.body.orinales,
            lavamanos: req.body.lavamanos,
            secamanos: req.body.secamanos,
            panaleras: req.body.panaleras,
            duchas: req.body.duchas,
            luminarias: req.body.luminarias
        })
        console.log(newdetalle)

        let update= {};
        update[req.body.nombre] = newdetalle._id;
        let r = await Bath.findByIdAndUpdate(req.body.rutina,
            {$inc: {
                total_sanitarios: newdetalle.sanitarios,
                total_orinales: newdetalle.orinales,
                total_lavamanos: newdetalle.lavamanos,
                total_secamanos: newdetalle.secamanos,
                total_panaleras: newdetalle.panaleras,
                total_duchas: newdetalle.duchas,
                total_luminarias: newdetalle.luminarias} 
            })
        let rutina = await Bath.findByIdAndUpdate(req.body.rutina, update, {new: true});
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