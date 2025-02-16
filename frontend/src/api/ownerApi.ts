import axios from "axios";
import { OwnerResponse } from "../types";

const isDev = import.meta.env.DEV
const API_HOST = isDev ? '' : 'https://localhost:8080'

export const getOwner = async (): Promise<OwnerResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/owners`);
    return response.data._embedded.owners;
}

export const getOwnerByIdentifyId = async (identifyId: string): Promise<OwnerResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/owners?identifyId=${identifyId}`);
    return response.data;
}
