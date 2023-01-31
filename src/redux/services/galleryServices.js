import { GALLERY } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const gallery = () => {
  return apiInstance.get(GALLERY, { headers: authHeader() });
};
