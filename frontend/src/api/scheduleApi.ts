import axios from "axios";
import { ScheduleResponse } from "../types";

const isDev = import.meta.env.DEV
const API_HOST = isDev ? '' : 'https://localhost:8080'

export const getSchedule = async (): Promise<ScheduleResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/schedules`);
    return response.data._embedded.schedules;
}

export const getScheduleByDoctorAndDate = async (doctorid: number, date: string): Promise<ScheduleResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/schedules/doctor?doctorid=${doctorid}&date=${date}`);
    return response.data;
}