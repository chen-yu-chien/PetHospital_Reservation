import axios from "axios";
import { ScheduleResponse } from "../types";

export const getSchedule = async (): Promise<ScheduleResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/schedules");
    return response.data._embedded.schedules;
}

export const getScheduleByDoctor = async (doctorid: string): Promise<ScheduleResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/doctors/" + doctorid + "/reservations");
    return response.data._embedded.schedules;
}