import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsPage from './EventsPage';
import Navbar from './Components/Navbar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import EventPage from './EventPage';
import RegisteredEvents from './RegisteredEvents';
import AddEventPage from './AddEventPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientEmail, setClientEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('clientEmail');
    if (token) {
      setIsAuthenticated(true);
      setClientEmail(email);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clientEmail');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setClientEmail={setClientEmail} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/user-registrations" element={<RegisteredEvents  />} />
        <Route path="/add-event" element={<AddEventPage />} />
      </Routes>
    </Router>
  );
};

export default App;
