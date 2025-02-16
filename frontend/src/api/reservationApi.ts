import axios from "axios";
import { Reservation, ReservationEntry, ReservationResponse } from "../types";

const isDev = import.meta.env.DEV
const API_HOST = isDev ? '' : 'https://localhost:8080'

export const getReservation = async (): Promise<ReservationResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/reservations`);
    return response.data._embedded.reservations;
}

export const getReservationByOwner = async (identifyId: string): Promise<ReservationResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/reservations/owner?identifyId=${identifyId}`);
    return response.data;
}

export const deleteReservation = async (resid: number): Promise<ReservationResponse> => {
    const response = await axios.delete(`${API_HOST}/api/reservations/${resid}`);
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
  const response = await axios.put(`${API_HOST}/api/reservations/${resEntry.resid}`, resEntry.reservation, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.data;
}
