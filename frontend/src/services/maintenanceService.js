import api from "../api/api";

// ===========================
// Maintenance
// ===========================

export const getMaintenanceJobs = async () => {

    const response = await api.get("/maintenance-jobs");

    return response.data;

};

export const createMaintenanceJob = async (job) => {

    const response = await api.post(

        "/maintenance-jobs",

        job

    );

    return response.data;

};

export const updateMaintenanceJob = async (

    jobID,

    job,

) => {

    const response = await api.put(

        `/maintenance-jobs/${jobID}`,

        job

    );

    return response.data;

};

export const deleteMaintenanceJob = async (jobID) => {

    const response = await api.delete(

        `/maintenance-jobs/${jobID}`

    );

    return response.data;

};

export const getJobActivities = async (jobId) => {

    const response = await api.get(
        `/maintenance-jobs/${jobId}/activities`
    );

    return response.data;

};

export const getActivityParts = async (activityId) => {

    const response = await api.get(
        `/maintenance-jobs/activities/${activityId}/parts`
    );

    return response.data;
};

export const getActivityMechanics = async (activityId) => {

    const response = await api.get(
        `/maintenance-jobs/activities/${activityId}/mechanics`
    );

    return response.data;
};