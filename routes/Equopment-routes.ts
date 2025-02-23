import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {addEquipment, deleteEquipment, getAllEquipment, updateEquipment} from "../database/Equpment-data-store";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/saveEquipment", async (req: Request, res: Response): Promise<void> => {
    try {
        const { equipName, equipType, status, staffId, fieldId } = req.body;

        // Validate required fields
        if (!equipName || !equipType || !status || !fieldId) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        // Check if the equipment already exists
        const existingEquipment = await prisma.equipment.findFirst({
            where: { equipName },
        });

        if (existingEquipment) {
            res.status(409).json({ error: "Equipment with this name already exists" });
            return;
        }

        // Create a new equipment record
        const newEquipment = await addEquipment({
            equipName,
            equipType,
            status,
            staffId,   // passing staffId instead of staffMember
            fieldId,   // passing fieldId instead of fieldName
        });

        res.status(201).json(newEquipment);
    } catch (error: any) {
        console.error("Error creating equipment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/getAllEquipment", async (req: Request, res: Response): Promise<void> => {
    try {
        const equipmentList = await getAllEquipment();
        res.status(200).json(equipmentList);
    } catch (error: any) {
        console.error("Error retrieving equipment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete equipment by name
router.delete("/delete/:equipName", async (req: Request, res: Response): Promise<void> => {
    const equipName = req.params.equipName;

    try {
        const deletedEquipment = await deleteEquipment(equipName);
        if (deletedEquipment) {
            res.status(200).json(deletedEquipment);
        } else {
            res.status(404).json({ error: "Equipment not found" });
        }
    } catch (error: any) {
        console.error("Error deleting equipment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint for updating equipment
router.put("/update/:equipName", async (req: Request, res: Response) => {
    try {
        const { equipName } = req.params;  // Get equipName from URL params
        const equipmentData = req.body;   // Get the updated data from the request body

        // Call the update function from your database logic
        const updatedEquipment = await updateEquipment(equipName, equipmentData);

        // Return the updated equipment as a response
        res.status(200).json(updatedEquipment);
    } catch (error) {
        console.error("Error updating equipment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
