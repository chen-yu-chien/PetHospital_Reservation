import axios from "axios";
import { DoctorResponse } from "../types";

export const getDoctor = async (): Promise<DoctorResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/doctors");
    return response.data._embedded.doctors;
}

export const getDoctorByReservation = async (resid: string): Promise<DoctorResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/reservations/" + resid + "/doctor");
    return response.data;
}

export const getDoctorBySchedule = async (scheduleid: string): Promise<DoctorResponse[]> => {
    const response = await axios.get(`http://localhost:8080/api/schedules/${scheduleid}/doctor`);
    return response.data;
}