import axios from "axios";
import { URL } from "./const";

export const Axios = axios.create({baseURL:URL})