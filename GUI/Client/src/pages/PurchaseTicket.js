import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    width: 'calc(25% - 20px)',
    minWidth: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  snackbar: {
    bottom: '50px',
  },
}));

const RetrieveTicketPage = () => {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setSnackbarMessage('Failed to fetch tickets.');
        setOpenSnackbar(true);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchRemainingTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets/remaining');

        const remainingData = response.data?.tickets || [];
        console.log(remainingData);
        setTickets((prevTickets) =>
          prevTickets.map((ticket) => {
            const match = remainingData.find((data) => data.ticketId === ticket._id);
            return match
              ? {
                  ...ticket,
                  remainingTickets: match.ticketsRemaining,
                  simulationComplete: match.simulationComplete,
                }
              : { ...ticket, remainingTickets: ticket.totalTickets };
          })
        );
      } catch (error) {
        console.error('Error fetching remaining tickets:', error);
        setSnackbarMessage('Failed to fetch remaining tickets.');
        setOpenSnackbar(true);
      }
    };

    // Poll every 5 seconds
    const intervalId = setInterval(fetchRemainingTickets, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleRetrieveTicket = async (ticketId) => {
    if (!userId) {
      setSnackbarMessage('Please log in to purchase tickets.');
      setOpenSnackbar(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/tickets/retrieve', {
        ticketId,
        userId,
      });

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId
            ? {
                ...ticket,
                remainingTickets: ticket.remainingTickets - 1,
              }
            : ticket
        )
      );

      setSnackbarMessage(response.data.message || 'Ticket retrieved successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'An error occurred while retrieving the ticket.';
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          fontFamily: 'revert',
          fontWeight: 'bold',
          color: 'purple',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        Available Tickets
      </Typography>
      <Box className={classes.cardContainer}>
        {tickets.map((ticket) => (
          <Card key={ticket._id} className={classes.card}>
            <img
              src={
                ticket.imageUrl ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGPcht7hUNmEYgM7ne5T6Nl-IG8uE_oFlHfw&s'
              }
              alt={ticket.title || 'Default image'}
              className={classes.cardImage}
            />
            <CardContent>
              <Typography variant="h5">{ticket.title}</Typography>
              <Typography variant="body2">{ticket.description}</Typography>
              <Typography variant="h6">Rs {ticket.price}</Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                style={{ marginTop: '10px', fontWeight: 'bold' }}
              >
                {ticket.simulationComplete
                  ? 'All Tickets Sold'
                  : `Remaining Tickets: ${ticket.remainingTickets}`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ backgroundColor: 'purple', fontFamily: 'monospace' }}
                onClick={() => handleRetrieveTicket(ticket._id)}
                disabled={isLoading || ticket.remainingTickets <= 0}
              >
                {isLoading ? 'Retrieving...' : 'Buy Ticket'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        className={classes.snackbar}
      />
    </Box>
  );
};

export default RetrieveTicketPage;
