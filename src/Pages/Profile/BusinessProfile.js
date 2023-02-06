import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import previewImage from "../../assest/images/image-preview.png";
import { s3Url } from "../../config";
import {
  addBusinessProfileDetails,
  addBusinessProfileImage,
} from "./profileSlice";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";

const BusinessProfile = ({ business, getProfile }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const initalState = {
    name: "",
    email: "",
    dob: "",
    address: "",
    country: "",
    about: "",
    country_code: "",
    mobile: "",
    profile_pic: "",
  };

  const [values, setValues] = useState(initalState);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    setValues({
      name: business?.name,
      email: business?.email,
      dob: business?.dob,
      address: business?.address,
      country: business?.country,
      about: business?.about,
      country_code: business?.country_code,
      mobile: business?.mobile,
      profile_pic: business?.profile_pic,
    });
  }, [business,isDisable]);

  let initialRender = true;
  useEffect(() => {
    if (initialRender) {
      initialRender = false;
    } else {
      if (!isDisable) {
        toast.info(`${intl.formatMessage({ id: "EDIT PROFILE ENABLE." })}`);
      } else {
        toast.info(`${intl.formatMessage({ id: "EDIT PROFILE DISABLE." })}`);
      }
    }
  }, [isDisable]);

  const addPersonalDetails = async () => {
    try {
      const response = await dispatch(
        addBusinessProfileDetails(values)
      ).unwrap();
      if (response.data.IsSuccess) {
        toast.success(response.data.Message);
        getProfile();
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
    }
  };

  const addProfilePic = async (selected) => {
    const formData = new FormData();
    formData.append("file", selected);
    try {
      const response = await dispatch(
        addBusinessProfileImage(formData)
      ).unwrap();
      if (response.data.IsSuccess) {
        // console.log(response)
        toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
    }
  };

  const photoChangeHandler = (event) => {
    const types = ["image/png", "image/jpeg", "image/jpg"];
    let selected = event.target.files[0];
    // console.log("selected", selected);
    try {
      if (selected && types.includes(selected.type)) {
        if (selected.size < 1 * 1024 * 1024) {
          setProfileImage(selected);
          addProfilePic(selected);
        } else {
          toast.warn(`${intl.formatMessage({ id: "FILE SIZE IS GREATER THAN 1MB" })}`);
        }
      } else {
        toast.warn(`${intl.formatMessage({ id: "PLEASE SELECT IMAGE FILE WITH JPEG/PNG." })}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${intl.formatMessage({ id: "ERROR WHILE SELECTING IMAGE." })}`);
    }
  };
  // console.log('details for business', business);
  return (
    <>
      {/* <!-- title-holder  --> */}
      <div className="flex justify-between items-center pt-4">
        <h1>{intl.formatMessage({ id: "BUSINESS PROFILE" })}</h1>
        {isDisable && (
          <button
            className="btn-primary small"
            onClick={() => setIsDisable(false)}
          >
            {intl.formatMessage({ id: "EDIT PROFILE" })}
          </button>
        )}
        {!isDisable && (
          <div className="flex">
            <button
              className="btn-primary small mr-3"
              onClick={() => {
                addPersonalDetails();
                setIsDisable(true);
              }}
            >
              {intl.formatMessage({ id: "SAVE" })}
            </button>
            <button
              className="btn-primary small"
              onClick={() => setIsDisable(true)}
            >
              {intl.formatMessage({ id: "CANCEL" })}
            </button>
          </div>
        )}
      </div>
      {/* <!-- profile image--> */}
      <div className="flex items-center">
        <div className="">
          <div className="w-44 h-44 rounded-full border-8 border-spiroDiscoBall relative mr-9">
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : values?.profile_pic
                  ? s3Url + "/" + values?.profile_pic
                  : previewImage
              }
              alt="pictures"
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
            <div className="absolute bottom-0 right-0 flex justify-center items-center w-10 h-10 rounded-full bg-spiroDiscoBall z-10">
              <i className="icon-camera"></i>
              <input
                type="file"
                onChange={(e) => photoChangeHandler(e)}
                className="opacity-0 absolute inset-0"
              />
              {/* <input type="file" onChange={(e) => !isDisable && photoChangeHandler(e)} disabled={isDisable} className="opacity-0 absolute inset-0"/> */}
            </div>
          </div>
        </div>
        <div className="">
          <h2>{business?.name}</h2>
          <p className="text-xl font-bold text-japaneseIndigo pt-2.5">
            {business?.about}
          </p>
        </div>
      </div>
      {/* <!-- form Edit  --> */}
      <div className="">
        <div className="flex justify-between space-x-5 -mx-2">
          <div className="w-full md:w-1/2 px-2 inputHolder">
            <span className="input-titel">{intl.formatMessage({ id: "NAME" })}</span>
            <input
              type="text"
              className="input font-bold"
              name="name"
              value={values?.name || ""}
              onChange={changeHandler}
              disabled={isDisable}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 inputHolder">
            <span className="input-titel">{intl.formatMessage({ id: "EMAIL" })}</span>
            <input
              type="text"
              className="input font-bold"
              name="email"
              value={values?.email || ""}
              onChange={changeHandler}
              disabled={isDisable}
            />
          </div>
        </div>
        <div className="flex justify-between space-x-5 pt-3 -mx-2">
          <div className="w-1/2 px-2">
            <span className="input-titel">{intl.formatMessage({ id: "PHONE NUMBER" })}</span>
            <div className="flex items-center h-auto space-x-3 mt-1">
              <div className="">
                {/* <select className="text-base text-japaneseIndigo bg-white rounded-md flex space-x-3 profile-arrow outline-0 whitespace-nowrap pl-5 pr-10 py-3.5 relative w-28">
                                        <option>+91</option>
                                        <option>+625</option>
                                        <option>+001</option>
                                    </select> */}
                <input
                  type="text"
                  name="country_code"
                  value={values?.country_code || ""}
                  onChange={changeHandler}
                  disabled={isDisable}
                  className="text-base text-japaneseIndigo bg-white rounded-md flex space-x-3 profile-arrow outline-0 whitespace-nowrap pl-5 pr-10 py-3.5 relative w-28 font-bold"
                />
              </div>
              <div className="max-w-full w-full inputHolder">
                <input
                  type="text"
                  className="input font-bold"
                  name="mobile"
                  value={values?.mobile || ""}
                  onChange={changeHandler}
                  disabled={isDisable}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 inputHolder">
            <span className="input-titel">{intl.formatMessage({ id: "ADDRESS" })}</span>
            <input
              type="text"
              className="input font-bold"
              name="address"
              value={values?.address || ""}
              onChange={changeHandler}
              disabled={isDisable}
            />
          </div>
        </div>
        <div className="flex justify-between space-x-5 pt-3 -mx-2">
          <div className="w-full md:w-1/2 px-2 inputHolder">
            <span className="input-titel">{intl.formatMessage({ id: "DATE OF BIRTH" })}</span>
            <input
              type="text"
              className="input font-bold"
              name="dob"
              placeholder="dd-mm-yyyy"
              value={values?.dob || ""}
              onChange={changeHandler}
              disabled={isDisable}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 inputHolder">
            <span className="input-titel">{intl.formatMessage({ id: "COUNTRY" })}</span>
            <input
              type="text"
              className="input font-bold"
              name="country"
              value={values?.country || ""}
              onChange={changeHandler}
              disabled={isDisable}
            />
          </div>
        </div>
        <div className="w-full pt-3">
          <span className="input-titel">{intl.formatMessage({ id: "ABOUT ME" })}</span>
          <textarea
            name="about"
            id=""
            cols="30"
            rows="5"
            value={values?.about || ""}
            disabled={isDisable}
            onChange={changeHandler}
            className="font-bold outline-none flex items-center w-full bg-white resize-none p-2 px-3.5 rounded-md placeholder:font-bold placeholder:text-japaneseIndigo"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default BusinessProfile;
