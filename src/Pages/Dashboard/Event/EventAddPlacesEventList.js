import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from "../../../Common/Modals/Modal";
import EventPopUpCreateNew from '../../../component/Popups/DashboardPopup/EventPopUpCreateNew';
import { removeEvent } from './AddPlace/eventAddPlaceSlice';
import { useIntl } from "react-intl";

const EventAddPlacesEventList = ({ displayName, categoryName, eventId }) => {
    const intl = useIntl();
    const dispatch = useDispatch()
    const [isCreateNewPopUpOpen, setIsCreateNewPopUpOpen] = useState(false);
    const navigate = useNavigate();
    const event = localStorage.getItem("eventId");
    const deleteClickHandler = async () => {
        let payload = {
            eventid: event
        }
        try {
            const response = await dispatch(removeEvent(payload)).unwrap()
            localStorage.removeItem('eventId');
            localStorage.removeItem('displayName');
            localStorage.removeItem('stepCount');
            navigate(-1);

        } catch (error) {
            console.log(error);
        }
    }

    const editClickHandler = () => {
        setIsCreateNewPopUpOpen(true);
    }

    if (displayName !== "" && categoryName !== "")
        return (
            <div className="w-full flex items-center">
                <div className="w-full px-7 py-5 bg-white rounded">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2>{displayName}</h2>
                            <span className="text-sm text-spiroDiscoBall font-medium tracking-wider">{categoryName}</span>
                        </div>
                        <div className="flex">
                            <div className="flex items-center text-xs text-quicksilver font-semibold tracking-wider pr-4 border-r border-quicksilver cursor-pointer" onClick={deleteClickHandler}><i className="icon-fill-delete mr-1"></i>{intl.formatMessage({ id: "DELETE" })}</div>
                            <div className="flex items-center text-xs text-quicksilver font-semibold tracking-wider pl-4 cursor-pointer" onClick={editClickHandler}><i className="icon-edit mr-1"></i>{intl.formatMessage({ id: "EDIT" })}</div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isCreateNewPopUpOpen} >
                    <EventPopUpCreateNew handleClose={setIsCreateNewPopUpOpen} selectedCategory={categoryName} displayName={displayName} edit={true} eventId={eventId} />
                </Modal>
            </div>
        );
    else if (displayName === "" && categoryName === "") return toast.error("Enable to show Event");
    else
        return "";
}

export default EventAddPlacesEventList;
