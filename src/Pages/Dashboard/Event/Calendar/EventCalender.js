import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StepProgressBar from '../../StepProgressBar';
import { decrement, reset } from '../../../../Common/CommonSlice/stepProgressCountSlice';
import { useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from 'react';
import moment from 'moment/moment';
import { getOneEventDetails, useEventCalender } from './calenderSlice';
import { useIntl } from "react-intl";
import { MoonLoader } from 'react-spinners';

const EventCalender = () => {
	const intl = useIntl();
	const stateEventCalender = useEventCalender()
	console.log(stateEventCalender, "stateEventCalender");
	const displayName = localStorage.getItem("displayName");
	const eventId = localStorage.getItem("eventId");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const eventType = params.eventType;
	const [calendarEvents, setCalendarEvents] = useState([]);
	const [loading, setLoading] = useState(true);


	const setDate = (e) => {
		const date = e.target.value.split("-");
		console.log(new Date(date[0], date[1], date[2]));
	}

	const Calendar = async () => {
		try {
			await dispatch(getOneEventDetails(eventId)).unwrap()
			setLoading(false);
			const attendeeArr = stateEventCalender?.attendee;
			const calendarEvents = [];
			attendeeArr.forEach(attendee => {
				calendarEvents.push({
					title: attendee.name,
					start: new Date((moment.unix(attendee.start_timestamp / 1000)).toString()),
					end: new Date((moment.unix(attendee.end_timestamp / 1000)).toString()),
					color: generateRandomColor()
				});
			});
			setCalendarEvents(calendarEvents);
		} catch (error) {
			console.log(error);
		}
	}


	useEffect(() => {
		Calendar();
	}, [])


	const clickNextHandler = () => {
		dispatch(reset());
		navigate("/dashboard");
	}

	const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}

	const generateRandomColor = () => {
		let maxVal = 0xFFFFFF; // 16777215
		let randomNumber = Math.random() * maxVal;
		randomNumber = Math.floor(randomNumber);
		randomNumber = randomNumber.toString(16);
		let randColor = randomNumber.padStart(6, 0);
		return `#${randColor.toUpperCase()}`
	}


	const year = new Date().getFullYear();




	return (
		// <!-- Content In -->
		<div>
			<div className="wrapper">

				<div className="space-y-8">
					{/* <!-- title-holder  --> */}
					<div className="flex justify-between items-center">
						<div className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i><h1>{displayName}</h1></div>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<StepProgressBar eventType={eventType} />
					{/* <!-- main-content  --> */}
					{
						loading ?
							<MoonLoader
								cssOverride={{ margin: "100px auto" }}
								color={"#20c0E8"}
								loading={loading}
								size={50}
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
							:

							<div className="space-y-5">
								<div className="flex items-end -mx-3.5 max-[820px]:flex-col">
									<div className="w-full lg:w-1/3 px-3.5">
										<h3 className="pb-2">{intl.formatMessage({ id: "START DATE & TIME" })}</h3>
										<label className="bg-white rounded-md flex space-x-3 relative">
											<i className="icon-date-time flex items-center pl-5 absolute left-0 inset-y-0"></i>
											<input type="date" onChange={setDate} className="w-full rounded-md outline-none appearance-none pl-10 py-4" />
										</label>
									</div>
									<div className="w-full lg:w-1/3 px-3.5 max-[820px]:pt-2">
										<h3 className="pb-2">{intl.formatMessage({ id: "END DATE & TIME" })}</h3>
										<label className="bg-white rounded-md flex space-x-3 relative">
											<i className="icon-date-time flex items-center pl-5 absolute left-0 inset-y-0"></i>
											<input type="date" className="w-full rounded-md outline-none appearance-none pl-10 py-4" />
										</label>
									</div>
									<div className="w-full lg:w-1/3 px-3.5 max-[820px]:pt-2">
										<h3 className="pb-2">{intl.formatMessage({ id: "MONTHS" })}</h3>
										<select className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-4 relative arrow">
											<option>{intl.formatMessage({ id: "JANUARY" })}</option>
											<option>{intl.formatMessage({ id: "FEBRUARY" })}</option>
											<option>{intl.formatMessage({ id: "MARCH" })}</option>
											<option>{intl.formatMessage({ id: "APRIL" })}</option>
											<option>{intl.formatMessage({ id: "MAY" })}</option>
											<option>{intl.formatMessage({ id: "JUNE" })}</option>
											<option>{intl.formatMessage({ id: "JULY" })}</option>
											<option>{intl.formatMessage({ id: "AUGUST" })}</option>
											<option>{intl.formatMessage({ id: "SEPTEMBER" })}</option>
											<option>{intl.formatMessage({ id: "OCTOBER" })}</option>
											<option>{intl.formatMessage({ id: "NOVEMBER" })}</option>
											<option>{intl.formatMessage({ id: "DECEMBER" })}</option>
										</select>
									</div>
									<div className="w-full lg:w-1/3 px-3.5 max-[820px]:pt-2">
										<h3 className="pb-2">{intl.formatMessage({ id: "YEARS" })}</h3>
										<select className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-4 relative arrow">
											<option>{year}</option>
											<option>{year + 1}</option>
											<option>{year + 2}</option>
											<option>{year + 3}</option>
											<option>{year + 4}</option>
											<option>{year + 5}</option>
											<option>{year + 6}</option>
											<option>{year + 7}</option>
											<option>{year + 8}</option>
											<option>{year + 9}</option>
										</select>
									</div>
								</div>

								<div className="calendar inline-block justify-center items-center rounded-md drop-shadow-one bg-white w-full px-12 py-7">
									<FullCalendar
										plugins={[dayGridPlugin]}
										initialView="dayGridMonth"
										events={calendarEvents}

									/>
								</div>
								{/* <!-- calendar end --> */}
								{/* <Advertisement /> */}
								<div className="prw-next-btn">
									<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>{intl.formatMessage({ id: "BACK" })}</h3></button>
									<button className="btn-primary" onClick={clickNextHandler}>{intl.formatMessage({ id: "DONE" })}</button>
								</div>
							</div>
					}
				</div>
			</div>
		</div>
	)
}

export default EventCalender