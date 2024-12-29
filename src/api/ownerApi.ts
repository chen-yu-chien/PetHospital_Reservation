import axios from "axios";
import { OwnerResponse } from "../types";

export const getOwner = async (): Promise<OwnerResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/owners");
    return response.data._embedded.owners;
}
