import API from "./axios";

export const updateUserProfile = async (data: { name?: string; bio?: string; profilePicture?: string }) => {
    try {
        const response = await API.put("/user", data);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const deleteUserAccount = async () => {
    try {
        const response = await API.delete("/user");
        return response.data;
    } catch (error) {
        console.error("Error deleting account:", error);
        throw error;
    }
};
