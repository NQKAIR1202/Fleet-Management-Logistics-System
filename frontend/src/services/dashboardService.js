import api from "../api/api";

export const getDashboardSummary = async () => {
    const response = await api.get("/dashboard/summary");
    return response.data;
};

export const getDashboardCharts = async () => {
    const response = await api.get("/dashboard/charts");
    return response.data;
};