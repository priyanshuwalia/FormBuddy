import prisma from "../../config/db.js";
import { BlockType } from "@prisma/client";
export const createFormBlock = async (data: {
    formId: string;
    type: BlockType;
    label:string;
    required: boolean;
    placeholder?: string;
    options?: string[];
    order: number;
})=>{
        return await prisma.formBlock.create({data});
}
export const getBlocksByFormId = async(formId: string)=>{
    return await prisma.formBlock.findMany({where: {formId}, orderBy: {order:"asc"}})
}
export const updateBlockById = async (
    blockId: string, userId:string,
    data: {
        label?: string
    required?:boolean;
    placeholder?: string;
    options?: any;
    order?: number;
    }

)=>{
    return await prisma.formBlock.updateMany({
        where:{id: blockId, form: {userId,}},data,
    })
}
export const deleteBlockById = async (blockId: string, userId: string) => {
  return await prisma.formBlock.deleteMany({
    where: {
      id: blockId,
      form: {
        userId,
      },
    },
  });
};