import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
import {Box,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,TablePagination} from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const CustomPagination = ({ count, page, rowsPerPage, onPageChange }) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      rowsPerPageOptions={[]}
      labelRowsPerPage=""
    />
  );
};

const useStyles = makeStyles((theme) => ({
  searchField: {
    marginBottom: "20px",
    width: "300px",
    borderRadius: "25px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "25px",
      padding: "5px 10px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "8px 14px",
      fontSize: "14px",
    },
  },
  criteriaSelect: {
    marginRight: "45px",
    minWidth: "150px",
    marginBottom: "30px",
  },
  contentContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    flex: 1,
    margin: "15px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "80vh",
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
  },
}));

const ViewTickets = () => {
  const classes = useStyles();
  const [ticketData, setTicketData] = useState([]);
  const [buttonStates, setButtonStates] = useState({}); 
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickets");
        setTicketData(response.data);

        // Initialize button states
        const initialStates = {};
        response.data.forEach((ticket) => {
          initialStates[ticket._id] = { start: false, stop: false };
        });
        setButtonStates(initialStates);
      } catch (error) {
        console.error("There was an error fetching the ticket data!", error);
      }
    };

    fetchTicketData();
  }, []);

  const handleUpdate = (ticketId) => {
    navigate(`/update-ticket/${ticketId}`); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tickets/${id}`);
      setTicketData(ticketData.filter((ticket) => ticket._id !== id));

      Swal.fire("Deleted!", "Ticket has been deleted successfully.", "success");
    } catch (error) {
      console.error("There was an error deleting the ticket!", error);
      Swal.fire("Error!", "Failed to delete the ticket.", "error");
    }
  };

  const handleStartSimulation = async (ticketId) => {
    try {
      await axios.post(`http://localhost:5000/api/tickets/simulation/start`, {
        ticketId,
      });

      Swal.fire(
        "Simulation Started",
        "success"
      );

      setButtonStates((prevStates) => ({
        ...prevStates,
        [ticketId]: { start: true, stop: false },
      }));
    } catch (error) {
      console.error("Error starting simulation", error);
      Swal.fire("Error!", "Failed to start the simulation.", "error");
    }
  };

  const handleStopSimulation = async (ticketId) => {
    try {
      await axios.post(`http://localhost:5000/api/tickets/simulation/stop`, {
        ticketId,
      });

      Swal.fire(
        "Simulation Stopped",
        "success"
      );

      setButtonStates((prevStates) => ({
        ...prevStates,
        [ticketId]: { start: false, stop: true },
      }));
    } catch (error) {
      console.error("Error stopping simulation", error);
      Swal.fire("Error!", "Failed to stop the simulation.", "error");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredTickets = ticketData.filter((ticket) => {
    if (!searchQuery) return true;
    const field = ticket[searchCriteria]?.toString().toLowerCase();
    return field?.startsWith(searchQuery.toLowerCase());
  });

  const paginatedTickets = filteredTickets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box display="flex">
        <Sidebar />
        <Box className={classes.contentContainer}>
          <Box
            alignItems="center"
            justifyContent="space-between"
            marginTop={"60px"}
            width="100%"
            display="flex"
            flexDirection="row"
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{
                marginBottom: "20px",
                fontFamily: "unset",
                fontWeight: "bold",
                color: "purple",
                textAlign: "center",
                fontSize:'35px'
              }}
            >
              Available Ticket Configurations
            </Typography>
          </Box>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table >
              <TableHead>
                <TableRow style={{ backgroundColor: "#353935", color: "white"}}>
                  <TableCell style={{ color: "white" }}>Ticket ID</TableCell>
                  <TableCell style={{ color: "white" }}>Tiocket Vendor</TableCell>
                  <TableCell style={{ color: "white" }}>Ticket Title</TableCell>
                  <TableCell style={{ color: "white" }}>Total Tickets</TableCell>
                  <TableCell style={{ color: "white" }}>Max Capacity</TableCell>
                  <TableCell style={{ color: "white" }}>Release Rate</TableCell>
                  <TableCell style={{ color: "white" }}>Retrieval Rate</TableCell>
                  <TableCell style={{ color: "white" }}>Simulation Start</TableCell>
                  <TableCell style={{ color: "white" }}>Simulation Stop</TableCell>
                  <TableCell style={{ color: "white" }}>Update Ticket</TableCell>
                  <TableCell style={{ color: "white" }}>Delete Ticket</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTickets.map((ticket) => (
                  <TableRow key={ticket._id}>
                    <TableCell>{ticket._id?.slice(-5) ?? ticket.eventTicketId}</TableCell>
                    <TableCell>{ticket.vendor ?? ticket.vendorName}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.totalTickets}</TableCell>
                    <TableCell>{ticket.maxTicketCapacity}</TableCell>
                    <TableCell>{ticket.ticketReleaseRate}</TableCell>
                    <TableCell>{ticket.customerRetrievalRate}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleStartSimulation(ticket._id)}
                        disabled={buttonStates[ticket._id]?.start}
                        variant="contained" 
                        color="primary" 
                        style={{borderRadius:'50px', backgroundColor:'blue'}} 
                      >
                        Start
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleStopSimulation(ticket._id)}
                        disabled={buttonStates[ticket._id]?.stop}
                        variant="contained"
                        color="secondary"  
                        style={{borderRadius:'50px', backgroundColor:'red'}}
                      >
                        Stop
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        style={{ backgroundColor: "orange", color: "white" }}
                        onClick={() => handleUpdate(ticket._id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        style={{ backgroundColor: "#e74c3c", color: "white" }}
                        onClick={() => handleDelete(ticket._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CustomPagination
            count={filteredTickets.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewTickets;
