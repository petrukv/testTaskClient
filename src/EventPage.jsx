import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EventThumbnail = styled.img`
  width: 80%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
`;

const EventTitle = styled.h1`
  font-size: 2em;
  margin-top: 20px;
`;

const EventDates = styled.p`
  font-size: 1.2em;
  color: #555;
`;

const EnrollButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
`;

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState('');
    const email = localStorage.getItem("clientEmail")

    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/events/${id}`);
          const data = await response.json();
          setEvent(data);
        } catch (error) {
          setError('Failed to load event');
        }
      };
  
      fetchEvent();
    }, [id]);
  
    const handleEnroll = async () => {
        const token = localStorage.getItem('token');
      
        if (!token) {
          setError('You need to be logged in to enroll in this event');
          return;
        }
      
        try {
          const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              event: id,
              client_email: email,
            }),
          });
      
          if (response.ok) {
            alert('You have successfully enrolled!');
          } else {
            const errorData = await response.json();
            setError(`Failed to enroll: ${errorData.detail || 'Unknown error'}`);
          }
        } catch (error) {
          setError('Something went wrong. Please try again.');
        }
      };
    if (!event) return <p>Loading...</p>;
  
    return (
      <PageContainer>
        <EventThumbnail src={event.thumbnail} alt={event.title} />
        <EventTitle>{event.title}</EventTitle>
        <EventDates>{`${event.start_date} - ${event.end_date}`}</EventDates>
        <EnrollButton onClick={handleEnroll}>Enroll</EnrollButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PageContainer>
    );
  };
  
  export default EventPage;
  