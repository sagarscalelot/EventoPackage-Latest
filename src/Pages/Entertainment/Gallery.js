import React, { useEffect, useState } from "react";
import GalleryAll from "./GalleryAll";
import GalleryPhotos from "./GalleryPhotos";
import GalleryVideos from "./GalleryVideos";
import { userGallery } from "./gallerySlice";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";


const Gallery = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [tab, setTab] = useState(1);

  const getGallery = async () => {
    try {
      await dispatch(userGallery()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div className="flex min-h-full wrapper">
      <div className="flex flex-wrap space-y-7 w-full">
        {/* <!-- title-holder  --> */}
        <div className="space-y-6 w-full">
          <h1 className="w-full"><span>{intl.formatMessage({ id: "GALLERY" })}</span></h1>
          {/* <!-- tab-holder  --> */}
          <div className="teb-holder gallery-holder border-t border-b-0">
            <button
              type="button"
              data-tab="all"
              className={tab === 1 ? "active" : undefined}
              onClick={() => setTab(1)}
            >
            <span>{intl.formatMessage({ id: "ALL" })}</span>
            </button>
            <button
              type="button"
              data-tab="photo"
              className={tab === 2 ? "active" : undefined}
              onClick={() => setTab(2)}
            >
            <span>{intl.formatMessage({ id: "PHOTO" })}</span>
            </button>
            <button
              type="button"
              data-tab="video"
              className={tab === 3 ? "active" : undefined}
              onClick={() => setTab(3)}
            >
            <span>{intl.formatMessage({ id: "VIDEO" })}</span>
            </button>
          </div>
          {/* <!-- gallery-holder / --> */}
          <div className="gallery-holder">
            {tab === 1 && <GalleryAll />}
            {tab === 2 && <GalleryPhotos />}
            {tab === 3 && <GalleryVideos />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
