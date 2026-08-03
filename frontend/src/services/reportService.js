import api from "../api/api";

export const getDashboardSummary = async () => {

    const { data } = await api.get(
        "/reports/dashboard"
    );

    return data;

};

export const getMonthlyTrend = async () => {

    const { data } = await api.get(
        "/reports/monthly-trend"
    );

    return data;

};

export const getJobStatus = async () => {

    const { data } = await api.get(
        "/reports/job-status"
    );

    return data;

};

export const getTopVehicles = async () => {

    const { data } = await api.get(
        "/reports/top-vehicles"
    );

    return data;

};

export const getCostByModel = async () => {

    const { data } = await api.get(
        "/reports/cost-by-model"
    );

    return data;

};


export const getPredictiveAlerts = async () => {

    const response = await api.get("/reports/predictive-alerts");

    return response.data;

};

export const getWorkshopWorkload = async () => {

    const { data } = await api.get(
        "/reports/workshop-workload"
    );

    return data;

};

export const getHighRiskDrivers = async () => {

    const { data } = await api.get(
        "/reports/high-risk-drivers"
    );

    return data;

};

export const getLicenceExpiry = async () => {

    const { data } = await api.get(

        "/reports/licence-expiry"

    );

    return data;

};


export const getVehicleDowntime = async () => {
    const { data } = await api.get("/reports/vehicle-downtime");
    return data;
};

export const getPartsThreshold = async () => {
    const { data } = await api.get("/reports/parts-threshold");
    return data;
};

export const getSupplierPerformance = async () => {
    const { data } = await api.get("/reports/supplier-performance");
    return data;
};

export const getDriverIncidents = async () => {
    const { data } = await api.get("/reports/driver-incidents");
    return data;
};

export const getUnresolvedIncidents = async () => {
    const { data } = await api.get("/reports/unresolved-incidents");
    return data;
};

export const getRetrainingRequired = async () => {
    const { data } = await api.get("/reports/retraining-required");
    return data;
};

export const getDepotSafetyTrends = async () => {
    const { data } = await api.get("/reports/depot-safety-trends");
    return data;
};