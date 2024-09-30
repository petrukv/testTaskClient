import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const AddEventPage = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('thumbnail', thumbnail);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      navigate('/user-registrations');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Title</Label>
          <Input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </FormField>
        <FormField>
          <Label>Start Date</Label>
          <Input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </FormField>
        <FormField>
          <Label>End Date</Label>
          <Input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </FormField>
        <FormField>
          <Label>Thumbnail</Label>
          <Input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setThumbnail(e.target.files[0])}
            required 
          />
        </FormField>
        <Button type="submit">Add Event</Button>
      </form>
    </FormContainer>
  );
};

export default AddEventPage;
