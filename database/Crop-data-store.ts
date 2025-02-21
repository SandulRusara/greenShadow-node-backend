import {PrismaClient} from '@prisma/client';
import Crop from "../model/Crop";

const prisma = new PrismaClient();

export async function addCrop(c: Crop) {
    try {
        const newCrop = await prisma.crop.create({
            data: {
                id: c.id,
                commonName: c.commonName,
                scientificName: c.scientificName,
                category: c.category,
                cropImage: c.cropImage,
                fieldId: c.fieldId,
            },
        });
        console.log('Crop added:', newCrop);
        return newCrop;
    } catch (err) {
        console.error('Error adding crop:', err);
        throw err;
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
