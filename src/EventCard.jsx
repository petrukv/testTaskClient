import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 250px;
  text-align: center;
  cursor: pointer; /* Щоб було видно, що елемент клікабельний */
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const DateInfo = styled.p`
  font-size: 1em;
  color: #555;
`;

const formatEventDates = (start_date, end_date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedStart = new Date(start_date).toLocaleDateString('en-GB', options);
  const formattedEnd = new Date(end_date).toLocaleDateString('en-GB', options);

  return `${formattedStart} - ${formattedEnd}`;
};

const EventCard = ({ event }) => {
  const { id, title, thumbnail, start_date, end_date } = event;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${id}`);
  };

  return (
    <Card onClick={handleClick}>
      <Thumbnail src={thumbnail} alt={title} />
      <Title>{title}</Title>
      <DateInfo>{formatEventDates(start_date, end_date)}</DateInfo>
    </Card>
  );
};

export default EventCard;
