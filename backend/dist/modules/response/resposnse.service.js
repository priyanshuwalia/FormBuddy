import prisma from "../../config/db.js";
export const createResponse = async (formId, items) => {
    return await prisma.response.create({ data: {
            formId,
            items: {
                createMany: {
                    data: items
                }
            }
        }, include: { items: true }
    });
};
export const getResponseByForm = async (formId) => {
    return await prisma.response.findMany({ where: { formId }, include: { items: true } });
};
