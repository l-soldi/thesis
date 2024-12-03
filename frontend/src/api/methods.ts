import { writeUserIdToLocalStorage } from "../localStorage/utils";
import { BASE_URL } from "./endpoint";
import { Experience, FullReservation, Reservation } from "./types";

// API login
export const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}, ${response.statusText}`);
    }

    const jsonResp = await response.json()
    writeUserIdToLocalStorage(jsonResp.id)
    return jsonResp
}

// API registrazione
export const register = async (name:string, lastname: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, lastname, email, password })
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}, ${response.statusText}`);
    }

    const jsonResp = await response.json()
    writeUserIdToLocalStorage(jsonResp.id)
    return jsonResp
}

// API per la creazione di una prenotazione
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

// API per ottenere tutte le prenotazioni
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

// API per l'eliminazione di una prenotazione
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

// API per la modifica di una prenotazione
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

// API per la lista esperienze
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