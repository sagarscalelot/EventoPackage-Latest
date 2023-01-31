import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StepProgressBar from "../StepProgressBar";
import { useDispatch } from "react-redux";
import {
  decrement,
  increment,
} from "../../../Common/CommonSlice/stepProgressCountSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  getProfileDetails,
  useProfileDetails,
} from "../../Profile/profileSlice";
import { aboutPlacesPickUpload } from "./AboutPlace/eventAboutPlaceSlice";
import {
  personalDetailId,
  personalDetails,
} from "./PersonalDetails/personalDetailsSlice";
import { useIntl } from "react-intl";

const EventPersonalDetails = () => {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileDetails = useProfileDetails();
  const eventType = params.eventType;
  // const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("per_day");
  const eventId = localStorage.getItem("eventId");

  const [banner, setBanner] = useState("");
  const displayName = localStorage.getItem("displayName");

  const ValidationSchema = Yup.object().shape({
    professional_skill: Yup.string(),
    full_name: Yup.string()
      .min(2, `${intl.formatMessage({ id: "TOO SHORT!" })}`)
      .max(40, `${intl.formatMessage({ id: "TOO LONG!" })}`)
      .required(`${intl.formatMessage({ id: "FULL NAME IS REQUIRED*" })}`),
    mobile: Yup.number()
      .typeError(`${intl.formatMessage({ id: "CONTACT NUMBER MUST BE A DIGIT" })}`)
      .integer()
      .positive(`${intl.formatMessage({ id: "CONTACT NUMBER MUST BE POSITIVE" })}`)
      .required(`${intl.formatMessage({ id: "CONTACT NUMBER IS REQUIRED" })}`),
    alt_mobile_no: Yup.number()
      .typeError(`${intl.formatMessage({ id: "CONTACT NUMBER MUST BE A DIGIT" })}`)
      .integer()
      .positive(`${intl.formatMessage({ id: "CONTACT NUMBER MUST BE POSITIVE" })}`),
    email: Yup.string()
      .email(`${intl.formatMessage({ id: "INVALID EMAIL FORMAT" })}`)
      .required(`${intl.formatMessage({ id: "EMAIL ADDRESS IS REQUIRED*" })}`),
    flat_no: Yup.string(),
    street: Yup.string(),
    area: Yup.string(),
    city: Yup.string().required(`${intl.formatMessage({ id: "CITY NAME IS REQUIRED*" })}`),
    state: Yup.string().required(`${intl.formatMessage({ id: "STATE NAME IS REQUIRED*" })}`),
    pincode: Yup.string()
      .min(6, `${intl.formatMessage({ id: "TOO SHORT!" })}`)
      .max(6, `${intl.formatMessage({ id: "TOO LONG!" })}`)
      .required(`${intl.formatMessage({ id: "PINCODE IS REQUIRED*" })}`),
    price: Yup.number()
      .typeError(`${intl.formatMessage({ id: "PRICE MUST BE A DIGIT" })}`)
      .integer()
      .positive(`${intl.formatMessage({ id: "PRICE MUST BE POSITIVE" })}`)
      .required(`${intl.formatMessage({ id: "PRICE IS REQUIRED" })}`),
  });
  const initialState = {
    professional_skill: "",
    full_name: "",
    mobile: "",
    country_code: "",
    alt_mobile_no: "",
    email: "",
    flat_no: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    price: "",
    clearing_time: "0",
    max_day: "0",
  };
  const [mobileNoHidden, setMobileNoHidden] = useState(false);
  const [emailHidden, setEmailHidden] = useState(false);
  const [count, setCount] = useState(false);

  const clickNextHandler = async (values) => {
    let payload = {
      ...values,
      is_mobile_no_hidden: mobileNoHidden,
      is_email_hidden: emailHidden,
      price_type: priceType,
      banner: banner,
      eventid: eventId,
    };
    try {
      const response = await dispatch(personalDetails(payload)).unwrap();
      console.log("Personal details > ", response);
      if (response.data.IsSuccess) {
        dispatch(increment());
        navigate(`../photosandvideos`);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Something Went Wrong.");
      console.log(error);
    }
  };

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  };

  const addBanner = async (selected) => {
    const formData = new FormData();
    formData.append("file", selected);
    try {
      const response = await dispatch(aboutPlacesPickUpload(formData)).unwrap();
      if (response.data.IsSuccess) {
        setBanner(response.data.Data.url);
        console.log(response.data.Data.url);
        // toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }
  };

  const photoChangeHandler = (event) => {
    const types = ["image/png", "image/jpeg", "image/jpg"];
    let selected = event.target.files[0];
    console.log("selected", selected);
    try {
      if (selected && types.includes(selected.type)) {
        if (selected.size < 3 * 1024 * 1024) {
          setBanner(selected);
          addBanner(selected);
        } else {
          toast.warn("file size is greater than 3MB");
        }
      } else {
        toast.warn("please select image file with jpeg/png.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while Selecting Image.");
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: ValidationSchema,
    onSubmit: clickNextHandler,
  });

  const getProfile = async () => {
    try {
      await dispatch(getProfileDetails()).unwrap();
    } catch (error) {
      console.log(error);
    }
    setCount(true);
  };

  useEffect(() => {
    formik.values.full_name = profileDetails?.name;
    formik.values.mobile = profileDetails?.mobile;
    formik.values.email = profileDetails?.email;
    formik.values.country_code = profileDetails?.country_code;
  }, [profileDetails]);

  const getPersonalDetails = async () => {
    try {
      const response = await dispatch(personalDetailId(eventId)).unwrap();
      if (response.data.Data.personaldetail) {
        formik.setValues(response.data.Data.personaldetail);
        setBanner(response.data.Data.personaldetail.banner);
        // setPrice(response.data.Data.personaldetail.price);
        setPriceType(response.data.Data.personaldetail.price_type);
      }
      if (!response.data.IsSuccess) {
        toast.error("Error occured while fetching data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getPersonalDetails();
  }, [count]);

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="wrapper min-h-full">
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
          <div className="space-y-5 -mx-2">
            <div className="w-full flex items-end flex-wrap">
              <div className="w-full md:w-1/2 px-2 inputHolder">
                <span className="input-titel">
                  {intl.formatMessage({ id: "PROFESSIONAL SKILL" })}
                </span>
                <input
                  type="text"
                  className="input"
                  name="professional_skill"
                  value={formik.values?.professional_skill}
                  onChange={(e) =>
                    setInputValue("professional_skill", e.target.value)
                  }
                />
                <small className="text-red-500 text-xs">
                  {formik.errors.professional_skill}
                </small>
                <br />
              </div>
              <div className="w-full md:w-1/2 px-2 inputHolder">
                <span className="input-titel">
                  {intl.formatMessage({ id: "FULL NAME" })}(
                  {intl.formatMessage({ id: "MR" })} /{" "}
                  {intl.formatMessage({ id: "MRS" })} /{" "}
                  {intl.formatMessage({ id: "MS" })}) <span>*</span>
                </span>
                <input
                  type="text"
                  className="input"
                  name="full_name"
                  value={formik.values?.full_name}
                  onChange={(e) => setInputValue("full_name", e.target.value)}
                  readOnly
                />
                <small className="text-red-500 text-xs">
                  {formik.errors.full_name}
                </small>
                <br />
              </div>
            </div>
            <div className="w-full flex items-end flex-wrap">
              <div className="w-full md:w-1/3 px-2 inputHolder">
                <div className="input-label-holder">
                  <label className="input-titel">
                    {intl.formatMessage({ id: "MOBILE NUMBER" })} <span>*</span>
                  </label>
                  <div className="input-checkd">
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="is_mobile_hidden"
                      onChange={() => setMobileNoHidden(!mobileNoHidden)}
                    />
                    {intl.formatMessage({ id: "HIDDEN" })}
                  </div>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="input max-w-[80px] w-full mr-3"
                    name="country_code"
                    value={formik.values?.country_code}
                    onChange={(e) =>
                      setInputValue("country_code", e.target.value)
                    }
                    readOnly
                  />
                  <input
                    type="text"
                    className="input"
                    name="mobile"
                    value={formik.values?.mobile}
                    onChange={(e) => setInputValue("mobile", e.target.value)}
                    readOnly
                  />
                </div>
                <small className="text-red-500 text-xs">
                  {formik.errors.mobile}
                </small>
                <br />
              </div>
              <div className="w-full md:w-1/3 px-2 inputHolder">
                <label className="input-titel">
                  {intl.formatMessage({ id: "ALTERNATIVE" })}{" "}
                  {intl.formatMessage({ id: "MOBILE NUMBER" })} <span></span>
                </label>
                <input
                  type="text"
                  className="input"
                  name="alt_mobile"
                  value={formik.values?.alt_mobile_no}
                  onChange={(e) => setInputValue("alt_mobile", e.target.value)}
                />
                <small className="text-red-500 text-xs">
                  {formik.errors.alt_mobile_no}
                </small>
                <br />
              </div>
              <div className="w-full md:w-1/3 px-2 inputHolder">
                <div className="input-label-holder">
                  <label className="input-titel">
                    {intl.formatMessage({ id: "EMAIL ADDRESS" })} <span>*</span>
                  </label>
                  <div className="input-checkd">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => setEmailHidden(!emailHidden)}
                    />
                    {intl.formatMessage({ id: "HIDDEN" })}
                  </div>
                </div>
                <input
                  type="text"
                  className="input"
                  name="email"
                  value={formik.values?.email}
                  onChange={(e) => setInputValue("email", e.target.value)}
                  readOnly
                />
                <small className="text-red-500 text-xs">
                  {formik.errors.email}
                </small>
                <br />
              </div>
            </div>
            <div className="upload-holder">
              <span className="input-titel ml-2">
                {intl.formatMessage({ id: "SKILL BANNER" })}
              </span>
              <label htmlFor="upload" className="upload">
                <input
                  type="file"
                  name="images"
                  id="upload"
                  className="appearance-none hidden"
                  onChange={photoChangeHandler}
                />
                <span className="input-titel mt-1">
                  <i className="icon-image mr-2"></i>
                  {intl.formatMessage({ id: "UPLOAD IMAGES" })}
                </span>
              </label>
              <span className="input-titel ml-2">
                {banner ? banner.name || banner : `${intl.formatMessage({ id: "PLEASE SELECT IMAGES" })}`}
              </span>
            </div>
            {/* option 1 */}
            <div className="flex items-center space-x-3">
              <div
                className={
                  "inputHolder " +
                  (priceType === "per_day" && true
                    ? "w-8/12"
                    : (priceType === "per_event"
                        ? "w-7/12 2xl:w-8/12"
                        : "w-7/12 2xl:w-8/12") &&
                      (priceType === "per_hour" ? "w-8/12" : "w-8/12"))
                }
              >
                <span className="input-titel">
                  {intl.formatMessage({ id: "PRICE" })}
                  <span>*</span>
                </span>
                <label
                  htmlFor=""
                  className="flex items-center w-full bg-white p-2 px-3.5 rounded-md"
                >
                  <div className="w-full inputHolder">
                    <input
                      type="text"
                      className="w-full outline-none text-spiroDiscoBall font-bold text-base"
                      value={formik.values?.price}
                      name="price"
                      onChange={(e) => setInputValue("price", e.target.value)}
                    />
                  </div>
                  <div className="selectPrice flex items-center space-x-3">
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value="per_day"
                        className="hidden"
                        checked={priceType === "per_day" && true}
                        onChange={(e) => setPriceType("per_day")}
                      />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
                        {intl.formatMessage({ id: "PER" })} /{" "}
                        {intl.formatMessage({ id: "DAY" })}
                      </span>
                    </label>
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value="per_hour"
                        className="hidden"
                        checked={priceType === "per_hour" && true}
                        onChange={(e) => setPriceType("per_hour")}
                      />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
                        {intl.formatMessage({ id: "PER" })} /{" "}
                        {intl.formatMessage({ id: "HOUR" })}
                      </span>
                    </label>
                    <label className="block cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value="per_event"
                        className="hidden"
                        checked={priceType === "per_event" && true}
                        onChange={(e) => setPriceType("per_event")}
                      />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
                        {intl.formatMessage({ id: "PER" })} /{" "}
                        {intl.formatMessage({ id: "EVENT" })}
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div
                className={
                  "inputHolder " +
                  (priceType === "per_hour"
                    ? "w-4/12"
                    : priceType === "per_event"
                    ? "w-4/12 2xl:w-2/12"
                    : priceType === "per_day"
                    ? "w-4/12"
                    : "hidden")
                }
              >
                <label className="input-titel">
                  {intl.formatMessage({ id: "CLEARING TIME (IN HOURS)" })}{" "}
                  <span>*</span>
                </label>
                <input
                  type="number"
                  className="input py-[14px]"
                  name="clearning time"
                  value={formik.values?.clearing_time}
                  onChange={(e) =>
                    setInputValue("clearing_time", e.target.value)
                  }
                />
              </div>
              <div
                className={
                  "inputHolder " +
                  (priceType === "per_event" ? "w-2/12" : "hidden")
                }
              >
                <label className="input-titel">
                  {intl.formatMessage({ id: "MAX DAY (IN DAYS)" })}
                  <span>*</span>
                </label>
                <input
                  type="number"
                  className="input py-[14px]"
                  name="max_day"
                  value={formik.values?.max_day}
                  onChange={(e) => setInputValue("max_day", e.target.value)}
                />
              </div>
            </div>
            <small className="text-red-500 text-xs">
              {formik.errors.price}
            </small>
            <div className="space-y-5">
              <h3 className="px-2">{intl.formatMessage({ id: "ADDRESS" })}</h3>
              <div className="w-full flex flex-wrap">
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <span className="input-titel">
                    {intl.formatMessage({ id: "FLAT NO." })}
                  </span>
                  <input
                    type="text"
                    className="input"
                    name="flat_no"
                    value={formik.values?.flat_no}
                    onChange={(e) => setInputValue("flat_no", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.flat_no}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <span className="input-titel">
                    {intl.formatMessage({ id: "STREET NAME." })}
                  </span>
                  <input
                    type="text"
                    className="input"
                    name="street"
                    value={formik.values?.street}
                    onChange={(e) => setInputValue("street", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.street}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <span className="input-titel">
                    {intl.formatMessage({ id: "AREA NAME." })}
                  </span>
                  <input
                    type="text"
                    className="input"
                    name="area"
                    value={formik.values?.area}
                    onChange={(e) => setInputValue("area", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.area}
                  </small>
                  <br />
                </div>
              </div>
              <div className="w-full flex flex-wrap">
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <label className="input-titel">
                    {intl.formatMessage({ id: "CITY" })} <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    name="city"
                    value={formik.values?.city}
                    onChange={(e) => setInputValue("city", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.city}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <label className="input-titel">
                    {intl.formatMessage({ id: "STATE" })} <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    name="state"
                    value={formik.values?.state}
                    onChange={(e) => setInputValue("state", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.state}
                  </small>
                  <br />
                </div>
                <div className="w-full md:w-1/3 px-2 inputHolder">
                  <label className="input-titel">
                    {intl.formatMessage({ id: "PINCODE" })} <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    name="pincode"
                    value={formik.values?.pincode}
                    onChange={(e) => setInputValue("pincode", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.pincode}
                  </small>
                  <br />
                </div>
              </div>
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
          <button type="submit" className="flex items-center active">
            <h3>{intl.formatMessage({ id: "NEXT" })}</h3>
            <i className="icon-next-arrow ml-3"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventPersonalDetails;
