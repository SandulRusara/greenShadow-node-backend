import express, { Request, Response } from "express";
import {addVehicle, deleteVehicle, getAllVehicles} from "../database/Vehicle-data-store";  // Adjust path as needed
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Route to create a new vehicle
router.post("/saveVehicle", async (req: Request, res: Response): Promise<void> => {
    try {
        const { licensePlateNumber, category, fuelType, status, remarks, fieldId, staffId } = req.body;

        // Validate required fields
        if (!licensePlateNumber || !category || !fuelType || !status || !fieldId) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        // Check if the license plate number already exists using prisma directly
        const existingVehicle = await prisma.vehicle.findUnique({
            where: { licensePlateNumber },
        });

        if (existingVehicle) {
            res.status(409).json({ error: "License plate number already exists" });
            return;
        }

        // Create a new vehicle using the addVehicle function from the service layer
        const newVehicle = await addVehicle({
            licensePlateNumber,
            category,
            fuelType,
            status,
            remarks,
            fieldId,
            staffId
        });

        res.status(201).json(newVehicle);
    } catch (error: any) {
        console.error("Error creating vehicle:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/delete/:licenseNumber", async (req: Request, res: Response): Promise<void> => {
    try {
        const { licenseNumber } = req.params;

        // Call the deleteVehicle service function to delete the vehicle
        const deletedVehicle = await deleteVehicle(licenseNumber);

        if (deletedVehicle) {
            res.status(200).json({ message: "Vehicle deleted successfully", deletedVehicle });
        } else {
            res.status(404).json({ error: "Vehicle not found" });
        }
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/view", async (req: Request, res: Response): Promise<void> => {
    try {
        const vehicles = await getAllVehicles();  // Call service function to fetch vehicles

        if (vehicles.length > 0) {
            res.status(200).json(vehicles);  // Return vehicles if found
        } else {
            res.status(404).json({ message: "No vehicles found" });  // If no vehicles, return 404
        }
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        res.status(500).json({ error: "Internal Server Error" });  // If error occurs, return 500
    }
});

// router.put("/update/:licenseNumber", async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { licenseNumber } = req.params;  // Extract licenseNumber from the URL parameter
//         const vehicle = req.body;  // Get the updated vehicle data from the request body
//
//         // Call the service layer to update the vehicle
//         const updatedVehicle = await updateVehicle(licenseNumber, vehicle);
//
//         if (updatedVehicle) {
//             res.status(200).json(updatedVehicle);  // Return the updated vehicle if successful
//         } else {
//             res.status(404).json({ message: "Vehicle not found" });  // If vehicle not found, return 404
//         }
//     } catch (error) {
//         console.error("Error updating vehicle:", error);
//         res.status(500).json({ error: "Internal Server Error" });  // Handle internal server errors
//     }
// });

export default router;
