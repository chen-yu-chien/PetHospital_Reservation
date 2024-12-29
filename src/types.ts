// export type ScheduleResponse = {
//     date: string,
//     starttime: string,
//     endtime: string,
//     dept: string,
//     _links:{
//         self: {
//             href: string;
//         },
//         doctor: {
//             href: string;
//         },
//     }
// }

export type ReservationResponse = {
    date: string,
    time: string,
    petname: string,
    ownername: string,
    tel: string,
    _links: {
        self: {
            href: string;
        }
    }
}

export type Reservation = {
    date: string,
    time: string,
    petname: string,
    ownername: string,
    tel: string,
}

export type ReservationEntry = {
    reservation: Reservation;
    url: string;
}

// export type OwnerResponse = {
//     name: string,
//     birthday: string,
//     identifyId: string,
//     gender: string,
//     telephone: string,
//     _links: {
//         self: {
//             href: string;
//         }
//     }
// }

// export type DoctorResponse = {
//     name: string,
//     department: string,
//     _links: {
//         self:{
//             href: string;
//         },
//     }
// }

// export type PetResponse = {
//     name: string,
//     gender: number,
//     type: string,
//     birthday: string,
//     _links: {
//         self: {
//             href: string;
//         },
//         ownerid: {
//             href: string;
//         },
//     }
// }