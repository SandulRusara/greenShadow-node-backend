import { PrismaClient } from "@prisma/client";
import Vehicle from "../model/Vehicle";
  // Adjust the path as needed

const prisma = new PrismaClient();

// Add a new vehicle
export async function addVehicle(v: {
    licensePlateNumber: any;
    fuelType: any;
    category: any;
    remarks: any;
    staffId: any;
    status: any;
    fieldId: any
}) {
    try {
        // Create the vehicle in the database
        const newVehicle = await prisma.vehicle.create({
            data: {
                licensePlateNumber: v.licensePlateNumber,
                category: v.category,
                fuelType: v.fuelType,
                status: v.status,
                remarks: v.remarks || null,
                fieldId: v.fieldId,
                staffId: v.staffId || null,
            }
        });

        return newVehicle;
    } catch (err) {
        console.error("Error adding vehicle:", err);
        throw new Error("Failed to add vehicle");
    }
}
export async function deleteVehicle(licenseNumber: string) {
    try {
        // Attempt to delete the vehicle by license plate number
        const deletedVehicle = await prisma.vehicle.delete({
            where: {
                licensePlateNumber: licenseNumber,
            },
        });

        return deletedVehicle;
    } catch (err) {
        console.error("Error deleting vehicle:", err);
        throw new Error("Failed to delete vehicle");
    }
}

// Function to get all vehicles from the database
export async function getAllVehicles() {
    try {
        const vehicles = await prisma.vehicle.findMany();  // Fetch all vehicles

        if (vehicles.length === 0) {
            throw new Error("No vehicles found");  // Handle case when no vehicles are found
        }

        return vehicles;  // Return the vehicles if found
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw new Error("Failed to fetch vehicles");  // Throw error if something goes wrong
    }
}

