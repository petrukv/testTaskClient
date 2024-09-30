import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);  // 4 карточки в рядок
  padding: 20px;
`;

console.log(localStorage.getItem('token'))

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/events/')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <EventsGrid>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </EventsGrid>
  );
};

export default EventsPage;
