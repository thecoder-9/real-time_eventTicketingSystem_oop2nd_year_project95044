import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../components/Sidebar";

// Custom styles
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    borderCollapse: "collapse",
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: "none",
    border: "none",
  },
  letterhead: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#00693E",
    borderRadius: "8px",
    "& img": {
      width: "100px",
      height: "auto",
    },
    "& h4": {
      fontFamily: "cursive",
      fontWeight: "bold",
      color: "cyan",
    },
    "& p": {
      margin: "5px 0",
    },
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
    "& button": {
      marginLeft: theme.spacing(1),
    },
  },
  tableCell: {
    backgroundColor: "white",
    color: "black",
    border: "1px solid #F0EAD6",
  },
  tableHeadCell: {
    backgroundColor: "#556B2F",
    color: "white",
    border: "1px solid #F0EAD6",
  },
}));

const TicketReport = () => {
  const classes = useStyles();
  const [ticketData, setTicketData] = useState([]);

  // Fetch ticket data from API
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickets");
        setTicketData(response.data);
      } catch (error) {
        console.error("There was an error fetching the ticket data!", error);
      }
    };
    fetchTicketData();
  }, []);

  // Generate PDF function
  const handleDownloadPDF = () => {
    const input = document.querySelector(".printable-area");
    const buttons = document.querySelectorAll(".no-print-button");
    buttons.forEach((button) => (button.style.display = "none"));

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("ticket_report.pdf");

      buttons.forEach((button) => (button.style.display = ""));
    });
  };

  return (
    <Box>
      <Box display="flex">
        <Sidebar />
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          className="printable-area"
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            flex: 1,
            margin: "15px",
          }}
        >
          <Box className={`${classes.buttonsContainer} no-print-button`}>
            <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </Box>
          <Box className={classes.letterhead}>
            <Typography variant="h4" gutterBottom>
              Event Ticketing System
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{color:'white'}}>
              Ticket Management Report
            </Typography>
          </Box>


          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="ticket table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>Vendor</TableCell>
                  <TableCell className={classes.tableHeadCell}>Title</TableCell>
                  <TableCell className={classes.tableHeadCell}>Price</TableCell>
                  <TableCell className={classes.tableHeadCell}>Total Tickets</TableCell>
                  <TableCell className={classes.tableHeadCell}>Release Rate</TableCell>
                  <TableCell className={classes.tableHeadCell}>Retrieval Rate</TableCell>
                  <TableCell className={classes.tableHeadCell}>Release Interval</TableCell>
                  <TableCell className={classes.tableHeadCell}>Retrieval Interval</TableCell>
                  <TableCell className={classes.tableHeadCell}>Max Capacity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketData.map((ticket) => (
                  <TableRow key={ticket._id}>
                    <TableCell className={classes.tableCell}>{ticket.vendor}</TableCell>
                    <TableCell className={classes.tableCell}>{ticket.title}</TableCell>
                    <TableCell className={classes.tableCell}>{ticket.price}</TableCell>
                    <TableCell className={classes.tableCell}>{ticket.totalTickets}</TableCell>
                    <TableCell className={classes.tableCell}>{ticket.ticketReleaseRate}</TableCell>
                    <TableCell className={classes.tableCell}>{ticket.customerRetrievalRate}</TableCell>
                    <TableCell className={classes.tableCell}>{ticket.releaseInterval}</TableCell>
                    <TableCell className={classes.tableCell}>{ticket.retrievalInterval}</TableCell>
                    <TableCell className={classes.tableCell}>{ticket.maxTicketCapacity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketReport;
