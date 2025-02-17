import axios from "axios";
import { ScheduleResponse } from "../types";

const isDev = import.meta.env.DEV
const API_HOST = isDev ? '' : 'https://localhost:8080'

export const getSchedule = async (): Promise<ScheduleResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/schedules`);
    return response.data;
}

export const getScheduleByDoctorAndDate = async (doctorid: number, date: string): Promise<ScheduleResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/schedules/search?doctorid=${doctorid}&date=${date}`);
    return response.data;
}

export const getScheduleByDoctorAndDateBetween = async (doctorid: number, startdate: string, enddate: string): Promise<ScheduleResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/schedules/doctor?doctorid=${doctorid}&startdate=${startdate}&enddate=${enddate}`);
    return response.data;
}

export const getScheduleByDateBetween = async (startdate: string, enddate: string): Promise<ScheduleResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/schedules/dates?startdate=${startdate}&enddate=${enddate}`);
    return response.data;
}

export const getScheduleByDeptAndDateBetween = async (dept: string, startdate: string, enddate: string): Promise<ScheduleResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/schedules/dept?dept=${dept}&startdate=${startdate}&enddate=${enddate}`);
    return response.data;
}