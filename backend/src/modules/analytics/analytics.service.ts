import prisma from "../../config/db.js";

export const getAnalytics = async (userId: string) => {

    const forms = await prisma.form.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            slug: true,
            isPublished: true,
            createdAt: true,
            _count: {
                select: { responses: true }
            }
        }
    });

    const totalForms = forms.length;

    const totalResponses = forms.reduce((acc, form) => acc + (form._count?.responses || 0), 0);


    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const rawRecentResponses = await prisma.response.findMany({
        where: {
            form: { userId },
            createdAt: { gte: sevenDaysAgo }
        },
        select: { createdAt: true }
    });


    const trendsMap = new Map<string, number>();

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        trendsMap.set(dateStr, 0);
    }

    rawRecentResponses.forEach((r: any) => {
        const dateStr = new Date(r.createdAt).toISOString().split('T')[0];
        if (trendsMap.has(dateStr)) {
            trendsMap.set(dateStr, trendsMap.get(dateStr)! + 1);
        }
    });

    const trends = Array.from(trendsMap.values());



    const topForms = forms

        .sort((a, b) => (b._count?.responses || 0) - (a._count?.responses || 0))
        .slice(0, 4)
        .map((f: any) => ({
            id: f.id,
            name: f.title,
            responses: f._count?.responses || 0,
        }));

    return {
        stats: [
            {
                label: "Total Responses",
                value: totalResponses.toLocaleString(),
                change: totalResponses > 0 ? "+100%" : "0%", // Simplified for now, ideally would compare to previous period
                trend: "up",
                icon: "Users"
            },
            {
                label: "Total Forms",
                value: totalForms.toString(),
                change: totalForms > 0 ? "+100%" : "0%",
                trend: "up",
                icon: "FileText"
            },
            // Removed "Est. Views" and "Conversion" as we don't track views dependent on user request
            // We could add "Avg Responses / Form" instead
            {
                label: "Avg. Responses/Form",
                value: totalForms > 0 ? (totalResponses / totalForms).toFixed(1) : "0",
                change: "",
                trend: "neutral",
                icon: "TrendingUp"
            },
        ],
        trends,
        topForms: topForms.map((f: any) => ({
            id: f.id,
            name: f.title,
            responses: f._count?.responses || 0,
            // Removed views/conversion from top forms list as well
            views: null,
            conversion: null
        }))
    };
};
