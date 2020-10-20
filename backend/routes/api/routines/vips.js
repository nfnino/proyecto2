const express = require("express");
const router = express.Router();

const validateSilleteria = require("../../../validation/routines/silleteriaValidator");
const validateSuite = require("../../../validation/routines/suiteValidator");
const { Suite, VIP } = require("../../../models/Routines/VIP");
    
router.get("/", async (req,res) => {
    const rutinas = await VIP.find({});
    res.status(200).json({
     data: rutinas
    });
})

router.get("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const rutina = await Suite.find({rutina:id});
        if(!rutina) return next(new Error("No existen"));
        res.status(200).json({
            data: rutina
        })
    }
    catch (e) {
        next(e);
    }
})

router.post("/newvip", async (req, res) => {
    const { errors, isValid } = validateSilleteria(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new VIP({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(routine => res.json(routine))
})

router.put("/updatevip/:id", async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    update['fecha_fin'] = new Date();
    console.log(id)
    console.log(update)

    VIP.findById(id).then(test => {
        if(!test) {
            return res.status(404).json({msg: "Rutina no existe"})
        }
    })

    try {
        const temp = await VIP.findByIdAndUpdate(id, update)
        res.status(200).json({
            data: temp,
            message: "Rutina actualizada"
        });
    } catch(e) {
        next(e)
    }
})

router.put("/newSuite", async (req, res) => {
    const { errors, isValid } = validateSuite(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    let prueba = await Suite.findOne({nombre: req.body.nombre, rutina: req.body.rutina})
    console.log("prueba ",prueba)
    if(prueba) {
        return res.status(400).json({msg:"Ya existe el detalle de la rutina"});
    }

    try {
        const newsuite = new Suite({
            rutina: req.body.rutina,
            nombre: req.body.nombre,
            sillas: req.body.sillas,
            puertas: req.body.puertas,
            lava_platos: req.body.lava_platos, 
            lamparas: req.body.lamparas,
            observacion: req.body.observacion
        })
        console.log(newsuite)

        let update= {};
        update[req.body.nombre] = newsuite._id;
        let r = await VIP.findByIdAndUpdate(req.body.rutina,
                                                {$inc: {
                                                    total_sillas: newsuite.sillas,
                                                    total_puertas: newsuite.puertas,
                                                    total_lava_platos: newsuite.lava_platos,
                                                    total_lamparas: newsuite.lamparas} 
                                                })
        let rutina = await VIP.findByIdAndUpdate(req.body.rutina, update, {new: true});

        newsuite
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