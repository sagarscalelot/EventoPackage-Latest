import React, { useState } from 'react';
import { s3Url } from '../../../../config';
import Modal from '../../../../Common/Modals/Modal';
import EventPopUpAddService from '../../../../component/Popups/DashboardPopup/EventPopUpAddService';
import imagePreview from "../../../../assest/images/image-preview.png";
import { deleteService, selectService } from './addServiceSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useIntl } from "react-intl";

const EventAddServiceListItem = ({ data, edit, eventId, setReload, setActiveList, activeList }) => {
	const intl = useIntl();
	const [isAddServicesPopUpOpen, setIsAddServicesPopUpOpen] = useState(false);
	const dispatch = useDispatch()
	const [isLive, setIsLive] = useState(false);

	const deleteHandler = async () => {
		try {
			let payload = {
				serviceid: data._id
			}
			const response = await dispatch(deleteService(payload)).unwrap()
			if (response.data.IsSuccess) {
				toast.success(response.data.Message)
			}
			setReload(current => !current);
		} catch (error) {
			console.log(error);
			console.log("Something went Wrong");
		}
	}

	const addService = () => {
		if (isLive && !activeList.includes(data._id)) {
			setActiveList(current => [...current, data._id]);
		}
		if (activeList.includes(data._id)) {
			setActiveList(current => current.filter(e => e !== data._id))
		}
	}

	const toggleService = async (e) => {
		let serviceList = [];
		if (e.target.checked) {
			serviceList = [...activeList, data._id];
		} else {
			serviceList = [...activeList.filter(e => e !== data._id)];
		}
		try {
			let payload = {
				eventid: eventId,
				services: serviceList
			}
			await dispatch(selectService(payload)).unwrap()
			setReload(current => !current);
		} catch (error) {
			console.log("Something went Wrong.");
			console.log(error);
		}
	}

	return (
		<div className="bg-white rounderd px-7 py-4">
			<div className="flex justify-between">
				<div className="">
					<div className="w-28 h-28 border-2 border-brightGray rounded-md">
						<img src={data?.photos[0]?.url ? s3Url + "/" + data?.photos[0]?.url : imagePreview} alt="" className="w-full h-full object-cover" />
					</div>
				</div>
				<div className="w-full pl-5">
					<div className="flex justify-between">
						<h2>{data.name}</h2>
						<div className="flex items-center space-x-5">
							<div className="flex items-center">
								<input type="checkbox" checked={activeList?.includes(data?._id)} id="on" className="switch mx-3 order-2" onChange={toggleService} />
								<span className="off text-base font-bold anim order-1 text-caribbeanGreen">{intl.formatMessage({ id: "OFF" })}</span>
								<span className="on text-base font-bold anim order-3">{intl.formatMessage({ id: "ON" })}</span>
							</div>
							{data.quantity && <span
								className="inline-block text-base text-spiroDiscoBall font-bold bg-brightGray py-1.5 px-3.5 rounded">{data.quantity} Qty</span>}
							<a href="#" title="Delete" onClick={() => { deleteHandler() }}><i className="text-center icon-fill-delete text-xl"></i></a>
							<a href="#" title="Edit" onClick={() => setIsAddServicesPopUpOpen(true)}><i className="text-center icon-edit text-xl"></i></a>
						</div>
					</div>
					<p className="text-quicksilver text-sm font-normal leading-6 pt-3 xl:max-w-[90%]"> {data.description} </p>
					{/* <p className="text-quicksilver text-sm font-normal leading-6 pt-3 xl:max-w-[90%]">Lorem Ipsum is simply dummy text of the
				   printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
				   since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
				   specimen book 
				 </p> */}
					<h3 className="text-right">{data.price} INR</h3>
				</div>
			</div>
			<Modal isOpen={isAddServicesPopUpOpen}>
				<EventPopUpAddService handleClose={setIsAddServicesPopUpOpen} data={data} edit={edit} setReload={setReload} />
			</Modal>
		</div>
	)
}

export default EventAddServiceListItem;