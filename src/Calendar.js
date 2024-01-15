import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const MyCalendarPage = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/calendar-events')  // Replace with your API endpoint to fetch calendar events
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching calendar events:', error);
        setLoading(false);
      });
  }, []);

  const EventComponent = ({ event }) => (
    <>
      
      {event.income > 0 && <div style={{ color: 'green',backgroundColor:'white',justifyContent:'center' }}>Income: {event.income}</div>}
      {event.expense > 0 && <div style={{ color: 'red' ,backgroundColor:'white',justifyContent:'center'}}>Expense: {event.expense}</div>}
    </>
  );

  return (
    <div className="calendar-page">
      <h2>Calendar Page</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          components={{
            event: EventComponent,
          }}
        />
      )}
    </div>
  );
};

export default MyCalendarPage;

