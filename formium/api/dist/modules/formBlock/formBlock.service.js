import prisma from "../../config/db.js";
export const createFormBlock = async (data) => {
    return await prisma.formBlock.create({ data });
};
export const getBlocksByFormId = async (formId) => {
    return await prisma.formBlock.findMany({ where: { formId }, orderBy: { order: "asc" } });
};
export const updateBlockById = async (blockId, userId, data) => {
    return await prisma.formBlock.updateMany({
        where: { id: blockId, form: { userId, } }, data,
    });
};
export const deleteBlockById = async (blockId, userId) => {
    return await prisma.formBlock.deleteMany({
        where: {
            id: blockId,
            form: {
                userId,
            },
        },
    });
};
