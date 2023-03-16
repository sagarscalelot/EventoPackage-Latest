import { GALLERY, GALLERY_MYPOST } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const gallery = () => {
  return apiInstance.get(GALLERY, { headers: authHeader() });
};
export const galleryPost = () => {
  return apiInstance.get(GALLERY_MYPOST, { headers: authHeader() });
}