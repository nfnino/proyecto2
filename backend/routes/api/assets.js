const express = require("express");
const router = express.Router();
const qr = require("../../util/QR");

// File upload middleware
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Imagenes únicamente (jpg, jpeg o png)'), false);
  }
  return cb(null, true);
};

const multerupload = multer({ 
  storage: storage, 
  fileFilter: imageFilter, 
  limits: {filesize: 1024*1024*16}
}) 

//Validation middleware
const validateAssetInput = require("../../validation/assetValidator");

const Asset = require("../../models/Asset");
const AssetAudit = require("../../models/Audit/AssetAudit");

/* router.put('/newAsset/:id', async (req, res, next) => {
  console.log("-------------entra a routes")
  const id = req.params.id;
  console.log("files: ",req.files)
  console.log("isnull: ",req.files === null)
  if(req.files === null){
    return res.status(400).json({ msg: 'No se cargó ninguna imagen' })
  }
  const file = req.files.file;
  const manual = req.files.manual;

  file.mv(`../public/uploads/${file.name}`, err => {
    if(err) {
      console.log("file err: ",err);
      return res.status(500).send(err);
    }
  })
  manual.mv(`../public/uploads/documents/${manual.name}`, err => {
    if(err) {
      console.log("manu err: ",err);
      return res.status(500).send(err);
    }
  })
  try {
    const update = {
      imagen : `/uploads/${file.name}`,
      manual : `/uploads/documents/${manual.name}`
    }
    console.log("update: ",update)
    let asset = await Asset.findByIdAndUpdate(id, update)
    res.status(200).json({
      data: asset,
      message: "Ha actualizado el activo"
    })
  } catch (error) {
    next(error)
  }
}) */

router.get("/assets", async (req,res) => {
    const assets = await Asset.find({});
    res.status(200).json({
     data: assets
    });
})

router.get("/assets/:categoria/:area", async (req,res) => {
  const categoria = req.params.categoria
  const area = req.params.area
  const assets = await Asset.find({categoria: RegExp(categoria, "i"), area: RegExp(area, "i")});
  res.status(200).json({
    data: assets
  });
})

router.get("/assets/:id", async (req, res, next) => {
  try{
    const id = req.params.id
    const asset = await Asset.findById(id)
    console.log(asset)
    if(!asset) return next(new Error("No existe el activo"));
    res.status(200).json({
      data: asset
    })
  } catch (error){
    next(error)
  }
})

//multerupload.array('imagenes',5),
router.post("/newAsset", async (req, res) => {
  const { errors, isValid } = validateAssetInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  if(req.files == null){
    return res.status(400).json({ imagen: 'No se cargó ninguna imagen o manual' , manual: 'No se cargó ninguna imagen o manual'})
  }

  await Asset.findOne({nombre: req.body.nombre}).then(asset => {
    if(asset) {
      console.log("errores: ",asset)
      return res.status(400).json({ nombre: "Ya existe un activo con este nombre" });
    } else {
      try{
        const nuevo = {  
          recinto: req.body.recinto,
          ubicacion: req.body.ubicacion,
          categoria: req.body.categoria,
          nombre: req.body.nombre,
          fecha_compra: req.body.fecha_compra,
          valor: req.body.valor,
          dias_garantia: req.body.dias_garantia,
          fecha_fin_garantia: req.body.fecha_fin_garantia,
          dias_frec_mant_preventivo: req.body.dias_frec_mant_preventivo,
          estado: "Creado",
          observacion: req.body.observacion,
          area: req.body.area,
          activo_reemp: req.body.activo_reemp}

        let nom = nuevo.nombre.replace(/\s+/g, '_');
        nom = nom.replace(/[áéíóúÁÉÍÓÚ]+/g,'o')
        nom = nom.replace(/[ñÑ]+/g,'n')

        let path = `../public/uploads/qr/${nom}.PNG`;
        let path2 = `/uploads/qr/${nom}.PNG`;

        qr.functionSave(path, nuevo)
        
        nuevo.cod_qr = path2;

        // ---------------------------------- FILES --------------------------------------   
        const file = req.files.file;
        const manual = req.files.manual;
      
        file.mv(`../public/uploads/${file.name}`, err => {
          if(err) {
            console.log("file err: ",err);
            return res.status(500).send(err);
          }
        })
        manual.mv(`../public/uploads/documents/${manual.name}`, err => {
          if(err) {
            console.log("manu err: ",err);
            return res.status(500).send(err);
          }
        })
        nuevo.imagen = `/uploads/${file.name}`
        nuevo.manual = `/uploads/documents/${manual.name}`
       
        //------------------------------------- SAVE ---------------------------------------
        const newAsset = new Asset(nuevo);
        console.log(newAsset)
        const audit = { asset_id:newAsset._id, asset_name:newAsset.nombre, action:"CREATE", user_id: req.body.user_id, user_name: req.body.user_name, date: new Date()}
        const newaudit = new AssetAudit(audit);
        console.log(newaudit);
        newAsset
        .save()
        .then(newaudit.save())
        .then(asset => res.json(asset))
      } catch (e) {
        console.log(e)
        return res.status(400).json(e);
      }
    } 
  })
})

router.put("/updateAsset/:id", async (req, res, next) => {
  const id = req.params.id
  const update = req.body
  const auditinfo = {user_id: req.body.user_id, user_name: req.body.user_name};
  let helper=null;
  Asset.findById(id).then(asset => {
    helper=asset;
    if(!asset) {
      return res.status(404).json({assetnotfound: "Activo no existe"})
    }
  })
  try {
    delete update["user_id","use_name"]
    console.log("update after delete:", update)
    let asset = await Asset.findByIdAndUpdate(id, update)

    const audit = { asset_id:id, asset_name:helper.nombre, action:"UPDATE", user_id: auditinfo.user_id, user_name: auditinfo.user_name, date: new Date()}
    const newaudit = new AssetAudit(audit);
    newaudit.save()

    res.status(200).json({
      data: asset,
      message: "Ha actualizado el activo"
    })
  } catch (error) {
    next(error)
  }
})

router.put("/req-delete/:id", async (req, res, next) => {
  const id = req.params.id;

  if(req.files === null){
    return res.status(400).json({ msg: 'No se cargó ninguna imagen' })
  }

  Asset.findById(id).then(asset => {
    if(!asset) {
      return res.status(404).json({assetnotfound: "Activo no existe"})
    }
  })
  
  const file = req.files.file;
  file.mv(`../public/uploads/documents/${file.name}`, err => {
    if(err) {
      console.log(err);
      return res.status(500).send(err);
    }
  })

  try {
    const update = {
      soporte_delete: `/uploads/documents/${file.name}`,
      estado: "Petición para eliminar"
    }

    console.log("update: ",update)

    let asset = await Asset.findByIdAndUpdate(id, update)
    console.log("asset en router: ", asset)
    res.status(200).json({
      data: asset,
      message: "Ha realizado la petición de eliminación del archivo"
    });
    return;
  } catch (error) {
    next(error)
  }
})

router.put("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  const u = "De baja";
  let helper =null;
  Asset.findById(id).then(asset => {
    helper = asset;
    if(!asset) {
      return res.status(404).json({assetnotfound: "Activo no existe"})
    }
  })
  try {
    let asset = await Asset.findByIdAndUpdate(id, {estado: u})
    console.log("asset en router: ", asset)

    const audit = { asset_id:id, asset_name:helper.nombre, action:"DELETE", user_id: req.body.user_id, user_name: req.body.user_name, date: new Date()}
    const newaudit = new AssetAudit(audit);
    newaudit.save()

    res.status(200).json({
      data: asset,
      message: "Ha eliminado"
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router;