import React, { useState, useEffect, useCallback } from 'react';
import { s3Url } from "../../config";
import { useGallery } from "../../Pages/Entertainment/gallerySlice";

// import LightGallery"./styles.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-fullscreen.css"
import "lightgallery/css/lg-rotate.css"
import "lightgallery/css/lg-share.css"

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgHash from "lightgallery/plugins/hash";
import lgRotate from "lightgallery/plugins/rotate";
import lgShare from "lightgallery/plugins/share";


const GalleryVideos = () => {
  const galleryPic = useGallery();
    const [gallery, setGallery] = useState([]);
    
    useEffect(() => {
      setGallery(galleryPic?.filter((video) => video.type === "video"));
    }, [galleryPic]);

    const onInit = () => { };
    // lightgallery 
    const getItems = useCallback(() => {
        return gallery.map((e) => {
            const videoSrc = s3Url + "/" + e?.url
            const videoUrl = {
                source: [
                    {
                        src: videoSrc,
                        type: 'video/mp4',
                    },
                ],
                tracks: [
                    {
                        src: videoSrc,
                        kind: "captions",
                        srclang: "en",
                        label: "English",
                        default: true
                    }
                ],
                attributes:
                {
                    preload: true,
                    playsinline: true,
                    controls: true,
                    animateThumb: false,
                    zoomFromOrigin: true,
                    allowMediaOverlap: true,
                    toggleThumb: true,
                    videojs: true
                }

            }
            return (
                <div
                    data-lg-size={encodeURI.size}
                    data-video={JSON.stringify(videoUrl)}
                    className="gallery-preview relative mb-[15px] block cursor-pointer"
                >
                    <video className="w-full" src={videoSrc} />
                </div>
            );
        });
    }, [gallery]);

    return (
        <>
            <div className="w-full relative" id="video">
                <div className="container">
                    <LightGallery
                        onInit={onInit}
                        speed={500}
                        plugins={[lgThumbnail, lgVideo, lgFullscreen, lgHash, lgRotate, lgZoom, lgShare]}
                    >
                        {getItems()}
                    </LightGallery >
                </div>
            </div>
        </>
    )
}

export default GalleryVideos;