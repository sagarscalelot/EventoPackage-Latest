import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { gallery } from "../../redux/services/galleryServices";

const initialState = {
  galleryPic: [],
};
export const userGallery = createAsyncThunk("user/gallery", async () => {
  return await gallery();
});
const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userGallery.fulfilled, (state, action) => {
      state.galleryPic = action?.payload?.data?.Data;
    });
  },
});

export default gallerySlice.reducer;

export const selectGallery = (state) => state.gallery.galleryPic;

export const useGallery = () => {
  const galleryPic = useSelector(selectGallery);
  return useMemo(() => galleryPic, [galleryPic]);
};
