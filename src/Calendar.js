import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

import { useAuth } from './AuthContext'; 

const MyCalendarPage = () => {
  const { isAuthenticated, user } = useAuth(); 

  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get('/api/calendar-events', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setEvents(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching calendar events:', error);
          setLoading(false);
        });
    }
  }, [isAuthenticated, user.token]);

  const EventComponent = ({ event }) => (
    <>
      {event.income > 0 && <div style={{ color: 'green', backgroundColor: 'white', justifyContent: 'center' }}>Income: {event.income}</div>}
      {event.expense > 0 && <div style={{ color: 'red', backgroundColor: 'white', justifyContent: 'center' }}>Expense: {event.expense}</div>}
    </>
  );

  return (
    <div className="calendar-page">
      <h2>Calendar</h2>
   
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
          views={{
            month: true,
            week: false,
            day: false,
            agenda: false,
          }}
          toolbar={{
            today: false,
            prev: true,
            next: true,
          }}
        />
      )}
    </div>
  );
};

export default MyCalendarPage;
