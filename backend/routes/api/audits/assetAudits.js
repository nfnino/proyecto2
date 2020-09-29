const express = require("express");
const router = express.Router();

const AssetAudit = require("../../../models/Audit/AssetAudit");

router.get("/", async (req,res) => {
    const assets = await AssetAudit.find({});
    res.status(200).json({
     data: assets
    });
})

router.get("/:id", async (req, res, next) => {
  try{
    const id = req.params.id
    const asset = await AssetAudit.findById(id)
    console.log(asset)
    if(!asset) return next(new Error("No existe el activo"));
    res.status(200).json({
      data: asset
    })
  } catch (error){
    next(error)
  }
})

module.exports = router;