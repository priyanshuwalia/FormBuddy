import prisma from "../../config/db.js";
import { generateSlug } from "../../utils/slugify.js";
export const createForm = async (data) => {
    let slug = generateSlug(data.title);
    let exists = await prisma.form.findUnique({ where: { slug } });
    while (exists) {
        slug = generateSlug(data.title);
        exists = await prisma.form.findUnique({ where: { slug } });
    }
    return await prisma.form.create({ data: { ...data, slug } });
};
export const getFormBySlug = async (slug) => {
    return await prisma.form.findUnique({ where: { slug }, include: { blocks: true },
    });
};
export const getFormbyUserId = async (userId) => {
    return await prisma.form.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, include: { blocks: true } });
};
export const updateFormById = async (formId, userId, data) => {
    return await prisma.form.updateMany({ where: { id: formId, userId }, data, });
};
export const deleteFormById = async (formId, userId) => {
    return await prisma.form.deleteMany({ where: { id: formId, userId }, });
};
