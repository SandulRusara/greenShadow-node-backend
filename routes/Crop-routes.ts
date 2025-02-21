import express, { Request, Response } from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient for database interaction

const prisma = new PrismaClient();
const router = express.Router();

// Configure multer to store images in memory (Base64 conversion)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add a new crop
router.post("/saveCrop", upload.single("cropImage"), async (req: Request, res: Response): Promise<void> => {
    try {
        const { commonName, scientificName, category, fieldId } = req.body;

        // Validate required fields
        if (!commonName || !scientificName || !category || !fieldId) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        // Convert image to Base64 if provided
        let base64Image: string | null = null;
        if (req.file) {
            base64Image = req.file.buffer.toString("base64");
        }

        // Ensure fieldId is a valid number
        const fieldIdNumber = Number(fieldId);
        if (isNaN(fieldIdNumber)) {
            res.status(400).json({ error: "Invalid fieldId" });
            return;
        }

        // Call the Prisma client to create the new crop
        const newCrop = await prisma.crop.create({
            data: {
                commonName,
                scientificName,
                category,
                fieldId: fieldIdNumber,
                cropImage: base64Image, // Store Base64 image
            },
        });

        res.status(201).json(newCrop);
    } catch (err: unknown) {
        console.error("Error adding crop:", err);

        // Handle unknown error type
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Error adding crop", details: errorMessage });
    }
});

export default router;







