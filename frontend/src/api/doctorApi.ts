import axios from "axios";
import { DoctorResponse } from "../types";

const isDev = import.meta.env.DEV
const API_HOST = isDev ? '' : 'https://localhost:8080'

export const getDoctor = async (): Promise<DoctorResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/doctors`);
    return response.data;
}

export const getDoctorByDept = async (dept: string): Promise<DoctorResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/doctors/dept?department=${dept}`);
    return response.data;
}

export const getDoctorByReservation = async (resid: string): Promise<DoctorResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/reservations/` + resid + "/doctor");
    return response.data;
}

export const getDoctorBySchedule = async (scheduleid: string): Promise<DoctorResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/schedules/${scheduleid}/doctor`);
    return response.data;
}