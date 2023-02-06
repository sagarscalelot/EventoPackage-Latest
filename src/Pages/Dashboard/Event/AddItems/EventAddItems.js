import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from "../../../../Common/Modals/Modal";
import EventPopUpAddItems from '../../../../component/Popups/DashboardPopup/EventPopUpAddItems';
import StepProgressBar from '../../StepProgressBar';
import axios from 'axios';
import { baseUrl } from '../../../../config';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../../../Common/CommonSlice/stepProgressCountSlice';
import { toast, ToastContainer } from 'react-toastify';
import { MoonLoader } from 'react-spinners';
import { additemId, listOfAdditem } from '../../eventSlice';
import EventAddItemListItem from './EventAddItemListItem';
import { useIntl } from "react-intl";

const EventAddItems = () => {
	const displayName = localStorage.getItem("displayName");
	const navigate = useNavigate();
	const params = useParams();
	const intl = useIntl();
	const eventType = params.eventType;
	const eventId = localStorage.getItem("eventId");
	const event_type = localStorage.getItem("event_type");
	const dispatch = useDispatch();
	const [isAddItemPopUpOpen, setIsAddItemPopUpOpen] = useState(false);
	const [itemList, setItemList] = useState([]);
	const [activeList, setActiveList] = useState([]);
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(true);
	const token = localStorage.getItem("Token");

	const getItemList = async () => {
		try {
			const response = await dispatch(listOfAdditem(event_type)).unwrap()
			if (response.data.Data) {
				setItemList(response.data.Data);
				setLoading(false);
				const responseActive = await dispatch(additemId(eventId)).unwrap()
				if (responseActive.data.Data.items) {
					const temp = responseActive.data.Data.items.map(e => {
						return e._id
					})
					setActiveList(temp);
				}
			}
			if (!response.data.IsSuccess) {
				toast.error(`${intl.formatMessage({ id: "ENABLE TO FETCH DATA." })}`);
			}
		} catch (error) {
			toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
			console.log(error);
		}



	}

	useEffect(() => {
		getItemList();
	}, [isAddItemPopUpOpen, reload]);

	const clickNextHandler = () => {
		toast.success(`${intl.formatMessage({ id: "ITEMS SAVED SUCCESSFULLY." })}`);
		dispatch(increment());
		if (eventType === "hyp") navigate(`../capacity`);
		else if (eventType === "gsb") navigate(`../addequipments`)
		else navigate(`../othercost`);
	};

	const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}

	return (
		//  <!-- Content In -->
		<div>
			<div className="wrapper min-h-full">
				<div className="space-y-8">
					<div className="flex justify-between items-center">
						<div className="flex items-center">
							<i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i>
							<h1>{displayName}</h1>
						</div>
						<button onClick={() => setIsAddItemPopUpOpen(true)} className="btn-primary flex items-center"><i className="icon-plus mr-3"></i><span>{intl.formatMessage({ id: "ADD ITEM" })}</span></button>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<StepProgressBar eventType={eventType} />
					<MoonLoader
						cssOverride={{ margin: "100px auto" }}
						color={"#20c0E8"}
						loading={loading}
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
					<div className="pt-5 space-y-3">

						{itemList?.map(element => <EventAddItemListItem data={element} key={element._id} eventId={eventId} edit={true} setReload={setReload} activeList={activeList} setActiveList={setActiveList} />)}

					</div>
				</div>
				{/* <!-- next preview button  --> */}
				<div className="prw-next-btn mt-auto">
					<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>{intl.formatMessage({ id: "BACK" })}</h3></button>
					<button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>{intl.formatMessage({ id: "NEXT" })}</h3><i className="icon-next-arrow ml-3"></i></button>
				</div>
			</div>
			<Modal isOpen={isAddItemPopUpOpen}>
				<EventPopUpAddItems handleClose={setIsAddItemPopUpOpen} setReload={setReload} edit={false} />
			</Modal>
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
	)
}

export default EventAddItems;