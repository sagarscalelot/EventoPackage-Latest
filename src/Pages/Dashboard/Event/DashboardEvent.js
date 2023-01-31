import React, { useEffect, useState } from "react";
import Modal from "../../../Common/Modals/Modal";
import DashboardEventCategoryItem from "./DashboardEventCategoryItem";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../../Common/CommonSlice/stepProgressCountSlice";
import { MoonLoader } from "react-spinners";
import { getEventType } from "../../../shared/helper";
import {
  RemoveEventList,
  getAllEventDetails,
  getCategoryByType,
  liveMultiEvents,
  useCategory,
  useEventList,
} from "../eventSlice";
import { toast } from "react-toastify";
import Paggination from "../../../component/pagination/Paggination";
import EventPopUpCreateNew from "../../../component/Popups/DashboardPopup/EventPopUpCreateNew";
import { useIntl } from "react-intl";


const DashboardEvent = () => {
  const intl = useIntl();
  const params = useParams();
  const allEventList = useEventList();
  const categoryByType = useCategory();
  const dispatch = useDispatch();
  const [isCreateNewPopUpOpen, setIsCreateNewPopUpOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const eventType = getEventType(params.eventType);
  const limit = 3;
  const [activeList, setActiveList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getAllEvents = async () => {
    const payload = {
      page: pageNo,
      limit: limit,
      event_type: eventType,
      category_name: selectedCategory,
    };
    try {
      await dispatch(getAllEventDetails(payload)).unwrap();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (list) => {
    console.log("back list : ", list);
  };

  const getCategory = async () => {
    try {
      await dispatch(getCategoryByType(eventType)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCategory(categoryByType);
    setAllEvents(allEventList);
  }, [categoryByType, allEventList]);

  useEffect(() => {
    dispatch(RemoveEventList());
    getAllEvents();
  }, [pageNo, selectedCategory]);

  useEffect(() => {
    getCategory();
    dispatch(reset());
  }, [isCreateNewPopUpOpen]);

  const multipleEventlive = async () => {
    console.log("live id : ");
    try {
      let payload = {
        eventids: activeList,
      };
      const response = await dispatch(liveMultiEvents(payload)).unwrap();
      if (response.data.IsSuccess) {
        toast.success(response.data.Message);
        getAllEvents();
        setActiveList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkboxHandler = (e, ele) => {
    if (e.target.checked) {
      // ele.is_live = true;
      console.log("in if");
      setActiveList((current) => [...current, ele._id]);
    } else {
      console.log("in else");
      // ele.is_live = false;

      setActiveList((current) => current.filter((data) => data !== ele._id));
    }
    // handleClick=(activeList)
  };

  const cat = (e) => {
    console.log("e : ", e);
    setSelectedCategory(e);
  };
  // console.log("live list : ", activeList);

  return (
    <div className="wrapper">
      <div className="flex flex-wrap items-center">
        <h1>{intl.formatMessage({ id: "ALL CATEGORY" })}</h1>
        <div className="flex whitespace-nowrap space-x-5 ml-auto">
          <select
            name="All Category"
            className="arrow bg-white pl-5 pr-11 py-3 text-japaneseIndigo font-bold rounded-md tracking-wider appearance-none focus-visible:outline-none"
            onChange={(e) => cat(e.target.value)}
          >
            <option value="">{intl.formatMessage({ id: "ALL CATEGORY" })}</option>
            {category?.map((ele) => (
              <option value={ele?.category_name} key={ele._id}>
                {ele?.category_name}
              </option>
            ))}
          </select>
          <button
            className="bg-white px-5 py-3 text-japaneseIndigo font-bold rounded-md tracking-wider"
            onClick={() => multipleEventlive()}
          >
            {intl.formatMessage({ id: "MULTIPLELIVE" })}
          </button>
          <button
            href="#"
            onClick={() => setIsCreateNewPopUpOpen(true)}
            className="btn-primary"
          >
            <i className="icon-plus mr-3"></i>{intl.formatMessage({ id: "CREATE NEW" })}
          </button>
        </div>
      </div>
      <div className="space-y-5 pt-10 h-auto">
        <MoonLoader
          cssOverride={{ margin: "100px auto" }}
          color={"#20c0E8"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {allEvents.docs?.map((ele, index) => {
          return (
            <React.Fragment key={index}>
              <div className="w-full flex items-center ">
                {ele.is_approved == true ? (
                  <div>
                    <label className="checkbox w-16">
                      <input
                        type="checkbox"
                        className="bg-white"
                        checked={activeList.includes(ele._id)}
                        onChange={(e) => checkboxHandler(e, ele)}
                      />
                      <i className="icon-right"></i>
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className="checkbox w-16">
                      <input
                        type="checkbox"
                        className="bg-white opacity-30"
                        disabled
                      />
                    </label>
                  </div>
                )}

                <DashboardEventCategoryItem
                  key={ele._id}
                  data={ele}
                  liveList={handleClick}
                  getAllEvents={getAllEvents}
                />
              </div>
            </React.Fragment>
          );
        })}
        {!loading &&
          (allEvents?.totalPages > 0 ? (
            <Paggination
              allEvents={allEvents}
              limit={limit}
              setPageNo={setPageNo}
              pageNo={pageNo}
            />
          ) : (
            <h1 style={{ margin: "100px 0" }}>{intl.formatMessage({ id: "NO EVENT FOUND" })}</h1>
          ))}

        <Modal isOpen={isCreateNewPopUpOpen}>
          <EventPopUpCreateNew
            handleClose={setIsCreateNewPopUpOpen}
            eventType={eventType}
            edit={false}
          />
        </Modal>
      </div>
      {/* <!-- advisement --> */}
      {/* {!loading && <Advertisement />} */}
    </div>
  );
};

export default DashboardEvent;
