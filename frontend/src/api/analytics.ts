import API from "./axios";

export const getAnalyticsFn = async () => {
    try {
        const response = await API.get("/analytics");
        return response.data;
    } catch (error) {
        console.error("Error fetching analytics:", error);
        throw error;
    }
};
