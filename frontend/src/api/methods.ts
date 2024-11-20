import { BASE_URL } from "./endpoint";
import { Experience, FullReservation, Reservation } from "./types";

export const createReservations = async (values: Omit<Reservation, "id">) => {
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
    const { id } = await response.json()
    return id
}

export const getReservations = async () : Promise<FullReservation[]> => {
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
}

export const getReservation = async (id: number) : Promise<FullReservation | null> => {
    const response = await fetch(`${BASE_URL}/reservations/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}, ${response.statusText}`);
    }
    return response.json()

}

export const deleteReservation = async (id: number) => {
    const response = await fetch(`${BASE_URL}/reservations/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}, ${response.statusText}`);
    }
}

export const updateReservation = async (id: number, values: Omit<Reservation, "expId"| "id">) => {
    const response = await fetch(`${BASE_URL}/reservations/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    })
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}, ${response.statusText}`);
    }
}

export const getExperiences = async () : Promise<Experience[]> => {
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
}