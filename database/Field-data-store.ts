import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to add a new field to the database
export const addField = async (fieldName: string, location: string, extentSize: string, fieldImageBase64: string | null) => {
    try {
        // Check if fieldName already exists
        const existingField = await prisma.field.findUnique({
            where: { fieldName },
        });

        if (existingField) {
            throw new Error("Field with this name already exists.");
        }

        // Create a new field record in the database
        const newField = await prisma.field.create({
            data: {
                fieldName,
                location,
                extentSize: parseFloat(extentSize),
                fieldImage: fieldImageBase64, // Save Base64 string in the database
            },
        });

        return newField;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Error adding field");
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

// Function to fetch all fields from the database
export const getAllFields = async () => {
    try {
        const fields = await prisma.field.findMany();
        return fields;
    } catch (error) {
        throw new Error("Error fetching fields");
    }
};

// Function to delete a field from the database by field name
export const deleteField = async (fieldName: string) => {
    try {
        // Delete the field by its name
        const deletedField = await prisma.field.delete({
            where: { fieldName },
        });
        return deletedField;
    } catch (error) {
        throw new Error(`Field with name ${fieldName} not found`);
    }
};

// Function to update a field in the database
export const updateField = async (
    fieldName: string,
    location: string,
    extentSize: string,
    fieldImageBase64: string | null
) => {
    try {
        // Find the existing field
        const existingField = await prisma.field.findUnique({
            where: { fieldName },
        });

        if (!existingField) {
            throw new Error("Field not found.");
        }

        // Update the field record
        const updatedField = await prisma.field.update({
            where: { fieldName },
            data: {
                location,
                extentSize: parseFloat(extentSize),
                fieldImage: fieldImageBase64, // Update with the new Base64 image or null if no image is uploaded
            },
        });

        return updatedField;
    } catch (error: unknown) {
        // Type assertion to check if the error is an instance of Error
        if (error instanceof Error) {
            throw new Error(error.message || "Error updating field");
        } else {
            throw new Error("An unknown error occurred while updating the field.");
        }
    }
};
