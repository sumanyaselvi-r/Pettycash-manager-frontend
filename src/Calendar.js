import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Row, Col } from 'react-bootstrap';

const MyCalendarPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const getEventsForSelectedDate = () => {
    return events.find((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  };

  return (
    <Container fluid className="calendar-page" style={{justifyContent:'center'}}>
      <Row>
        <Col lg={8} className="mb-4">
          <h2> Calendar</h2>
          <ReactCalendar onChange={(date) => setSelectedDate(date)} value={selectedDate} />
          <div>
            {/* Display income and expense amounts for each date below the calendar */}
            {events.map((event) => (
              <div key={event.id}>
                {event.income > 0 && (
                  <div style={{ color: 'green' }}>
                    {new Date(event.start).toDateString()}: Income: {event.income}
                  </div>
                )}
                {event.expense > 0 && (
                  <div style={{ color: 'red' }}>
                    {new Date(event.start).toDateString()}: Expense: {event.expense}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Col>
        <Col lg={4}>
          
          {loading ? (
            <div>Loading...</div>
          ) : (
           
            <div>
             
              {getEventsForSelectedDate() && (
                <div>
                  {getEventsForSelectedDate().income > 0 && (
                    <div style={{ color: 'green' }}>Income: {getEventsForSelectedDate().income}</div>
                  )}
                  {getEventsForSelectedDate().expense > 0 && (
                    <div style={{ color: 'red' }}>Expense: {getEventsForSelectedDate().expense}</div>
                  )}
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyCalendarPage;
