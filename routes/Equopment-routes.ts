import express from "express";
import Equipment from "../model/Equpment";
import {addEquipment, deleteEquipment, getAllEquipment, updateEquipment} from "../database/Equpment-data-store";



const router = express.Router();

router.post("/add", async (req, res) => {
    const equipment: Equipment = req.body;
    try {
        const newEquipment = await addEquipment(equipment);
        res.json(newEquipment);
    } catch (err) {
        console.log("error adding equipment", err);
        res.status(400).send("error adding equipment");
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id: string = req.params.id;
    try {
        const deleted = await deleteEquipment(id);
        res.json(deleted);
    } catch (err) {
        console.log("error deleting equipment", err);
        res.status(400).send("error deleting equipment");
    }
});

router.put("/update/:id", async (req, res) => {
    const id: string = req.params.id;
    const equipment: Equipment = req.body;

    try {
        const updatedEquipment = await updateEquipment(id, equipment);
        res.json(updatedEquipment);
    } catch (err) {
        console.log("error updating equipment", err);
        res.status(400).send("error updating equipment");
    }
});

router.get("/view", async (req, res) => {
    try {
        const allEquipment = await getAllEquipment();
        res.json(allEquipment);
    } catch (err) {
        console.log("error getting equipment", err);
        res.status(400).send("error getting equipment");
    }
});

export default router;
