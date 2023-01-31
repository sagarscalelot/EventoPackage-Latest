import { GET_ONE_EVENT_BY_ID } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const getEventByID = (id) => {
    return apiInstance.get(`${GET_ONE_EVENT_BY_ID}${id}`, {
        headers: authHeader(),
    });
};
