import axios from "axios";

// ==========================================================
// API
// ==========================================================

const API = axios.create({

    baseURL: "http://127.0.0.1:8000",

    headers: {

        "Content-Type": "application/json",

    },

});

// ==========================================================
// SAFETY EVENTS
// ==========================================================

export async function getSafetyEvents() {

    const response = await API.get("/safety-events");

    return response.data;

}

// ==========================================================
// EXPORT
// ==========================================================

export default {

    getSafetyEvents,

};