import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  AllMedia,
  uploadPhoto,
} from "../../../Pages/Dashboard/Event/Photos&Videos/photoAndVideoSlice";
import { imageType } from "../../../shared/constants";
import { useIntl } from "react-intl";
import { useDropzone } from "react-dropzone";

const EventPopUpUploadPhoto = ({ handleClose, eventId, imageList }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  //const [currentImageList, setCurrentImageList] = useState(imageList);
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/jpg": [],
        "image/gif": [],
        "image/webp": [],
      },
      maxFiles: 15,
      maxSize: 3140021,
    });

  const token = localStorage.getItem("Token");
  const header = {
    Authorization: `Token ${token}`,
  };
  const imageHeader = {
    Authorization: `Token ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const uploadImage = async () => {
    try {
      const newArr = [];
      for (let index = 0; index < acceptedFiles.length; index++) {
        let formDataImage = new FormData();

        formDataImage.append("file", acceptedFiles[index]);

        var response = new Promise((resolve, reject) => {
          const result = dispatch(uploadPhoto(formDataImage)).unwrap();
          if (result) resolve(result);
        });
        newArr.push(response);
      }
      Promise.all(newArr).then((res) => {
        res.forEach((imageRes) => {
          if (imageRes) {
            imageList.push({
              url: imageRes.data.Data.url,
              description: details,
            });
          }
        });

        const payload = {
          eventid: eventId,
          photos: [...imageList],
        };
        const result = dispatch(AllMedia(payload))
          .unwrap()
          .then((r) => {
            console.log("r : ", r.data.IsSuccess);

            if (r.data.IsSuccess) {
              handleClose(false);
            } else {
              console.log("df");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error) {
      toast.success(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
      console.log(error);
    }
  };

  const submitHandler = async () => {
    if (!error) {
      uploadImage();
    } else {
      console.log("error occured");
    }
  };

  return (
    //  <!-- Upload Photo  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12 max-[640px]:px-10">
            <div className="flex justify-between items-center">
              <h1 className="h1">
                {intl.formatMessage({ id: "UPLOAD PHOTO" })}
              </h1>
              <div>
                <button onClick={() => handleClose(false)} className="text-xl">
                  <i className="icon-close"></i>
                </button>
              </div>
            </div>
            <form className="py-7 space-y-5">
              <div className="upload-holder">
                <h6 className="text-sm font-bold text-quicksilver">
                  {intl.formatMessage({ id: "SELECT PHOTO" })}
                  <span className="text-10">
                    {intl.formatMessage({ id: "15 IMAGES" })} (
                    {intl.formatMessage({ id: "UP TO 3MB" })} /{" "}
                    {intl.formatMessage({ id: "IMAGE" })})
                  </span>
                </h6>
                <div {...getRootProps({ className: "upload upload-popup" })}>
                  <input
                    {...getInputProps()}
                    name="images"
                    id="upload"
                    className="appearance-none hidden"
                  />
                  <span className="input-titel mt-1">
                    <i className="icon-image mr-2"></i>
                    {intl.formatMessage({ id: "CHOOSE IMAGES" })}
                  </span>
                </div>
                {fileRejections.length > 0 ? (
                  <span
                    className="mt-1"
                    style={{ color: "red", fontSize: "14px" }}
                  >
                    {errorMessage}{" "}
                  </span>
                ) : (
                  <span className="mt-1" style={{ fontSize: "14px" }}>
                    {image.name}
                  </span>
                )}
              </div>
              <div className="w-full">
                <span className="input-titel">
                  {intl.formatMessage({ id: "DETAILS" })}
                </span>
                <textarea
                  name="details"
                  id=""
                  cols="30"
                  rows="5"
                  className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md"
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>
              </div>
            </form>
            {/* <Link to="/" className="btn-primary w-full uppercase">Submit</Link> */}
            <div
              className="btn-primary w-full uppercase cursor-pointer"
              onClick={submitHandler}
            >
              {intl.formatMessage({ id: "SUBMIT" })}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default EventPopUpUploadPhoto;
