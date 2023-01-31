import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import ImageAndVideoPreviewMainSlide from './ImageAndVideoPreviewMainSlide';
import dish1Image from "../../../assest/images/dish-1.png";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { s3Url } from '../../../config';
const ImageAndVideoPreview = ({ handleClose, data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex z-50">
      <button type="button" onClick={() => handleClose(false)} className="absolute right-10 top-10 z-50 rounded-full text-white text-lg"><i className="icon-close"></i></button>
      <div className="relative w-full py-10">
        <div className="swiper-container gallery-top relative max-h-[550px] h-full">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            centeredSlides={true}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            thumbs={{ swiper: thumbsSwiper }}
          >
            {data?.photos?.map(e => (
              <SwiperSlide>

                <ImageAndVideoPreviewMainSlide link={e.url} desc={e.description} />
              </SwiperSlide>

            ))}
          </Swiper>

        </div>
        <div className="swiper-container gallery-thumbs bg-black mt-12">
          <Swiper
            centeredSlides={true}
            slidesPerView={'auto'}
            touchRatio={0.2}
            slideToClickedSlide={true}
            loopedSlides={4}
            spaceBetween={10}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
          onSwiper={setThumbsSwiper}
          >
            {data?.photos?.map(e => (
              <SwiperSlide>

                <ImageAndVideoPreviewMainSlide link={e.url} desc={e.description} />
              </SwiperSlide>

            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ImageAndVideoPreview;