export type FullReservation = {
    items: Array<Reservation & { experience: Experience, totalPrice: number }>
    totalItems: number
}

export type Reservation = {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    date: string;
    expId: number;
    peopleNum: number;
}

export type Experience = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}