import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
`;

const CancelButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const email = localStorage.getItem('clientEmail');

  useEffect(() => {
    const fetchEvents = async () => {
      if (email) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/user-registrations/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ client_email: email }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if (data.length > 0) {
            const eventsWithManageCode = await Promise.all(
              data.map(async (registration) => {
                const eventResponse = await fetch(`http://127.0.0.1:8000/api/events/${registration.event}/`);
                if (!eventResponse.ok) {
                  throw new Error('Failed to fetch event details');
                }
                const eventDetails = await eventResponse.json();
                return {
                  ...eventDetails,
                  manage_code: registration.manage_code,
                };
              })
            );

            setEvents(eventsWithManageCode);
          } else {
            setEvents([]);
          }
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }
    };

    fetchEvents();
  }, [email]);

  const handleCancel = async (manageCode) => {
    const email = localStorage.getItem('clientEmail');

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cancel/${manageCode}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_email: email }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          alert("Cannot cancel registration for events lasting longer than 2 days or less than 2 days before the event.");
        } else {
          throw new Error('Failed to cancel registration');
        }
      } else {
        setEvents(events.filter(event => event.manage_code !== manageCode));
      }
    } catch (error) {
      console.error('Error canceling event:', error);
    }
  };

  return (
    <EventsGrid>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={`${event.id}-${event.manage_code}`}>
            <EventCard event={event} />
            <CancelButton onClick={() => handleCancel(event.manage_code)}>Cancel</CancelButton>
          </div>
        ))
      ) : (
        <p>Немає зареєстрованих подій.</p>
      )}
    </EventsGrid>
  );
};

export default RegisteredEvents;
