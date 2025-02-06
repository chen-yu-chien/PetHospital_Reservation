import axios from "axios";
import { Reservation, ReservationEntry, ReservationResponse } from "../types";

const isDev = import.meta.env.DEV
const API_HOST = isDev ? '' : 'https://localhost:8080'

export const getReservation = async (): Promise<ReservationResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/reservations`);
    return response.data._embedded.reservations;
}

export const getReservationByPet = async (petid: string): Promise<ReservationResponse[]> => {
  const response = await axios.get(`${API_HOST}/api/pets/` + petid + "/reservations");
  return response.data._embedded.reservations;
}

export const deleteReservation = async (link: string): Promise<ReservationResponse> => {
    const response = await axios.delete(`${API_HOST}`+ link.split("8080")[1]);
    return response.data
}

export const addReservation = async (reservation: Reservation): Promise<ReservationResponse> => {
    const response = await axios.post(`${API_HOST}/api/reservations`, reservation, {
      headers: {
        'Content-Type': 'application/json',
      },  
    });
    
    return response.data;
}

export const updateReservation = async (resEntry: ReservationEntry): Promise<ReservationEntry> => {
  const response = await axios.put(`${API_HOST}` + resEntry.url.split("8080")[1], resEntry.reservation, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.data;
}
