import {PrismaClient} from '@prisma/client';
import {Field} from "../model/Field";


const prisma = new PrismaClient();

export async function addField(f:Field) {
    try {
        const addField = await prisma.crop.create({
            data:{
                fieldCode:f.fieldCode,
                name:f.name,
                location:f.location,
                extentSize:f.extentSize,
                fieldImage1:f.fieldImage1,
                fieldImage2:f.fieldImage2,
                equipmentsList:f.equipmentsList,
                memberCodeList:f.memberCodeList,
                logCodeList:f.logCodeList,
                cropCodeList:f.memberCodeList


            }
        })
        console.log("field added :",addField);
        return addField;
    }catch (err) {
        console.log("err adding field ",err);
    }
}

export async function deleteField(id:string) {
    try {
        const deleteField = await prisma.crop.delete({
            where:{id:id}
        });
        console.log("delete field",deleteField);
        return deleteField;
    }catch (err) {
        console.log("error deleting field", err);
    }
}

export async function updateField(id: string, f: Field) {
    try {
        const updateField =  await prisma.crop.update({
            where:{fieldCode:f.fieldCode},
            data:{
                name:f.name,
                location:f.location,
                extentSize:f.extentSize,
                fieldImage1:f.fieldImage1,
                fieldImage2:f.fieldImage2,
                equipmentsList:f.equipmentsList,
                memberCodeList:f.memberCodeList,
                logCodeList:f.logCodeList,
                cropCodeList:f.memberCodeList

            }
        })
        console.log('Field updated :',updateField);
        return updateField;
    } catch (err) {
        console.log("error updating field", err);
    }
}

export async function getAllField(){
    try{
        return await prisma.crop.findMany();
    }catch(err){
        console.log("error getting field from prisma data",err);
    }
}
