import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import Advertisement from "../Advertisement";
import { useDispatch } from 'react-redux';
import StepProgressBar from '../../StepProgressBar';
import { decrement, increment } from '../../../../Common/CommonSlice/stepProgressCountSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { aboutPlaces, aboutPlacesId, aboutPlacesPickUpload } from './eventAboutPlaceSlice';
import { useIntl } from "react-intl";

const EventAboutPlace = () => {
	const intl = useIntl();
	const displayName = localStorage.getItem("displayName");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const [banner, setBanner] = useState("");
	const [priceType, setPriceType] = useState("per_day");
	const [clearTime, setClearTime] = useState("0");
	const [maxDay, setMaxDay] = useState("0");
	const [about, setAbout] = useState("");
	const eventId = localStorage.getItem("eventId");
	const eventType = params.eventType;

	const ValidationSchema = Yup.object().shape({
		place_price: Yup.number().typeError(`${intl.formatMessage({ id: "PRICE MUST BE A DIGIT" })}`).integer().positive(`${intl.formatMessage({ id: "PRICE MUST BE POSITIVE" })}`).required(`${intl.formatMessage({ id: "PRICE IS REQUIRED" })}`)
	});

	const initialState = {
		place_price: "",
		clearing_time: "0",
		max_day: "0",

	}

	const clickNextHandler = async (values) => {
		const payload = {
			...values,
			eventid: eventId,
			price_type: priceType,
			details: about,
			banner: banner,
		}
		try {
			const response = await dispatch(aboutPlaces(payload)).unwrap();
			if (response.data.IsSuccess) {
				toast.success(response.data.Message);
				dispatch(increment());
				navigate("../personaldetails");
			} else {
				toast.error(response.data.Message);
			}


		} catch (error) {
			console.log(error);
			toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
		}
	}

	const addBanner = async (selected) => {
		const formData = new FormData();
		formData.append("file", selected);
		try {
			const response = await dispatch(aboutPlacesPickUpload(formData)).unwrap();
			if (response.data.IsSuccess) {
				setBanner(response.data.Data.url);
				console.log(response)
				// toast.success(response.data.Message);
			} else {
				toast.error(response.data.Message);
			}
		} catch (error) {
			console.log(error);
			toast.error(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
		}
	}

	const photoChangeHandler = (event) => {
		const types = ['image/png', 'image/jpeg', 'image/jpg'];
		let selected = event.target.files[0];
		console.log("selected", selected);
		try {
			if (selected && types.includes(selected.type)) {
				if (selected.size < (3 * 1024 * 1024)) {
					setBanner(selected);
					addBanner(selected);
				}
				else {
					toast.warn(`${intl.formatMessage({ id: "FILE SIZE IS GREATER THAN 3MB" })}`);
				}
			} else {
				toast.warn(`${intl.formatMessage({ id: "PLEASE SELECT IMAGE FILE WITH JPEG/PNG." })}`);
			}
		} catch (error) {
			console.log(error);
			toast.error(`${intl.formatMessage({ id: "ERROR WHILE SELECTING IMAGE." })}`);
		}
	}

	const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}
	const formik = useFormik({
		initialValues: initialState,
		validationSchema: ValidationSchema,
		onSubmit: clickNextHandler,
	});

	const getAboutPlace = async () => {
		try {
			const response = await dispatch(aboutPlacesId(eventId)).unwrap()
			if (response.data.Data.aboutplace) {
				setAbout(response.data.Data.aboutplace.details);
				formik.setValues(response.data.Data.aboutplace);
				setPriceType(response.data.Data.aboutplace.price_type);
				setBanner(response.data.Data.aboutplace.banner);
				setClearTime(response.data.Data.aboutplace.clearing_time);
				setMaxDay(response.data.Data.aboutplace.max_day);
			}
			if (!response.data.IsSuccess) {
				toast.error(`${intl.formatMessage({ id: "ERROR OCCURED WHILE FETCHING DATA." })}`)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getAboutPlace();
	}, []);

	const setInputValue = useCallback(
		(key, value) =>
			formik.setValues({
				...formik.values,
				[key]: value,
			}),
		[formik]
	);

	return (
		//  <!-- Content In -->
		<form onSubmit={formik.handleSubmit}>
			<div className="wrapper min-h-full flex flex-col">
				<div className="space-y-8 h-full">
					{/* <!-- title-holder  -->/ */}
					<div className="flex justify-between items-center">
						<div className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i>
							<h1>{displayName}</h1>
						</div>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<StepProgressBar eventType={eventType} />
					{/* <!-- main-content  --> */}
					<div className="space-y-3">
						<div className="upload-holder">
							<span className="input-titel ml-2">{intl.formatMessage({ id: "PLACE BANNER" })}</span>
							<label htmlFor="upload" className="upload">
								<input type="file" name="images" id="upload" className="appearance-none hidden" onChange={photoChangeHandler} />
								<span className="input-titel mt-1"><i className="icon-image mr-2"></i>{intl.formatMessage({ id: "UPLOAD IMAGES" })}</span>
							</label>
							<span className="input-titel ml-2">{banner ? (banner.name || banner) : `${intl.formatMessage({ id: "PLEASE SELECT IMAGES" })}`}</span>
						</div>

						{/* option 1 */}
						<div className="flex items-center space-x-3 max-[820px]:flex-col max-[820px]:items-start max-[820px]:space-x-0">
							<div className={"inputHolder " + (priceType === "per_day" && true ? 'w-8/12 max-[820px]:w-full' : (priceType === "per_event" ? 'w-7/12 2xl:w-8/12 max-[820px]:w-full' : 'w-7/12 2xl:w-8/12 max-[820px]:w-full') && (priceType === "per_hour" ? 'w-8/12 max-[820px]:w-full' : 'w-8/12 max-[820px]:w-full'))}>
								<span className="input-titel">{intl.formatMessage({ id: "PRICE" })}<span>*</span></span>
								<label htmlFor="" className="flex items-center w-full bg-white p-2 px-3.5 rounded-md max-[640px]:flex-col">
									<div className="w-full inputHolder max-[820px]:pb-1">
										<input type="text" className="w-full outline-none text-spiroDiscoBall font-bold text-base"
											value={formik.values?.place_price} name="place_price" onChange={(e) => setInputValue("place_price", e.target.value)} />
									</div>
									<div className="selectPrice flex items-center space-x-3 max-[768px]:w-full max-[768px]:justify-between">
										<label className="block cursor-pointer">
											<input type="radio" name="price" value="per_day" checked={priceType === "per_day" && true} className="hidden" onChange={(e) => setPriceType("per_day")} />
											<span
												className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
												{intl.formatMessage({ id: "PER" })} / {intl.formatMessage({ id: "DAY" })}
											</span>
										</label>
										<label className="block cursor-pointer">
											<input type="radio" name="price" value="per_hour" className="hidden" checked={priceType === "per_hour" && true} onChange={(e) => setPriceType("per_hour")} />
											<span
												className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
												{intl.formatMessage({ id: "PER" })} / {intl.formatMessage({ id: "HOUR" })}
											</span>
										</label>
										<label className="block cursor-pointer">
											<input type="radio" name="price" value="per_event" className="hidden" checked={priceType === "per_event" && true} onChange={(e) => setPriceType("per_event")} />
											<span
												className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
												{intl.formatMessage({ id: "PER" })} / {intl.formatMessage({ id: "EVENT" })}
											</span>
										</label>
									</div>
								</label>
							</div>
							<div className={"inputHolder " + (priceType === "per_hour" ? 'w-4/12 max-[820px]:w-full' : (priceType === "per_event" ? 'w-4/12 2xl:w-2/12 max-[820px]:w-full' : (priceType === "per_day" ? 'w-4/12 max-[820px]:w-full' : 'hidden')))}>
								<label className="input-titel">{intl.formatMessage({ id: "CLEARING TIME (IN HOURS)" })} <span>*</span></label>
								<input type="number" className="input py-[14px]" name='clearning time' value={formik.values?.clearing_time} onChange={(e) => setInputValue("clearing_time", e.target.value)} />
							</div>
							<div className={"inputHolder " + (priceType === "per_event" ? 'w-2/12 max-[820px]:w-full' : 'hidden')}>
								<label className="input-titel">{intl.formatMessage({ id: "MAX DAY (IN DAYS)" })}<span>*</span></label>
								<input type="number" className="input py-[14px]" name='max_day' value={formik.values?.max_day} onChange={(e) => setInputValue("max_day", e.target.value)} />
							</div>
						</div>
						<small className="text-red-500 text-xs">{formik.errors.place_price}</small>
						<div className="w-full">
							<span className="input-titel">{intl.formatMessage({ id: "ABOUT PLACE" })}</span>
							<textarea name="" id="" cols="30" rows="5" value={about}
								className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md" onChange={(e) => setAbout(e.target.value)}></textarea>
						</div>
					</div>
					{/* <!-- advisement --> */}
					{/* <Advertisement /> */}
				</div>
				<div className="prw-next-btn mt-auto">
					<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>{intl.formatMessage({ id: "BACK" })}</h3></button>
					<button type="submit" className="flex items-center active" ><h3>{intl.formatMessage({ id: "NEXT" })}</h3><i className="icon-next-arrow ml-3"></i></button>
				</div>
			</div>
		</form>
	)
}

export default EventAboutPlace