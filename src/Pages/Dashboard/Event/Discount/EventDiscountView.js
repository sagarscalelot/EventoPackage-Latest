import React, { useEffect, useState } from 'react';
import celebration from "../../../../assest/svg/celebration.svg";
import Modal from '../../../../Common/Modals/Modal'; 
// import StepProgressBar from './StepProgressBar';
import { useNavigate, useParams } from 'react-router-dom';
import { decrement, increment } from '../../../../Common/CommonSlice/stepProgressCountSlice'; 
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import EventPopUpDiscountOnEquipmentOrItem from '../../../../component/Popups/DashboardPopup/EventPopUpDiscountOnEquipmentOrItem'; 
import EventPopUpDiscountOnTotalBill from '../../../../component/Popups/DashboardPopup/EventPopUpDiscountOnTotalBill'; 
import { discountId, discounts, listOfDiscount } from './discountSlice';
import { useIntl } from "react-intl";


const EventDiscountView = () => {
	const displayName = localStorage.getItem("displayName");
	const [isDiscountPopUpOpen, setIsDiscountPopUpOpen] = useState(false);
	const [allDiscount, setAllDiscount] = useState([]);
	const params = useParams();
	const intl = useIntl();
	const eventId = localStorage.getItem("eventId");
	const eventType = params.eventType;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [discount, setDiscount] = useState("");
	const [serviceOn, setServiceOn] = useState(false);
	const [activeList, setActiveList] = useState([]);
	const [selectedDiscount, setSelectedDiscount] = useState({});
	
	const getDiscount = async () => {
		const displayDiscount = [];
		try {

			const response = await dispatch(listOfDiscount()).unwrap()
			
			if (response.data.IsSuccess) {
				try {
					const res = await dispatch(discountId(eventId)).unwrap()
					response.data.Data.map((element) => {
						let isMatched = false;
						res.data.Data.discounts.map(selement => {
							if (selement.sid === element._id) {
								displayDiscount.push(selement);
								isMatched = true;
								setActiveList(current => [...current, selement]);
							}
						});
						if (!isMatched) {
							displayDiscount.push(element);
						}
					});
				} catch (error) {
					console.log(error);
				}
				setAllDiscount(displayDiscount);
			}

		} catch (error) {
			console.log(error);
		}
		console.log("display : ", displayDiscount);
	}
	useEffect(() => {
		getDiscount();
	}, []);


	const createActiveDiscount = async () => {
		try {
			let payload = {
				eventid: eventId, 
				discounts: activeList
			}
			const response = await dispatch(discounts(payload)).unwrap();

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	const initialRender = useRef(true);
	const initialRender2 = useRef(true);

	const clickNextHandler = async () => {
		try {
			// console.log("try");

			const payload = {
				eventid: eventId,
				discounts: activeList
			}
			// console.log("active list : ", activeList);

			console.log("obj : ", payload);

			const createResponse = await dispatch(discounts(payload)).unwrap();

			console.log("res :", createResponse);

		} catch (error) {
			console.log("Error", error);
		}
		// toast.success("Data saved Successfully.");
		navigate(-1);
	}

	const clickBackHandler = () => {
		navigate(-1);
	}

	const gradientStyle = (type) => {
		if (type === "discount_on_total_bill") return " from-[#13e1b094] to-[#13E1B0] ";
		if (type === "discount_on_equipment_or_item") return " from-[#20c0e878] to-[#20C0E8] ";
		if (type === "advance_and_discount_confirmation") return " from-[#faba1585] to-[#FABA15] ";
	}

	const checkboxHandler = (e, ele) => {
		if (e.target.checked) {
			ele.isAdded = true;
			console.log("in if");
			if (ele.sid) {
				ele.sid = ele.sid
			} else {

				ele.sid = ele._id
			}
			setActiveList(current => [...current, ele]);
		} else {
			console.log("in else");

			ele.isAdded = false;
			if (ele.sid) {
				setActiveList(current => current.filter(data => data.sid !== ele.sid))
			} else {
				setActiveList(current => current.filter(data => data._id !== ele._id))
			}
		}
	}

	const editButtonHandler = (ele) => {
		setSelectedDiscount(ele);
		setIsDiscountPopUpOpen(!isDiscountPopUpOpen);
	}

	const handleSubmit = async () => {

		try {
			console.log("try");
			const payload = {
				eventid: eventId,
				discounts: activeList
			}
			// console.log("active list : ", activeList);

			console.log("obj : ", payload);

			const createResponse = await dispatch(discounts(payload)).unwrap();

			console.log("res :", createResponse);

		} catch (error) {
			console.log("Error", error);
		}
	}

	return (
		//    <!-- Content In -->
		<div>
			<div className="wrapper min-h-full">
				<div className="space-y-8 h-full">
					{/* <!-- title-holder  --> */}
					<div className="flex justify-between items-center">
						<div className="flex items-center">
							<i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHandler}></i>
							<h1>{displayName}</h1>
						</div>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<div className="w-full overflow-hidden">
						{/* <StepProgressBar eventType={eventType} /> */}
					</div>
					{/* <!-- main-content  --> */}
					<div className="space-y-5">
						{allDiscount.map(ele =>
							<div className="w-full flex items-center" id={ele._id} key={ele._id}>
								{/* {console.log("tf : ",  ele.isAdded)} */}
								<label className="checkbox w-16">
									<input type="checkbox" className="bg-white"
										checked={ele.isAdded}
										onChange={(e) => checkboxHandler(e, ele)}
									/>
									<i className="icon-right"></i>
								</label>
								<div className={gradientStyle(ele.discounttype) + "bg-gradient-to-r p-5 pr-8 relative overflow-hidden rounded-lg w-full"}>
									<div className="flex justify-between item-basline">
										<div>
											<h1 className="text-white">{ele.discountname}</h1>
											<div className="text-[40px] text-black font-bold">{ele.discount}</div>

											{
												// ele?.services?.length > 0 ?

												// 	ele?.services?.map((e, i) => (
												// 		<span className="text-xs text-white font-normal">
												// 			{e.name}
												// 		</span>
												// 	))
												// 	// <div className="media-upload-holder">
												// 	// 	{/* <!-- photo-holder --> */}
												// 	// 	<div className="w-full">
												// 	// 		<div className="flex flex-wrap -mx-2" >
												// 	// 			{data?.photos?.map((e, i) => (
												// 	// 				<DashboardEventViewOverviewPhoto key={i} alt={e.description} imageUrl={s3Url + "/" + e?.url} />
												// 	// 			))}
												// 	// 		</div>
												// 	// 	</div>
												// 	// </div>
												// 	:
												// 	(ele?.equipments?.length > 0 ?
												// 		ele?.equipments?.map((e, i) => (
												// 			<span className="text-xs text-white font-normal">
												// 				{e.name}
												// 			</span>
												// 		))
												// 		:
												// 		ele?.items?.length > 0 ?
												// 			ele?.items?.map((e, i) => (
												// 				<span className="text-xs text-white font-normal">
												// 					{e.name}
												// 				</span>
												// 			))
												// 			: ele.description
												// 	)

											}
											{/* <span className="text-xs text-white font-normal">{ele?.services.length > 0 ? "a" : "b"}</span>
											<span className="text-xs text-white font-normal">{ele?.equipments ? "c" : "d"}</span>
											<span className="text-xs text-white font-normal">{ele?.items ? "e" : "f"}</span> */}
										<span className="text-xs text-white font-normal">{ele?.description}</span>
									
										</div>
										<div>
											<button onClick={() => editButtonHandler(ele)} className="bg-white p-2 rounded-md text-sm font-bold"><i className="text-sm edit text-black icon-edit mr-2"></i>{intl.formatMessage({ id: "EDIT" })}</button>
											<div className="absolute" style={{ right: "40px", top: "65%", transform: "scale(1.2)" }}>
												<img src={celebration} alt="" />
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					{/* <!-- advisement --> */}
					{/* <Advertisement /> */}
					{/* <!-- next preview button --> */}
					<div className="prw-next-btn flex justify-end">
						<button type="button" className="flex items-center active btn-primary" onClick={clickNextHandler}>{intl.formatMessage({ id: "DONE" })}</button>
					</div>
				</div>
			</div>

			<Modal isOpen={isDiscountPopUpOpen}>
				{/* {console.log("selected dis : ", selectedDiscount.discounttype )} */}
				{selectedDiscount.discounttype === "discount_on_total_bill" ?
					<EventPopUpDiscountOnTotalBill handleClose={setIsDiscountPopUpOpen} eventId={eventId} setSelectedDiscount={setSelectedDiscount} selectedDiscount={selectedDiscount} serviceOn={serviceOn} activeList={activeList} />
					:
					<EventPopUpDiscountOnEquipmentOrItem handleClose={setIsDiscountPopUpOpen} eventId={eventId} setSelectedDiscount={setSelectedDiscount} selectedDiscount={selectedDiscount} serviceOn={serviceOn} activeList={activeList} />}
				{/* <EventPopUpDiscount handleClose={setIsDiscountPopUpOpen} eventId={eventId} setSelectedDiscount={setSelectedDiscount} selectedDiscount={selectedDiscount} serviceOn={serviceOn} /> */}
			</Modal>
		</div>
	)
}

export default EventDiscountView