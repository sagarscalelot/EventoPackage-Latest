import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import Advertisement from '../Advertisement';
import StepProgressBar from '../../StepProgressBar';
import { decrement, increment } from '../../../../Common/CommonSlice/stepProgressCountSlice';
import { toast, ToastContainer } from 'react-toastify';
import { onlyDigits } from "../../../../shared/constants";
import AutoPlaceSearch from "../../../../component/other/AutoPlaceSearch";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { capacityId, yourCapacity } from './capacitySlice';
import { useIntl } from "react-intl";

const EventCapacity = () => {
  const intl = useIntl();
  const displayName = localStorage.getItem("displayName");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const eventType = params.eventType;
  const eventId = localStorage.getItem("eventId");
  const token = localStorage.getItem("Token");
  const [type, setType] = useState("romantic_stay");
  const [coordinates, setCoordinates] = useState([]);

  const ValidationSchema = Yup.object().shape({
    // person_capacity: Yup.number().typeError('Person Capacity must be a digit').integer().positive("Person Capacity must be positive").required(`${intl.formatMessage({ id: "PERSON CAPACITY IS REQUIRED" })}`),
    // parking_capacity: Yup.number().typeError('Parking Capacity must be a digit').integer().positive("Parking Capacity must be positive").required(`${intl.formatMessage({ id: "PARKING CAPACITY IS REQUIRED" })}`)
  });


  const initialState = {
    eventid: eventId,
    // person_capacity: "",
    // parking_capacity: "",
    flat_no: "",
    street_name: "",
    area_name: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    location: {
      type: "Point",
      coordinates: [coordinates[0], coordinates[1]],
    },

  }

  const [values, setValues] = useState(initialState);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };
  // console.log(values);



  const handleClick = (address, lng, lat) => {
    setCoordinates([lng, lat]);
    values.address = address;
    values.location = {
      type: "Point",
      coordinates: [lng, lat],
    };
  };


  const getCapacity = async () => {
    try {
      const response = await dispatch(capacityId(eventId)).unwrap();
      if (response.data.Data.capacity) {
        setValues(response.data.Data.capacity);
        formik.setValues(response.data.Data.capacity);
        if ('facilities' in response.data.Data.capacity) {
          setType(response.data.Data.capacity?.facilities);
        }
      }
      if (!response.data.IsSuccess) {
        toast.error(`${intl.formatMessage({ id: "ERROR OCCURED WHILE FETCHING DATA." })}`)
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log("co : ", coordinates[0]);
  }
  useEffect(() => {
    getCapacity();
    getLiveLocation();
  }, []);



  const clickNextHandler = async (values) => {
   
    let payload = { ...values, facilities: type, eventid: eventId }
    try {
      const response = await dispatch(yourCapacity(payload)).unwrap();
      if (response.data.IsSuccess) {
        // toast.success(response.data.Message);
        dispatch(increment());
        navigate(`../photosandvideos`);

      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
      console.log(error);
    }

  }

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: ValidationSchema,
    onSubmit: clickNextHandler,
  });

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  }

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        // setStatus(null);
        console.log(position.coords.latitude, position.coords.longitude);
        setCoordinates([position.coords.longitude, position.coords.latitude]);
        values.location = {
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude],
        };
        // setLat(position.coords.latitude);
        // setLng(position.coords.longitude);
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
  }


  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );


  return (
    //   <!-- Content In -->
    <form onSubmit={formik.handleSubmit}>
      <div className="wrapper min-h-full">
        <div className="space-y-8 h-full">
          {/* <!-- title-holder  --> */}
          <div className="flex justify-between items-center">
            <div className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i><h1>{displayName}</h1></div>
          </div>
          {/* <!-- step-progress-bar  --> */}
          <StepProgressBar eventType={eventType} />
          {/* <!-- main-content  --> */}
          <div className="space-y-5">
            {/* <div className="flex items-end -mx-3.5 max-[820px]:flex-col">
              <div className="w-full lg:w-1/3 px-3.5">
                <label htmlFor="selact" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_stay" && true} onChange={(e) => setType("romantic_stay")} />
                  <h3 className="text-base">{intl.formatMessage({ id: "ROMANTIC STAY" })}</h3>
                </label>
              </div>
              <div className="w-full lg:w-1/3 px-3.5 max-[820px]:mt-2">
                <label htmlFor="selact1" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select1" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_lunch_dinner" && true} onChange={(e) => setType('romantic_lunch_dinner')} />
                  <h3 className="text-base">{intl.formatMessage({ id: "ROMANTIC LUNCH / DINNER" })}</h3>
                </label>
              </div>
              <div className="w-full lg:w-1/3 px-3.5 max-[820px]:mt-2">
                <label htmlFor="selact2" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select2" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_candlelight_dinner" && true} onChange={(e) => setType('romantic_candlelight_dinner')} />
                  <h3 className="text-base">{intl.formatMessage({ id: "ROMANTIC CANDLELIGHT DINNER" })}</h3>
                </label>
              </div>
            </div> */}
            
            <div className="space-y-5 max-[768px]:space-y-0">
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
                    onChange={(e) => formik.setFieldValue("flat_no", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.area}
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
                    name="street_name"
                    value={formik.values?.street_name}
                    onChange={(e) => formik.setFieldValue("street_name", e.target.value)}
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
                    name="area_name"
                    value={formik.values?.area_name}
                    onChange={(e) => formik.setFieldValue("area_name", e.target.value)}
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
                    onChange={(e) => formik.setFieldValue("city", e.target.value)}
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
                    onChange={(e) => formik.setFieldValue("state", e.target.value)}
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
                    onChange={(e) => formik.setFieldValue("pincode", e.target.value)}
                  />
                  <small className="text-red-500 text-xs">
                    {formik.errors.pincode}
                  </small>
                  <br />
                </div>
              </div>
            </div>


            <small className="text-red-500 text-xs">{formik.errors.parking_capacity}</small>
            <div className="w-full relative">
              <button type='button' className='absolute bottom-3 right-3 bg-spiroDiscoBall text-base capitalize font-semibold text-white px-7 py-3 rounded-md z-40' onClick={getLiveLocation}>{intl.formatMessage({id: "GET LIVE LOCATION"})}</button>
              <span className="input-titel">{intl.formatMessage({ id: "ADDRESS" })}</span>
              <span className="input-titel">{values.address}</span>
              <div className="w-full flex flex-wrap bg-white p-2 rounded-md min-h-[300px] xl:min-h-[400px]">
                <div className="relative rounded-md w-full">
                  {console.log("add : ", values.location.coordinates)}
                  {Object.keys(values.location).length === 0 ? (
                    <>
                      <AutoPlaceSearch
                        handleClick={handleClick}
                        coordinates={{
                          type: "Point",
                          coordinates: [coordinates[0], coordinates[1]]
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <AutoPlaceSearch
                        handleClick={handleClick}
                        coordinates={values.location}
                        add={values.address}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- advisement --> */}
          {/* <Advertisement /> */}
        </div>
        <div className="prw-next-btn">
          <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>{intl.formatMessage({ id: "BACK" })}</h3></button>
          <button type="submit" className="flex items-center active"><h3>{intl.formatMessage({ id: "NEXT" })}</h3><i className="icon-next-arrow ml-3"></i></button>
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
    </form>
  )
}

export default EventCapacity