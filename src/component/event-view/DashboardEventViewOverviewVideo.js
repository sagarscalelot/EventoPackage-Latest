import React from "react";
import videoPreview from "../../assest/images/video-preview.png";

const DashboardEventViewOverviewVideo = ({ videoUrl }) => {
  return (
    <div className="ov-p ">
      <div className="rounded relative overflow-hidden border-2">
        {videoUrl ? <video><source src={videoUrl} alt="upload-1"  /></video> : <img src={videoPreview} alt="upload-1" className="w-full py-2" />}
      </div>
    </div>
  );
}

export default DashboardEventViewOverviewVideo;