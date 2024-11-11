import { BASE_URL } from "./endpoint";
import { Experience, Reservation } from "./types";

export const createReservations = async (values: Omit<Reservation, "id">) => {
    try {
        const response = await fetch(`${BASE_URL}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}, ${response.statusText}`);
        }
        const {id} = await response.json()
        return id
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getReservations = async () : Promise<Reservation[]> => {
    try {
        const response = await fetch(`${BASE_URL}/reservations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}, ${response.statusText}`);
        }
        return response.json()
    } catch (error) {
        console.error(error);
        return []
    }
}

export const getExperiences = async () : Promise<Experience[]> => {
    try {
        const response = await fetch(`${BASE_URL}/experiences`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}, ${response.statusText}`);
        }
        return response.json()
    } catch (error) {
        console.error(error);
        return []
    }
}