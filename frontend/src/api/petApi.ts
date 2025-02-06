import axios from "axios";
import { PetResponse } from "../types";

export const getPet = async (): Promise<PetResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/pets");
    return response.data._embedded.pets;
}

export const getPetByOwner = async (ownerid: string): Promise<PetResponse[]> => {
  const response = await axios.get("http://localhost:8080/api/owners/" + ownerid + "/pets");
  return response.data._embedded.pets;
}