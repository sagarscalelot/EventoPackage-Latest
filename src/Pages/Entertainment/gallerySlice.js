import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { gallery, galleryPost } from "../../redux/services/galleryServices";

const initialState = {
  galleryPic: [],
  galleryMyPost: []
};
export const userGallery = createAsyncThunk("user/gallery", async () => {
  return await gallery();
});

export const userGalleryPost = createAsyncThunk("user/galleryPosts", async () => {
  return await galleryPost();
})

const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userGallery.fulfilled, (state, action) => {
      state.galleryPic = action?.payload?.data?.Data;
    });
    builder.addCase(userGalleryPost.fulfilled, (state, action) => {
      state.galleryMyPost = action?.payload?.data?.Data;
    })
  },
});

export default gallerySlice.reducer;


export const selectGallery = (state) => state.gallery.galleryPic;
export const useGallery = () => {
  const galleryPic = useSelector(selectGallery);
  return useMemo(() => galleryPic, [galleryPic]);
};

export const selectGalleryMyPost = (state) => state.gallery.galleryMyPost;
export const useGalleryPost = () => {
  const galleryMyPost = useSelector(selectGalleryMyPost);
  return useMemo(() => galleryMyPost, [galleryMyPost]);
};
