import prisma from "../../config/db.js";
export const updateUser = async (userId, data) => {
    return await prisma.user.update({
        where: { id: userId },
        data,
        select: { id: true, email: true, name: true, bio: true, profilePicture: true }
    });
};
export const deleteUser = async (userId) => {
    return await prisma.user.delete({
        where: { id: userId }
    });
};
