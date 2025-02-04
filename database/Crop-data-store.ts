import {PrismaClient} from '@prisma/client';
import Crop from "../model/Crop";

const prisma = new PrismaClient();

export async function addCrop(c:Crop) {
    try {
        const addCrop = await prisma.crop.create({
            data:{
                id:c.id,
                commonName:c.commonName,
                scientificName:c.scientificName,
                category:c.category,
                season:c.season,
                fieldDetails:c.fieldDetails,
                imageUrl:c.imageUrl

            }
        })
        console.log("ceop added :",addCrop);
        return addCrop;
    }catch (err) {
        console.log("err adding crop ",err);
    }
}

export async function deleteCrop(id:string) {
    try {
        const deleteCrop = await prisma.crop.delete({
            where:{id:id}
        });
        console.log("delete Crop",deleteCrop);
        return deleteCrop;
    }catch (err) {
        console.log("error deleting crop", err);
    }
}
