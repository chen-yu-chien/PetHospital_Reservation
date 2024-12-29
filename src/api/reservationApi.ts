import axios from "axios";
import { Reservation, ReservationEntry, ReservationResponse } from "../types";

export const getReservation = async (): Promise<ReservationResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/reservations");
    return response.data._embedded.reservations;
}

export const getReservationByPet = async (petid: string): Promise<ReservationResponse[]> => {
  const response = await axios.get("http://localhost:8080/api/pets/" + petid + "/reservations");
  return response.data._embedded.reservations;
}

export const deleteReservation = async (link: string): Promise<ReservationResponse> => {
    const response = await axios.delete(link);
    return response.data
}

export const addReservation = async (reservation: Reservation): Promise<ReservationResponse> => {
    const response = await axios.post("http://localhost:8080/api/reservations", reservation, {
      headers: {
        'Content-Type': 'application/json',
      },  
    });
    
    return response.data;
}

export const updateReservation = async (resEntry: ReservationEntry): Promise<ReservationEntry> => {
  const response = await axios.put(resEntry.url, resEntry.reservation, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.data;
}
