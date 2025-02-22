import express, { Request, Response } from "express";
import multer from "multer";
import {addField, deleteField, getAllFields} from "../database/Field-data-store"; // Import the addField function

const router = express.Router();

// Set up multer for file handling (in-memory storage for Base64 conversion)
const storage = multer.memoryStorage(); // Use memory storage to directly handle Base64 encoding
const upload = multer({ storage: storage });

// Route to add a new field with optional image upload
router.post("/add", upload.single("fieldImage"), async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract data from the body and file (if provided)
        const { fieldName, location, extentSize } = req.body;
        let fieldImageBase64 = null;

        // If an image is uploaded, convert it to Base64
        if (req.file) {
            fieldImageBase64 = req.file.buffer.toString("base64"); // Convert image buffer to Base64 string
        }

        // Call the addField function from the data store
        const newField = await addField(fieldName, location, extentSize, fieldImageBase64);

        // Send the newly created field as a response
        res.status(201).json(newField);
    } catch (error) {
        console.error("Error adding field:", error);

        // Cast the error to a specific type (Error) to access message property
        if (error instanceof Error) {
            res.status(500).json({ error: error.message || "Error adding field" });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

router.get("/view", async (req: Request, res: Response): Promise<void> => {
    try {
        // Call the getAllFields function from the data store
        const fields = await getAllFields();

        // Send the fields as a response
        res.status(200).json(fields);
    } catch (error) {
        console.error("Error fetching fields:", error);
        res.status(500).json({ error: "Error fetching fields" });
    }
});
// Route to delete a field by its fieldName
router.delete("/delete/:fieldName", async (req: Request, res: Response): Promise<void> => {
    try {
        const { fieldName } = req.params;

        // Call the deleteField function from the data store
        const deletedField = await deleteField(fieldName);

        // Send the deleted field as a response
        res.status(200).json(deletedField);
    } catch (error) {
        console.error("Error deleting field:", error);

        // Handle 'unknown' type for error and ensure it has a 'message'
        if (error instanceof Error) {
            res.status(500).json({ error: error.message || "Error deleting field" });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

export default router;
