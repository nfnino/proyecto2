const express = require("express");
const router = express.Router();

const validateSilleteria = require("../../../validation/routines/silleteriaValidator");
const validatePiso = require("../../../validation/routines/pisoValidator");
const { Piso, Silleteria } = require("../../../models/Routines/Silleteria");

router.get("/", async (req,res) => {
    const rutinas = await Silleteria.find({});
    res.status(200).json({
     data: rutinas
    });
})

router.get("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const rutina = await Piso.find({rutina: id});
        if(!rutina) return next(new Error("No existen"));
        res.status(200).json({
            data: rutina
        })
    }
    catch (e) {
        next(e);
    }
})

router.post("/newSilleteria", async (req, res) => {
    const { errors, isValid } = validateSilleteria(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new Silleteria({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(routine => res.json(routine))
})

router.put("/updateSilleteria/:id", async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    update['fecha_fin'] = new Date();
    console.log(id)
    console.log(update)

    Silleteria.findById(id).then(test => {
        if(!test) {
            return res.status(404).json({msg: "Rutina no existe"})
        }
    })

    try {
        const temp = await Silleteria.findByIdAndUpdate(id, update)
        res.status(200).json({
            data: temp,
            message: "Rutina actualizada"
        });
    } catch(e) {
        next(e)
    }
})

router.put("/newPiso", async (req, res) => {
    const { errors, isValid } = validatePiso(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    let prueba = await Piso.findOne({nombre: req.body.nombre, rutina: req.body.rutina})
    console.log("prueba ",prueba)
    if(prueba) {
        return res.status(400).json({msg:"Ya existe el detalle de la rutina"});
    }
    let total = 0;
    const array = [req.body.p_01 , req.body.p_02 , req.body.p_03 , req.body.p_04 , req.body.p_05 ,
        req.body.p_06 , req.body.p_07 , req.body.p_08 , req.body.p_09 , req.body.p_10 , req.body.p_11 ,
        req.body.p_12 , req.body.p_13 , req.body.p_14 , req.body.p_15 , req.body.p_16 , req.body.p_17 ,
        req.body.p_18 , req.body.p_19]
    for (let i=0; i<array.length;i++) {
        if(parseInt(array[i])) {
            console.log(`total[${i}]: `,total)
            total = total + parseInt(array[i])
        }
    }
    
    try {
        const newpiso = new Piso({
            rutina: req.body.rutina,
            nombre: req.body.nombre,
            p_01: req.body.p_01,
            p_02: req.body.p_02,
            p_03: req.body.p_03,
            p_04: req.body.p_04,
            p_05: req.body.p_05,
            p_06: req.body.p_06,
            p_07: req.body.p_07,
            p_08: req.body.p_08,
            p_09: req.body.p_09,
            p_10: req.body.p_10,
            p_11: req.body.p_11,
            p_12: req.body.p_12,
            p_13: req.body.p_13,
            p_14: req.body.p_14,
            p_15: req.body.p_15,
            p_16: req.body.p_16,
            p_17: req.body.p_17,
            p_18: req.body.p_18,
            p_19: req.body.p_19,
            p_total: total,
        })
        console.log(newpiso)

        let update= {};
        update[req.body.nombre] = newpiso._id;
        let rutina = await Silleteria.findByIdAndUpdate(req.body.rutina, update)
        
        newpiso
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