import React, { useEffect, useState } from 'react'
import DashboardEventReviewListItem from './DashboardEventReviewListItem';
import { useDispatch } from 'react-redux';
import { getOneEventDetails } from '../../Pages/Dashboard/Event/Calendar/calenderSlice';

const DashboardEventReview = () => {
  const dispatch = useDispatch()
  const [allEvents, setAllEvents] = useState([]);
  const eventId = localStorage.getItem("eventId");

  const getEventById = async () => {
    try {
      const response = await dispatch(getOneEventDetails(eventId)).unwrap()
      setAllEvents(response.data.Data.reviews);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEventById();
  }, []);
  return (

    <div className="pt-7 lg:pt-10">
      <div className="w-full space-y-7" id="reviews">
        <div className="w-full space-y-2">
          {allEvents.map(ele => (
            <>
              <DashboardEventReviewListItem key={ele._id} data={ele} />
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardEventReview;
