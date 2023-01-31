
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getEventByID } from "../../../../redux/services/eventServices/calendarServices";

const initialState = {
    stateEventCalender: []
};

export const getOneEventDetails = createAsyncThunk(
    "event/getEventByID",
    async (id) => {
        return await getEventByID(id);
    }
);

const eventCalenderSlice = createSlice({
    name: "eventCalenderSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOneEventDetails.fulfilled, (state, action) => {
            state.stateEventCalender = action?.payload?.data?.Data;
        })
    },
});
export default eventCalenderSlice.reducer;

export const selectEventCalender = (state) => state.eventCalender.stateEventCalender;

export const useEventCalender = () => {
    const stateEventCalender = useSelector(selectEventCalender);
    return useMemo(() => stateEventCalender, [stateEventCalender]);
};
