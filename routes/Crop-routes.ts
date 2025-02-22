import express, { Request, Response } from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import {addCrop, deleteCrop, getAllCrops, updateCrop} from "../database/Crop-data-store"; // Import PrismaClient for database interaction

const prisma = new PrismaClient();
const router = express.Router();

// Configure multer to store images in memory (Base64 conversion)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/saveCrop", upload.single("cropImage"), async (req: Request, res: Response): Promise<void> => {
    try {
        const { commonName, scientificName, category, fieldId } = req.body;

        // Call the addCrop function
        const newCrop = await addCrop(commonName, scientificName, category, fieldId, req.file?.buffer);

        res.status(201).json(newCrop);
    } catch (err: unknown) {
        console.error("Error adding crop:", err);

        // Handle unknown error type
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Error adding crop", details: errorMessage });
    }
});
router.delete("/delete/:commonName", async (req: Request, res: Response): Promise<void> => {
    try {
        const { commonName } = req.params;

        // Call the deleteCrop function
        const result = await deleteCrop(commonName);

        res.status(200).json(result);
    } catch (error: any) {
        console.error("Error deleting crop:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});
router.get("/view", async (req: Request, res: Response) => {
    try {
        const crops = await getAllCrops();

        if (crops.length > 0) {
            res.status(200).json(crops);
        } else {
            res.status(404).json({ message: "No crops found" });
        }
    } catch (error) {
        console.error("Error fetching crops:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.put("/update/:commonName", upload.single("cropImage"), async (req: Request, res: Response) => {
    try {
        const { commonName } = req.params;
        const { scientificName, category, fieldName } = req.body;

        if (!scientificName || !category || !fieldName) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        // Convert image to Base64 if provided
        let base64Image: string | null = null;
        if (req.file) {
            base64Image = req.file.buffer.toString("base64");
        }

        const updatedCrop = await updateCrop(commonName, {
            scientificName,
            category,
            fieldName,
            cropImage: base64Image,
        });

        res.status(200).json(updatedCrop);
    } catch (error) {
        console.error("Error updating crop:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;







