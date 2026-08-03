import api from "../api/api";

// ===========================
// Safety Events
// ===========================

export const getSafetyEvents = async () => {

    const response = await api.get(
        "/safety-events"
    );

    return response.data;

};

export const createSafetyEvent = async (event) => {

    const response = await api.post(
        "/safety-events",
        event
    );

    return response.data;

};

export const updateSafetyEvent = async (

    id,

    event,

) => {

    const response = await api.put(

        `/safety-events/${id}`,

        event,

    );

    return response.data;

};

export const deleteSafetyEvent = async (

    id,

) => {

    const response = await api.delete(

        `/safety-events/${id}`

    );

    return response.data;

};