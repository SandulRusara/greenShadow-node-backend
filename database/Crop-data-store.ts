import {PrismaClient} from '@prisma/client';
import Crop from "../model/Crop";

const prisma = new PrismaClient();

export async function addCrop(commonName: string, scientificName: string, category: string, fieldId: string, cropImageBuffer?: Buffer): Promise<any> {
    try {
        // Validate required fields
        if (!commonName || !scientificName || !category || !fieldId) {
            throw new Error("Missing required fields");
        }

        // Convert fieldId to number
        const fieldIdNumber = Number(fieldId);
        if (isNaN(fieldIdNumber)) {
            throw new Error("Invalid fieldId");
        }

        // Convert image to Base64 if provided
        let base64Image: string | null = null;
        if (cropImageBuffer) {
            base64Image = cropImageBuffer.toString("base64");
        }

        // Create new crop in the database
        const newCrop = await prisma.crop.create({
            data: {
                commonName,
                scientificName,
                category,
                fieldId: fieldIdNumber,
                cropImage: base64Image,
            },
        });

        return newCrop;
    } catch (error: unknown) {
        // TypeScript check to ensure error is an instance of Error
        if (error instanceof Error) {
            throw new Error(error.message || "Error adding crop");
        } else {
            // Handle case where error is not an instance of Error
            throw new Error("Unknown error occurred while adding crop");
        }
    }
}
export async function deleteCrop(commonName: string): Promise<{ message: string }> {
    try {
        // Find the crop by commonName
        const existingCrop = await prisma.crop.findFirst({
            where: { commonName },
        });

        if (!existingCrop) {
            throw new Error("Crop not found");
        }

        // Delete using the unique ID
        await prisma.crop.delete({
            where: { id: existingCrop.id }, // Use 'id' instead of 'commonName'
        });

        return { message: "Crop deleted successfully" };
    } catch (error) {
        console.error("Error deleting crop:", error);
        throw new Error("Failed to delete crop");
    }
}

// Function to get all crops
export async function getAllCrops() {
    try {
        const crops = await prisma.crop.findMany();
        return crops;
    } catch (error) {
        console.error("Error retrieving crops:", error);
        throw new Error("Failed to fetch crops");
    }
}
export async function updateCrop(commonName: string, cropData: any) {
    try {
        // Check if the crop exists
        const existingCrop = await prisma.crop.findUnique({
            where: { commonName },
        });

        if (!existingCrop) {
            throw new Error("Crop not found");
        }

        // Update the crop
        const updatedCrop = await prisma.crop.update({
            where: { id: existingCrop.id },
            data: {
                scientificName: cropData.scientificName,
                category: cropData.category,
                fieldId: Number(cropData.fieldName),
                cropImage: cropData.cropImage || existingCrop.cropImage,
            },
        });

        return updatedCrop;
    } catch (error) {
        console.error("Error updating crop:", error);
        throw new Error("Failed to update crop");
    }
}


//
// export async function deleteCrop(id:number) {
//     try {
//         const deleteCrop = await prisma.crop.delete({
//             where:{id:id}
//         });
//         console.log("delete Crop",deleteCrop);
//         return deleteCrop;
//     }catch (err) {
//         console.log("error deleting crop", err);
//     }
// }
//
// export async function updateCrop(id: number, c: Crop) {
//    try {
//        const updateCrop =  await prisma.crop.update({
//            where:{id:c.id},
//            data:{
//                // commonName:c.commonName,
//                // scientificName:c.scientificName,
//                // category:c.category,
//                // season:c.season,
//                // fieldDetails:c.fieldDetails,
//                // imageUrl:c.imageUrl
//
//            }
//        })
//        console.log('Crop updated :',updateCrop);
//        return updateCrop;
//    } catch (err) {
//        console.log("error updating crop", err);
//    }
// }
//
// export async function getAllCrop(){
//     try{
//         return await prisma.crop.findMany();
//     }catch(err){
//         console.log("error getting crop from prisma data",err);
//     }
// }
