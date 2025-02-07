import express from "express";
import {addField, deleteField, getAllField, updateField} from "../database/Field-data-store";
import {deleteCrop} from "../database/Crop-data-store";
import Crop from "../model/Crop";
import {Field} from "../model/Field";



const router = express.Router();
router.post("/add",async (req, res)=>{
    const field:Field=req.body;
    try {
        const fieldd = await addField(field);
        res.json(field);
    }catch (err) {
        console.log("error adding field",err);
        res.status(400).send("error adding field");
    }

})

router.delete("/delete/:id",async (req, res)=>{
    const id:string = req.params.id;
    try {
        const deleted = await deleteField(id);
        res.json(deleted);
    }catch (err) {
        console.log("error delete field",err);

    }
})

router.put("/update/:id",async (req, res) => {
    const id:string = req.params.id;
    const field : Field = req.body;

    try{
        const updatedField = await updateField(id,field);
        res.json(updatedField);
    }catch(err){
        console.log("error updating field", err);
    }
})
router.get("/view", async (req, res) => {
    try{
        const fieldsGetAll=  await getAllField();
        res.json(fieldsGetAll);
    }catch(err){
        console.log("error getting field", err);
    }
})


export default router;