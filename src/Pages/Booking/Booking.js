import React, { useEffect, useState } from "react";
import bookingImg from "../../assest/images/banner-preview.png";
import userImg from "../../assest/images/landing-page/user-i.png";
import { s3Url } from "../../config";
import BookPage from "./BookPage";
import { MoonLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { userBooking } from "./bookingSlice";
import { useIntl } from "react-intl";
import {
  getCategoryByType,
  useCategory,
  useEventList,
} from "../Dashboard/eventSlice";

const Booking = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [booking, setBooking] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const limit = 3;
  const categoryByType = useCategory();
  const [values, setValues] = useState({
    time: "",
    date: "",
    option: ""
  })
  console.log(values, "valuesvaluesvalues");
  console.log(values, "valuesvaluesvaluesvaluesvalues");
  const BookingList = async () => {
    const payload = {
      page: pageNo,
      limit: limit,
      time: values.time,
      date: values.date,
      event_type: values.option
    };
    try {
      const response = await dispatch(userBooking(payload)).unwrap();
      console.log(response,"responseresponseresponseresponse");
      setBooking(response.data.Data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    BookingList();
  }, [pageNo, values]);

  let catType = [];
  useEffect(() => {
    categoryByType.map((type) => catType.push(type.category_name));
    setCategory(catType.sort());
  }, [categoryByType]);

  return (
    <div className="wrapper min-h-full">
      <div className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center max-[820px]:items-start max-[820px]:flex-col">
          <h1 className="w-4/12">{intl.formatMessage({ id: "BOOKING" })}</h1>
          <div className="w-8/12 flex items-center space-x-2.5 max-[820px]:pt-3 max-[820px]:flex-col max-[820px]:items-start max-[820px]:w-[95%]">
            <span className="w-1/12 text-xl font-bold max-[820px]:w-[30%]">
              {intl.formatMessage({ id: "FILTER" })}
            </span>
            <div className="w-4/12 bg-white flex justify-between items-center py-2 px-3 rounded-md max-[820px]:w-full max-[820px]:mt-3 relative" >
              <input
                type="date"
                className="w-full outline-none"
                placeholder=""
                onChange={(e) => setValues({ ...values, date: e.target.value })}
              />
              <span
                className="icon-calendar pl-2"
              ></span>
            </div>
            <div className="w-3/12 bg-white flex justify-between items-center py-2 px-3 rounded-md max-[820px]:w-full max-[820px]:mt-3" >
              <input
                type="time"
                className="w-full outline-none"
                placeholder=""
                onChange={(e) => setValues({ ...values, time: e.target.value })}
              />
              <span className="icon-time pl-2"></span>
            </div>
            <div className="w-4/12 relative bg-white py-2 px-3 rounded-md max-[820px]:w-full max-[820px]:mt-3">
              <select name="All Category" className="arrow pr-11 text-japaneseIndigo font-bold tracking-wider appearance-none focus-visible:outline-none" onChange={(e) => setValues({ ...values, option: e.target.value })}>
                <option value="have_you_places">{intl.formatMessage({ id: "HAVE_YOU_PLACES" })}    </option>
                <option value="group_skills_business">{intl.formatMessage({ id: "GROUP_SKILLS_BUSINESS" })} </option>
                <option value="personal_skills_business">{intl.formatMessage({ id: "PERSONAL_SKILLS_BUSINESS" })} </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- main-content  --> */}
      <div className="space-y-5 mt-6">
        <MoonLoader
          cssOverride={{ margin: "100px auto" }}
          color={"#20c0E8"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {booking.docs?.map((e) => (
          <div key={e._id} className="w-full bg-white flex p-2.5 rounded-md">
            <div className="w-1/6 relative">
              <img
                src={
                  e && e.url && e.url !== "" ? s3Url + "/" + e.url : bookingImg
                }
                alt="sweet-love-catering-2"
                className="w-full h-full object-cover lg:absolute"
              />
              {/* (s3Url + "/" + data.aboutplace.banner) */}
            </div>
            <div className="w-full px-3">
              <div className="flex justify-between items-center pb-2">
                <h2>{e?.name}</h2>
                <h2>{e?.totalPrice} INR</h2>
              </div>
              <div className="flex items-center space-x-2 pb-5 border-b">
                <img
                  src={
                    e &&
                      e.userid &&
                      e.userid.profile_pic &&
                      e.userid.profile_pic !== ""
                      ? s3Url + "/" + e.userid.profile_pic
                      : userImg
                  }
                  alt="user-3"
                  className="w-9 h-9 rounded-full overflow-hidden object-cover"
                />
                <p className="text-base text-quicksilver font-normal">
                  {e?.userid?.name}
                </p>
              </div>
              <div className="flex items-center justify-between py-5">
                <div className="flex  space-x-7">
                  <div>
                    <span className="text-xs text-quicksilver font-bold">
                      <i className="icon-calendar2 pr-2"></i>
                      {intl.formatMessage({ id: "DATE" })}
                    </span>
                    <p className="text-base">{e?.start_date}</p>
                  </div>
                  <div className="border-x px-7">
                    <span className="text-xs text-quicksilver font-bold">
                      <i className="icon-light-fill-time pr-2"></i>
                      {intl.formatMessage({ id: "TIME" })}
                    </span>
                    <p className="text-base">{e?.start_time}</p>
                  </div>
                  <div>
                    <span className="text-xs text-quicksilver font-bold">
                      <i className="icon-location pr-2"></i>
                      {intl.formatMessage({ id: "LOCATION" })}
                    </span>
                    <p className="text-base">{e?.address}</p>
                  </div>
                </div>
                <a
                  href={
                    e && e?.invoice_url && e?.invoice_url !== ""
                      ? s3Url + "/" + e?.invoice_url
                      : "#"
                  }
                  target={
                    e && e?.invoice_url && e?.invoice_url !== ""
                      ? "_blank"
                      : "#"
                  }
                >
                  <button className="bg-spiroDiscoBall text-base capitalize font-semibold text-white px-7 py-3 rounded-md whitespace-nowrap">
                    {intl.formatMessage({ id: "DOWNLOAD INVOICE" })}
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
        {!loading &&
          (booking?.totalPages > 0 ? (
            <BookPage
              booking={booking}
              limit={limit}
              setPageNo={setPageNo}
              pageNo={pageNo}
            />
          ) : (
            <h1 style={{ margin: "100px 0" }}>
              {intl.formatMessage({ id: "NO BOOKING FOUND" })}
            </h1>
          ))}
      </div>
    </div>
  );
};

export default Booking;
