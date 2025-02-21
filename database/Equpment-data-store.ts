import { PrismaClient } from '@prisma/client';
import Equipment from "../model/Equpment";


const prisma = new PrismaClient();

export async function addEquipment(e: Equipment) {
    try {
        const addedEquipment = await prisma.equipment.create({
            data: {
                equipmentCode: e.equipmentCode,
                name: e.name,
                type: e.type,
                status: e.status,
                availableCount: e.availableCount,
                staffCodeList: e.staffCodeList,
                fieldList: e.fieldList
            }
        });
        console.log("Equipment added:", addedEquipment);
        return addedEquipment;
    } catch (err) {
        console.log("Error adding equipment", err);
    }
}

export async function deleteEquipment(equipmentCode: string) {
    try {
        const deletedEquipment = await prisma.equipment.delete({
            where: { equipmentCode: equipmentCode }
        });
        console.log("Equipment deleted:", deletedEquipment);
        return deletedEquipment;
    } catch (err) {
        console.log("Error deleting equipment", err);
    }
}

export async function updateEquipment(equipmentCode: string, e: Equipment) {
    try {
        const updatedEquipment = await prisma.equipment.update({
            where: { equipmentCode: e.equipmentCode },
            data: {
                name: e.name,
                type: e.type,
                status: e.status,
                availableCount: e.availableCount,
                staffCodeList: e.staffCodeList,
                fieldList: e.fieldList
            }
        });
        console.log("Equipment updated:", updatedEquipment);
        return updatedEquipment;
    } catch (err) {
        console.log("Error updating equipment", err);
    }
}

export async function getAllEquipment() {
    try {
        return await prisma.equipment.findMany();
    } catch (err) {
        console.log("Error getting equipment from Prisma data", err);
    }
}
