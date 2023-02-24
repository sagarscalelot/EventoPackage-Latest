import React, { useState, useEffect } from "react";
import EventPopUpCategory from "./EventPopUpCategory.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getEventType } from "../../../shared/helper.js";
import {
  createNewEvent,
  getCategoryByType,
} from "../../../Pages/Dashboard/eventSlice.js";
import { increment } from "../../../Common/CommonSlice/stepProgressCountSlice.jsx";
import Modal from "../../../Common/Modals/Modal.js";
import { useIntl } from "react-intl";

const EventPopUpCreateNew = ({
  handleClose,
  selectedCategory,
  displayName,
  edit,
  eventId,
}) => {
  const intl = useIntl();
  const [isCategoryPopUpOpen, setIsCategoryPopUpOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [newCategoryId, setNewCategoryId] = useState(0);
  const [newCategoryDisplayName, setNewCategoryDisplayName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const eventType = getEventType(params.eventType);

  const getCategory = async () => {
    try {
      const response = await dispatch(getCategoryByType(eventType)).unwrap();
      setCategory(response.data.Data);
      setNewCategoryId(response.data.Data[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    if (edit) {
      setNewCategoryDisplayName(displayName);
    }
  }, [handleClose, isCategoryPopUpOpen]);

  const clickHandler = async () => {
    try {
      let payload = {
        event_type: eventType,
        display_name: newCategoryDisplayName,
        event_category: newCategoryId,
      };
      if (edit) {
        payload['eventid'] = eventId;
      }
      console.log(payload);
      if (newCategoryDisplayName === "" || newCategoryDisplayName === null) {
        toast.warn(`${intl.formatMessage({ id: "DISPLAY NAME CAN NOT BE EMPTY." })}`);
        return;
      }
      console.log(payload, "*--**--*");
      const response = await dispatch(createNewEvent(payload)).unwrap();
      console.log("response", response);
      if (response.data.IsSuccess) {
        // localStorage.setItem("displayName", response.data.Data?.display_name);
        toast.success(response.data.Message);
        handleClose(false);
        if (!edit) {
          dispatch(increment());
          navigate("./addplaces");
        }
        localStorage.setItem("eventId", response.data.Data._id);
        localStorage.setItem("event_type", response.data.Data.event_type);
      } else {
        toast.error(response.data.Message);
        handleClose(false);
      }
    } catch (error) {
      toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
      console.log(error);
    }
  };

  return (
    //    <!-- Create New  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12  max-[640px]:p-8">
            <div className="flex justify-between items-center max-[640px]:items-start max-[640px]:flex-col">
              <h1 className="h1">{intl.formatMessage({ id: "CREATE NEW" })}</h1>
              <div className="flex items-center space-x-6 max-[640px]:justify-between max-[640px]:space-x-20">
                <button
                  onClick={() => {
                    setIsCategoryPopUpOpen(true);
                  }}
                  href="#"
                  className="text-base font-bold text-spiroDiscoBall max-[640px]:pt-2"
                >
                  <i className="icon-plus font-bold text-xs"></i>{" "}
                  <span>{intl.formatMessage({ id: "ADD CATEGORY" })}</span>
                </button>
                <button
                  onClick={() => handleClose(false)}
                  href="#"
                  className="text-xl max-[640px]:pl-6"
                >
                  <i className="icon-close"></i>
                </button>
              </div>
            </div>
            <form className="space-y-5 pt-7">
              <div className="w-full inputHolder">
                <label className="input-titel">{intl.formatMessage({ id: "SELECT CATEGORY" })}</label>
                <select
                  defaultValue={selectedCategory}
                  className="w-full arrow option"
                  onChange={(e) => {
                    setNewCategoryId(
                      e.target[e.target.selectedIndex].getAttribute("data-id")
                    );
                  }}
                >
                  {category &&
                    category.map((element) => (
                      <option
                        key={element._id}
                        value={element.category_name}
                        selected={element.category_name === selectedCategory}
                        data-id={element._id}
                      >
                        {element.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full inputHolder">
                <label className="input-titel">
                  {intl.formatMessage({id:"GIVE DISPLAY NAME OF YOUR CATEGORY"})}
                </label>
                <input
                  className="input"
                  type="text"
                  value={newCategoryDisplayName}
                  onChange={(e) => setNewCategoryDisplayName(e.target.value)}
                />
              </div>
              <a
                href="#"
                className="btn-primary w-full uppercase"
                onClick={() => clickHandler()}
              >
                {intl.formatMessage({id:"SUBMIT"})}
              </a>
            </form>
          </div>
        </div>
      </div>
      <Modal isOpen={isCategoryPopUpOpen}>
        <EventPopUpCategory handleClose={setIsCategoryPopUpOpen} />
      </Modal>
    </div>
  );
};

export default EventPopUpCreateNew;
