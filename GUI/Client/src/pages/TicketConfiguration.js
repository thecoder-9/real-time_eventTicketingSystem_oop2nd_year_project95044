import React, { useState } from 'react';
import {TextField, Button, Box, Typography} from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import swal from 'sweetalert';

const CreateTicket = () => {
  const [vendor, setVendor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [totalTickets, setTotalTickets] = useState('');
  const [ticketReleaseRate, setTicketReleaseRate] = useState('');
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState('');
  const [maxTicketCapacity, setMaxTicketCapacity] = useState('');
  const [price, setPrice] = useState(''); 
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [releaseInterval, setReleaseInterval] = useState(''); 
  const [retrievalInterval, setRetrievalInterval] = useState('');

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, vendor: '' }));
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value); // Handle image URL change
    setErrors((prevErrors) => ({ ...prevErrors, imageUrl: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!vendor) newErrors.vendor = 'Vendor is required.';
    if (!title) newErrors.title = 'Title is required.';
    if (!description) newErrors.description = 'Description is required.';
    if (!totalTickets) newErrors.totalTickets = 'Total tickets are required.';
    if (!ticketReleaseRate) newErrors.ticketReleaseRate = 'Ticket release rate is required.';
    if (!customerRetrievalRate) newErrors.customerRetrievalRate = 'Customer retrieval rate is required.';
    if (!maxTicketCapacity) newErrors.maxTicketCapacity = 'Max ticket capacity is required.';
    if (!price) newErrors.price = 'Price is required.'; 
    if (!releaseInterval) newErrors.releaseInterval = 'Release interval is required.';
    if (!retrievalInterval) newErrors.retrievalInterval = 'Retrieval interval is required.';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTicket = {
      vendor,
      title,
      description,
      totalTickets,
      ticketReleaseRate,
      customerRetrievalRate,
      maxTicketCapacity,
      price, 
      releaseInterval, 
      retrievalInterval, 
      created_date: new Date(),
      imageUrl,
    };

    try {
      await axios.post('http://localhost:5000/api/tickets', newTicket);
      swal('Success', 'New ticket added successfully!', 'success');
      setVendor('');
      setTitle('');
      setDescription('');
      setTotalTickets('');
      setTicketReleaseRate('');
      setCustomerRetrievalRate('');
      setMaxTicketCapacity('');
      setPrice('');
      setReleaseInterval(''); 
      setRetrievalInterval('');
      setImageUrl('');
      setErrors({});
    } catch (error) {
      console.error(error);
      swal('Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  const handleNumericChange = (setter, fieldName, min = 0, max = Infinity) => (event) => {
    const value = event.target.value;
  
    // Allow only digits
    if (isNaN(value) || value.includes('.') || parseInt(value, 10) < min || parseInt(value, 10) > max) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Please enter a valid number between ${min} and ${max}.`,
      }));
      return;
    }
  
    setter(value);
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  };
  
  const handleKeyPress = (event) => {
    const key = event.key;
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  };

  return (
    <Box>
      <Box display="flex">
        <Sidebar />
        <Box
          display="flex"
          p={2}
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            flex: 1,
            margin: '15px',
          }}
        >
          {/* Form Section */}
          <Box
            flex={1}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ marginRight: '20px' }}
          >
            <Box alignItems="center" justifyContent="center">
            <Typography
              variant="h4"
              gutterBottom
              style={{
                marginTop: "40px",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: "purple",
                textAlign: "center",
                fontSize:'35px'
              }}
            >
              Add New Configuration
            </Typography>
            </Box>

            <TextField
              fullWidth
              margin="normal"
              label="Ticket Vendor"
              variant="outlined"
              value={vendor}
              onChange={handleVendorChange}
              helperText={errors.vendor}
              error={!!errors.vendor}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Title of the Ticket"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              helperText={errors.title}
              error={!!errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Ticket Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              helperText={errors.description}
              error={!!errors.description}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Total No of Tickets"
              variant="outlined"
              value={totalTickets}
              onChange={handleNumericChange(setTotalTickets, 'totalTickets', 0, 10000000)}
              onKeyPress={handleKeyPress}
              helperText={errors.totalTickets}
              error={!!errors.totalTickets}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Ticket Release Rate"
              variant="outlined"
              value={ticketReleaseRate}
              onChange={handleNumericChange(setTicketReleaseRate, 'ticketReleaseRate', 0, 10000000)}
              onKeyPress={handleKeyPress}
              helperText={errors.ticketReleaseRate}
              error={!!errors.ticketReleaseRate}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              style={{ marginTop: 16 }}
            >
              Create Ticket
            </Button>
          </Box>

          <Box
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '20px',
              marginLeft: '20px',
              marginTop:'75px'
            }}
          >

            <TextField
              fullWidth
              margin="normal"
              label="Customer Retrieval Rate"
              variant="outlined"
              value={customerRetrievalRate}
              onChange={handleNumericChange(setCustomerRetrievalRate, 'customerRetrievalRate', 0, 10000000)}
              onKeyPress={handleKeyPress}
              helperText={errors.customerRetrievalRate}
              error={!!errors.customerRetrievalRate}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Max Ticket Capacity"
              variant="outlined"
              value={maxTicketCapacity}
              onChange={handleNumericChange(setMaxTicketCapacity, 'maxTicketCapacity', 0, 10000000)}
              onKeyPress={handleKeyPress}
              helperText={errors.maxTicketCapacity}
              error={!!errors.maxTicketCapacity}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Release Interval (milliseconds)"
              variant="outlined"
              value={releaseInterval}
              onChange={handleNumericChange(setReleaseInterval, 'releaseInterval', 0, 10000000)}
              helperText={errors.releaseInterval}
              error={!!errors.releaseInterval}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Retrieval Interval (milliseconds)"
              variant="outlined"
              value={retrievalInterval}
              onChange={handleNumericChange(setRetrievalInterval, 'retrievalInterval', 0, 10000000)}
              helperText={errors.retrievalInterval}
              error={!!errors.retrievalInterval}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Ticket Price (Rs)"
              variant="outlined"
              value={price}
              onChange={handleNumericChange(setPrice, 'price', 0, 100000)}
              onKeyPress={handleKeyPress}
              helperText={errors.price}
              error={!!errors.price}
            />

            <TextField
              fullWidth
              margin="normal"
              label="URL of the image"
              variant="outlined"
              value={imageUrl}
              onChange={handleImageUrlChange}
              helperText={errors.imageUrl}
              error={!!errors.imageUrl}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateTicket;
