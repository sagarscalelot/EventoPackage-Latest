import React, { useEffect, useState } from "react";
import Modal from "../../../../Common/Modals/Modal";
import { useNavigate, useParams } from "react-router-dom";
// import Advertisement from '../Advertisement';
import StepProgressBar from "../../StepProgressBar";
import { s3Url } from "../../../../config";
import { decrement, increment } from "../../../../Common/CommonSlice/stepProgressCountSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EventPopUpUploadPhoto from "../../../../component/Popups/DashboardPopup/EventPopUpUploadPhoto";
import EventPopUpUploadVideo from "../../../../component/Popups/DashboardPopup/EventPopUpUploadVideo";
import { AllMedia, mediaId } from "./photoAndVideoSlice";
import { useIntl } from "react-intl";

const EventPhotosAndVideos = () => {
	const intl = useIntl();
  const displayName = localStorage.getItem("displayName");
  const [isUploadPhotoPopUpOpen, setIsUploadPhotoPopUpOpen] = useState(false);
  const [isUploadVideoPopUpOpen, setIsUploadVideoPopUpOpen] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = localStorage.getItem("eventId");
  const eventType = params.eventType;

  const getMedia = async () => {
    try {
      const response = await dispatch(mediaId(eventId)).unwrap()
      if (response.data.Data.photos) setImageList(response.data?.Data?.photos);
      if (response.data.Data.videos) setVideoList(response.data?.Data?.videos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, [isUploadPhotoPopUpOpen, isUploadVideoPopUpOpen]);

  const removeImageClick = async (index) => {
    const tmpList = imageList;
    if (index === 0) tmpList.shift();
    else if (tmpList.length > 1) tmpList.splice(index, 1);
    let payload = {
      eventid: eventId,
      photos: tmpList,
    };
    try {
      const res = await dispatch(AllMedia(payload)).unwrap();
      console.log("Image>>", res);
      if (res.data.IsSuccess) {
        toast.success(`${intl.formatMessage({ id: "IMAGE REMOVED SUCCESSFULLY." })}`);
        getMedia();
      }
    } catch (error) {
      toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
      console.log(error);
    }
  };

  const removeVideoClick = async (index) => {
    console.log(index);
    const tmpList = videoList;
    if (index === 0) tmpList.shift();
    else if (tmpList.length > 1) tmpList.splice(index, 1);
    console.log(tmpList);
    // without below line UI not Updating and display removed video insted of remaining one.
    setVideoList([]);
    let payload = {
      eventid: eventId,
      videos: tmpList,
    };
    try {
      const res = await dispatch(AllMedia(payload)).unwrap();
      console.log("Video>>", res);
      if (res.data.IsSuccess) {
        toast.success(`${intl.formatMessage({ id: "VIDEO REMOVED SUCCESSFULLY." })}`);
        getMedia();
      }
    } catch (error) {
      toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
      console.log(error);
    }
  };

  const clickNextHandler = () => {
    // toast.success("Data saved successfully.");
    dispatch(increment());
    if (eventType === "gsb") navigate(`../additem`);
    else if (eventType === "psb") navigate(`../addequipments`);
    else navigate(`../addservices`);
  };

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  };

  const openUploadPhoto = () =>  {
    setIsUploadPhotoPopUpOpen(true)
    if(imageList.length > 14  ){
      toast.error(`${intl.formatMessage({ id: "ONLY 15 IMAGES ARE ALLOW" })}`);

    }
  }

  return (
    //  <!-- Content In -->
    <div>
      <div className="wrapper min-h-full">
        <div className="space-y-8 h-full">
          {/* <!-- title-holder  --> */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i
                className="icon-back-arrow mr-4 text-2xl"
                onClick={clickBackHander}
              ></i>
              <h1>{displayName}</h1>
            </div>
          </div>
          {/* <!-- step-progress-bar  --> */}
          <StepProgressBar eventType={eventType} />
          {/* <!-- main-content  --> */}
          <div className="space-y-5">
            <div className="upload-holder">
              <h3 className="flex items-end">
              {intl.formatMessage({ id: "PHOTO" })}
                <span className="input-titel ml-2">{intl.formatMessage({ id: "15 IMAGES" })} ({intl.formatMessage({ id: "UP TO 3MB" })} / {intl.formatMessage({ id: "IMAGE" })})
                </span>
              </h3>
              <label
                onClick={() =>openUploadPhoto() }
                htmlFor="upload"
                className="upload"
              >
                <input
                  name="images"
                  id="upload"
                  className="appearance-none hidden"
                />
                <span className="input-titel mt-1">
                  <i className="icon-image mr-2"></i>{intl.formatMessage({ id: "UPLOAD IMAGES" })}
                </span>
              </label>
              {imageList?.length !== 0 && (
                <span className="input-titel mt-1">
                  {imageList?.length} {intl.formatMessage({ id: "IMAGES UPLOADED" })}
                </span>
              )}
            </div>
            <div className="media-upload-holder">
              {imageList?.length !== 0 && (
                <span className="input-titel">{intl.formatMessage({ id: "UPLOADED PHOTO" })}</span>
              )}
              <div className="flex flex-wrap herobox">
                {imageList?.map((img, index) => (
                  <div key={index} className="mt-2 mr-2">
                    <div className="upload-box">
                      <div className="rounded relative overflow-hidden flex justify-center items-center h-full">
                        <img
                          src={s3Url + "/" + img.url}
                          alt={"upload-" + index}
                        />
                        <button onClick={() => removeImageClick(index)}>
                        {intl.formatMessage({ id: "REMOVE" })}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="upload-holder">
              <h3 className="flex items-end">
              {intl.formatMessage({ id: "VIDEOS" })}
                <span className="input-titel ml-2">{intl.formatMessage({ id: "2" })} {intl.formatMessage({ id: "VIDEOS" })} ({intl.formatMessage({ id: "UP TO 512MB" })} / {intl.formatMessage({ id: "VIDEO" })})
                </span>
              </h3>
              <label
                onClick={() => setIsUploadVideoPopUpOpen(true)}
                htmlFor="upload2"
                className="upload"
              >
                <input
                  name="images"
                  id="upload2"
                  className="appearance-none hidden"
                />
                <div className="mt-1 flex items-baseline justify-center">
                  <i className="icon-video-play text-base mr-2"></i>
                  <span className="input-titel pt-1">{intl.formatMessage({ id: "UPLOAD VIDEOS" })}</span>
                </div>
              </label>
              {videoList?.length !== 0 && (
                <span className="input-titel mt-1">
                  {videoList?.length} {intl.formatMessage({ id: "VIDEOS UPLOADED" })}
                </span>
              )}
            </div>
            <div className="media-upload-holder">
              {videoList?.length !== 0 && (
                <span className="input-titel">{intl.formatMessage({ id: "UPLOADED VIDEOS" })}</span>
              )}
              <div className="flex space-x-2.5">
                {videoList?.map((vid, index) => (
                  <div className="upload-box" key={index}>
                    <div className="rounded relative overflow-hidden h-full">
                      <video className="h-full">
                        <source
                          src={s3Url + "/" + vid.url}
                          alt={"upload-" + index}
                        />
                      </video>
                      <button onClick={() => removeVideoClick(index)}>
                      {intl.formatMessage({ id: "REMOVE" })}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full inline-block">
              <span className="float-left input-titel text-sm lg:leading-10">
              {intl.formatMessage({ id: "DISCLAIMER - THESE IMAGES AND VIDEOS WILL FIRST BE VERIFIED BY THE ADMIN AND THEN GIVEN THE AUTHORITY." })}
              </span>
            </div>
          </div>
          {/* <!-- advisement --> */}
          {/* <Advertisement /> */}
        </div>
        <div className="prw-next-btn">
          <button
            type="button"
            className="flex items-center"
            onClick={clickBackHander}
          >
            <i className="icon-back-arrow mr-3"></i>
            <h3>{intl.formatMessage({ id: "BACK" })}</h3>
          </button>
          <button
            type="button"
            className="flex items-center active"
            onClick={clickNextHandler}
          >
            <h3>{intl.formatMessage({ id: "NEXT" })}</h3>
            <i className="icon-next-arrow ml-3"></i>
          </button>
        </div>
      </div>
      <div>
        {imageList?.length < 15 && (
          <Modal isOpen={isUploadPhotoPopUpOpen}>
            <EventPopUpUploadPhoto
              handleClose={setIsUploadPhotoPopUpOpen}
              eventId={eventId}
              imageList={imageList}
            />
          </Modal>
        )}
        {videoList?.length < 2 && (
          <Modal isOpen={isUploadVideoPopUpOpen}>
            <EventPopUpUploadVideo
              handleClose={setIsUploadVideoPopUpOpen}
              eventId={eventId}
              videoList={videoList}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default EventPhotosAndVideos;
