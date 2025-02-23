import { PrismaClient, EquipType, Status } from "@prisma/client";

const prisma = new PrismaClient();

export async function addEquipment(e: {
    equipName: string;
    equipType: string;
    status: string;
    staffId?: number;  // staffId as a number (optional)
    fieldId: number;
}) {
    try {
        // Convert string to Prisma enum type
        const equipTypeEnum = e.equipType as EquipType;
        const statusEnum = e.status as Status;

        // Create the equipment in the database
        const newEquipment = await prisma.equipment.create({
            data: {
                equipName: e.equipName,
                equipType: equipTypeEnum,
                status: statusEnum,
                staffId: e.staffId || null,  // Handle optional staffId
                fieldId: e.fieldId,
            },
        });

        return newEquipment;
    } catch (err) {
        console.error("Error adding equipment:", err);
        throw new Error("Failed to add equipment");
    }
}

export async function getAllEquipment() {
    try {
        // Retrieve all equipment from the database
        const equipmentList = await prisma.equipment.findMany({
            include: {
                staff: true, // Optionally include related staff info
                field: true, // Optionally include related field info
            },
        });

        return equipmentList;
    } catch (err) {
        console.error("Error retrieving all equipment:", err);
        throw new Error("Failed to retrieve equipment");
    }
}

// Delete equipment by name
export async function deleteEquipment(equipName: string) {
    try {
        const deletedEquipment = await prisma.equipment.delete({
            where: { equipName },
        });

        return deletedEquipment;
    } catch (err) {
        console.error("Error deleting equipment:", err);
        throw new Error("Failed to delete equipment");
    }
}

export async function updateEquipment(equipName: string, updatedData: {
    equipName?: string;
    equipType?: string;  // Accepting string here, but need to cast to enum
    status?: string;     // Accepting string here, but need to cast to enum
    staffId?: number;    // staffId as a number (optional)
    fieldId?: number;    // fieldId is now optional, but it can be updated if provided
}) {
    try {
        // Cast equipType and status to the appropriate enums
        const equipTypeEnum = updatedData.equipType ? updatedData.equipType as EquipType : undefined;
        const statusEnum = updatedData.status ? updatedData.status as Status : undefined;

        // Prepare the data object for the update
        const updateData: any = {
            equipName: updatedData.equipName,
            equipType: equipTypeEnum,
            status: statusEnum,
            staffId: updatedData.staffId,
            fieldId: updatedData.fieldId
        };

        // Remove any undefined fields from the data object
        for (const key in updateData) {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        }

        // Update the equipment
        const updatedEquipment = await prisma.equipment.update({
            where: { equipName },
            data: updateData,
        });

        return updatedEquipment;
    } catch (err) {
        console.error("Error updating equipment:", err);
        throw new Error("Failed to update equipment");
    }
}