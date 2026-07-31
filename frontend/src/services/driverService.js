import api from "../api/api";

// ======================================================
// GET ALL DRIVERS
// ======================================================

export const getDrivers = async () => {

    const response = await api.get(
        "/drivers"
    );

    return response.data;

};

// ======================================================
// GET DRIVER BY ID
// ======================================================

export const getDriver = async (driverId) => {

    const response = await api.get(
        `/drivers/${driverId}`
    );

    return response.data;

};

// ======================================================
// CREATE DRIVER
// ======================================================

export const createDriver = async (driverData) => {

    const response = await api.post(
        "/drivers",
        driverData
    );

    return response.data;

};

// ======================================================
// UPDATE DRIVER
// ======================================================

export const updateDriver = async (
    driverId,
    driverData
) => {

    const response = await api.put(
        `/drivers/${driverId}`,
        driverData
    );

    return response.data;

};

// ======================================================
// DELETE DRIVER
// ======================================================

export const deleteDriver = async (
    driverId
) => {

    const response = await api.delete(
        `/drivers/${driverId}`
    );

    return response.data;

};

// ======================================================
// GET ALL DEPOTS
// ======================================================

export const getDepots = async () => {

    const response = await api.get(
        "/depots"
    );

    return response.data;

};
