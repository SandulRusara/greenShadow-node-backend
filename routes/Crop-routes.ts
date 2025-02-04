import express from "express";
import Crop from "../model/Crop";
import {addCrop, deleteCrop, getAllCrop, updateCrop} from "../database/Crop-data-store";


const router = express.Router();
router.post("/add",async (req, res)=>{
    const crop:Crop=req.body;
    try {
        const Crop = await addCrop(crop);
        res.json(crop);
    }catch (err) {
        console.log("srro adding crop",err);
        res.status(400).send("erro adding crop");
    }

})

router.delete("/delete/:id",async (req, res)=>{
    const id:string = req.params.id;
    try {
        const deleted = await deleteCrop(id);
        res.json(deleted);
    }catch (err) {
        console.log("erro delete crop",err);

    }
})

router.put("/update/:id",async (req, res) => {
    const id:string = req.params.id;
    const customer : Crop = req.body;

    try{
        const updatedCrop = await updateCrop(id, customer);
        res.json(updatedCrop);
    }catch(err){
        console.log("error updating crop", err);
    }
})
router.get("/view", async (req, res) => {
    try{
        const cropsGetAll=  await getAllCrop();
        res.json(cropsGetAll);
    }catch(err){
        console.log("error getting crops", err);
    }
})


export default router;