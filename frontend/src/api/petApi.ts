import axios from "axios";
import { PetResponse } from "../types";

const isDev = import.meta.env.DEV
const API_HOST = isDev ? '' : 'https://localhost:8080'

export const getPet = async (): Promise<PetResponse[]> => {
    const response = await axios.get(`${API_HOST}/api/pets`);
    return response.data._embedded.pets;
}

export const getPetByOwner = async (ownerLink: string): Promise<PetResponse[]> => {
  if(ownerLink != '') {
    const response = await axios.get(`${API_HOST}` + ownerLink.split("8080")[1]);
    return response.data._embedded.pets;
  }

  return [];
}