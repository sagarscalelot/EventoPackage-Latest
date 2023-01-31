import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decrement, reset } from '../../../../Common/CommonSlice/stepProgressCountSlice';
import { useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from 'react';
import moment from 'moment/moment';
import { Calendar } from 'primereact/calendar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { getOneEventDetails, useEventCalender } from './calenderSlice';
import { useIntl } from "react-intl";


const EventCalendarView = () => {
	const intl = useIntl();
	const stateEventCalender = useEventCalender()
	const displayName = localStorage.getItem("displayName");
	const eventId = localStorage.getItem("eventId");
	const [date, setDate] = useState(new Date());
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [calendarEvents, setCalendarEvents] = useState([]);


	let minDateValue = new Date(new Date().setDate(new Date().getDate() + 1));

	const CalendarViewList = async () => {
		try {
			const response = await dispatch(getOneEventDetails(eventId)).unwrap()
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
		CalendarViewList();
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
					{/* <!-- main-content  --> */}
					<div className="space-y-5">
						<div className="flex items-end -mx-3.5">
							<div className="w-full lg:w-1/3 px-3.5">
								<h3 className="pb-2">{intl.formatMessage({ id: "START DATE & TIME" })}</h3>
								<label className="bg-white rounded-md flex space-x-3 relative">
									<Calendar id="minmax" value={date || new Date()} onChange={(e) => setDate(e.value)} minDate={minDateValue} dateFormat="mm-dd-yy" className="w-full py-1.5 bg-white block rounded-md relative" readOnlyInput />
									<i className="icon-calendar2 absolute top-6 right-5"></i>
								</label>
							</div>
							<div className="w-full lg:w-1/3 px-3.5">
								<h3 className="pb-2">{intl.formatMessage({ id: "END DATE & TIME" })}</h3>
								<label className="bg-white rounded-md flex space-x-3 relative">
									<Calendar id="minmax" value={date || new Date()} onChange={(e) => setDate(e.value)} minDate={minDateValue} dateFormat="mm-dd-yy" className="w-full py-1.5 bg-white block rounded-md relative" readOnlyInput />
									<i className="icon-calendar2 absolute top-6 right-5"></i>
								</label>
							</div>
							<div className="w-full lg:w-1/3 px-3.5">
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
							<div className="w-full lg:w-1/3 px-3.5">
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
						<div className="prw-next-btn flex justify-end">
							<button className="btn-primary" onClick={clickNextHandler}>{intl.formatMessage({ id: "DONE" })}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventCalendarView