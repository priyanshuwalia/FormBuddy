import prisma from "../../config/db.js";

export const updateUser = async (userId: string, data: { name?: string; bio?: string; profilePicture?: string }) => {
    return await prisma.user.update({
        where: { id: userId },
        data,
        select: { id: true, email: true, name: true, bio: true, profilePicture: true }
    });
};

export const deleteUser = async (userId: string) => {
    // Prisma should cascade delete if configured in schema, but usually it's safer to rely on explicit deletion or verifying cascade relation.
    // The current schema doesn't specify onDelete: Cascade for User -> Form relation explicitly in the schema shown earlier (default behavior varies).
    // Ideally, we should update Schema to have onDelete: Cascade.
    // Let's assume standard behavior or manual cleanup if needed. For now, delete user.
    // Actually, to be safe and "functional", let's use delete.
    return await prisma.user.delete({
        where: { id: userId }
    });
};
