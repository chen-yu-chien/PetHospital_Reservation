export type ScheduleResponse = {
    date: string,
    startTime: string,
    endTime: string,
    dept: string
}

export type ReservationResponse = {
    resid: number,
    date: string,
    time: string,
    symptom: string,
    doctor: DoctorResponse,
    pet: PetResponse,
}

export type Reservation = {
    date: string,
    time: string,
    symptom: string,
    pet: PetResponse,
    doctor: DoctorResponse,
}

export type ReservationEntry = {
    reservation: Reservation;
    resid: number;
}

export type OwnerResponse = {
    ownerid: number,
    name: string,
    birthday: string,
    identifyId: string,
    gender: string,
    telephone: string,
    address: string,
}

export type DoctorResponse = {
    doctorid: number,
    name: string,
    department: string,
}

export type PetResponse = {
    name: string,
    gender: number,
    type: string,
    birthday: string,
    waferid: string,
    feature: string,
    vaccineDate: string,
    sterilize: number,
    _links: {
        self: {
            href: string;
        },        
        res: {
            href: string;
        },
        owner: {
            href: string;
        }
    }
}