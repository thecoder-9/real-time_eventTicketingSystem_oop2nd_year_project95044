import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import { Typography, Button } from '@material-ui/core';

const Control = () => {
  const [logs, setLogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogsCleared, setIsLogsCleared] = useState(false); 

  // Function to fetch logs
  const fetchLogs = async () => {
    if (isLogsCleared) {
      return; 
    }
    
    try {
      const response = await axios.get('http://localhost:5000/api/tickets/logs');
      
      console.log("Response Data:", response.data);
      
      if (Array.isArray(response.data.logs)) {
        setLogs(response.data.logs.reverse());
      } else {
        setError('Logs data is not in expected format');
      }
    } catch (err) {
      setError('Failed to fetch logs');
    }
  };

  useEffect(() => {
    fetchLogs();
    
    const intervalId = setInterval(fetchLogs, 1000); 

    return () => clearInterval(intervalId);
  }, [isLogsCleared]); 

  // Function to clear logs
  const clearLogs = () => {
    setLogs([]);
    setIsLogsCleared(true);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '20px', flex: 1 }}>
        <main>
          <Typography
            variant="h4"
            gutterBottom
            style={{
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: 'purple',
              textAlign: 'center',
              marginTop: '40px',
              marginBottom: '20px',
            }}
          >
            Ticket Log
          </Typography>

          <div style={{ textAlign: 'center', marginBottom: '20px', marginLeft:'900px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={clearLogs}
            >
              Clear Logs
            </Button>
          </div>

          <div
            style={{
              width: '100%', 
              maxWidth: '1000px', 
              height: '700px',
              overflowY: 'scroll', 
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor:'#36454F' , // Replace with your image URL
              backgroundSize: 'cover', 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'center',
              color: 'white', 
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              margin: '0 auto',
            }}
          >

            {logs.length === 0 ? (
              <p>No logs available</p>
            ) : (
              <div>
                {logs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>
                    <p>{log}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Control;
