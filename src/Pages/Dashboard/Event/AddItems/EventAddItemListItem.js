import React, { useState } from "react";
import { s3Url } from "../../../../config";
import Modal from "../../../../Common/Modals/Modal";
import EventPopUpAddItems from "../../../../component/Popups/DashboardPopup/EventPopUpAddItems";
import imagePreview from "../../../../assest/images/image-preview.png";
import { deleteItem, selectItem } from "./addItemsSlice";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";

const EventAddItemListItem = ({
  data,
  edit,
  eventId,
  setReload,
  setActiveList,
  activeList,
}) => {
  const [isAddItemPopUpOpen, setIsAddItemPopUpOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const dispatch = useDispatch();
	const intl = useIntl();
  const deleteHandler = async () => {
    try {
      let payload = {
        itemid: data._id,
      };
      await dispatch(deleteItem(payload)).unwrap();
      setReload((current) => !current);
    } catch (error) {
      console.log(error);
      console.log("Something went Wrong");
    }
  };

  const addItem = () => {
    if (isLive && !activeList.includes(data._id)) {
      setActiveList((current) => [...current, data._id]);
    }
    if (activeList.includes(data._id)) {
      setActiveList((current) => current.filter((e) => e !== data._id));
    }
    // toggleService();
  };

  const toggleService = async (e) => {
    let itemList = [];
    if (e.target.checked) {
      itemList = [...activeList, data._id];
      console.log("Checked");
    } else {
      itemList = [...activeList.filter((e) => e !== data._id)];
      console.log("Not Checked");
    }
    try {
      let payload = {
        eventid: eventId,
        items: itemList,
      };
      console.log(itemList);
      const response = await dispatch(selectItem(payload)).unwrap();
      setReload((current) => !current);
    } catch (error) {
      console.log("Something went Wrong.");
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounderd px-7 py-4 max-[600px]:px-4">
      <div className="flex justify-between max-[600px]:flex-col">
        <div className="max-[600px]:justify-center max-[600px]:flex">
          <div className="w-28 h-28 max-[600px]:w-80 max-[600px]:h-64 border-2 border-brightGray rounded-md">
            <img
              src={
                data?.photos[0].url
                  ? s3Url + "/" + data.photos[0]?.url
                  : imagePreview
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full pl-5 max-[600px]:pt-2 max-[600px]:px-2">
          <div className="flex justify-between max-[600px]:flex-col-reverse">
            <h2 className='max-[600px]:pt-3'>{data.name}</h2>
            <div className="flex items-center space-x-5 max-[600px]:space-x-3 max-[600px]:justify-between max-[600px]:flex-wrap">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeList.includes(data?._id)}
                  id="on"
                  className="switch mx-3 order-2"
                  onChange={toggleService}
                />
                <span className="off text-base font-bold anim order-1 text-caribbeanGreen">
                {intl.formatMessage({ id: "OFF" })}
                </span>
                <span className="on text-base font-bold anim order-3">{intl.formatMessage({ id: "ON" })}</span>
              </div>
              {data.quantity && (
                <span className="inline-block text-base text-spiroDiscoBall font-bold bg-brightGray py-1.5 px-3.5 rounded">
                  {data.quantity} Qty
                </span>
              )}
              <a href="#" title="Delete" onClick={deleteHandler}>
                <i className="text-center icon-fill-delete text-xl"></i>
              </a>
              <a
                href="#"
                title="Edit"
                onClick={() => setIsAddItemPopUpOpen(true)}
              >
                <i className="text-center icon-edit text-xl"></i>
              </a>
            </div>
          </div>
          <p className="text-quicksilver text-sm font-normal leading-6 pt-3 max-[600px]:pt-0 xl:max-w-[90%]">
            {" "}
            {data.description}{" "}
          </p>
          <h3 className="text-right max-[600px]:text-left">{data.price} INR</h3>
        </div>
      </div>
      <Modal isOpen={isAddItemPopUpOpen}>
        <EventPopUpAddItems
          handleClose={setIsAddItemPopUpOpen}
          data={data}
          edit={edit}
          setReload={setReload}
        />
      </Modal>
    </div>
  );
};

export default EventAddItemListItem;
