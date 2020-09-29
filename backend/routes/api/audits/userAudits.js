const express = require("express");
const router = express.Router();

const UserAudit = require("../../../models/Audit/UserAudit");

router.get("/", async (req,res) => {
    const users = await UserAudit.find({});
    res.status(200).json({
     data: users
    });
})

router.get("/:id", async (req, res, next) => {
  try{
    const id = req.params.id
    const user = await UserAudit.findById(id)
    console.log(user)
    if(!user) return next(new Error("No existe el activo"));
    res.status(200).json({
      data: user
    })
  } catch (error){
    next(error)
  }
})

module.exports = router;