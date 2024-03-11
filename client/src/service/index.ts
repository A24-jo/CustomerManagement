//crud de clientes PHP

import { Clients } from "../interface/intefaces";
import { Axios } from "../utils/axios";

export const listclientes = async (): Promise<Clients[] | null> => {
  try {
    const { data } = await Axios.get<Array<Clients>>("/listclients");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createClientes = async (data: Clients): Promise<void> => {
  try {
    await Axios.post("/createclient", data);
  } catch (error) {
    console.log(error);
  }
};

export const updateClientes = async (
  id: string,
  data: Clients
): Promise<void> => {
  try {
    await Axios.put(`/updateclient/${id}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteClient = async (id: string): Promise<boolean> => {
  try {
    await Axios.delete(`/deleteclient/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
