import api from "../api/api";

// ===========================
// Vehicle
// ===========================

export const getVehicles = async () => {

    const response = await api.get("/vehicles");

    return response.data;

};

export const createVehicle = async (vehicle) => {

    const response = await api.post(

        "/vehicles",

        vehicle

    );

    return response.data;

};

export const updateVehicle = async (

    vin,

    vehicle,

) => {

    const response = await api.put(

        `/vehicles/${vin}`,

        vehicle

    );

    return response.data;

};

export const deleteVehicle = async (vin) => {

    const response = await api.delete(

        `/vehicles/${vin}`

    );

    return response.data;

};

// ===========================
// Depot
// ===========================

export const getDepots = async () => {

    const response = await api.get(

        "/depots"

    );

    return response.data;

};

// ===========================
// Vehicle Categories
// ===========================

export const getVehicleCategories = async () => {

    const response = await api.get(

        "/vehicle-categories"

    );

    return response.data;

};


