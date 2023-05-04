import React, { useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

// const users = [
//   { id: 1, name: 'John Doe', email: 'mejohn.doe@example.com' },
//   { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },

// ];

const Mystatevectors = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://opensky-network.org/api/states/all');
        const data = await response.json();
        setFlightData(data.states || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading flights...</p>;
  }

  if (error) {
    return <p>Failed to fetch flights: {error}</p>;
  }

  const handleChangePage = (value) => {
    setPage(page + value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

//   const filteredUsers = flightData.filter((flight) =>
//   flight[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
//   flight[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
//   flight[2].toLowerCase().includes(searchTerm.toLowerCase()) ||

//   (flight[3] && flight[3].toString().includes(searchTerm.toLowerCase()))
// );

const filteredUsers = flightData.filter((flight) => {
  const dateString = flight[3] && new Date(flight[3]*1000).toLocaleString('en-US', {timeZone: 'GMT'}); // formatted date string
  const dateOnlyString = dateString && dateString.split(',')[0]; // date string only
  const timeString = dateString && dateString.split(',')[1].trim(); // formatted time string
  const timeOnlyString = timeString && timeString.substring(0, timeString.lastIndexOf(' ')); // time string only
  
  return flight[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
         flight[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
         flight[2].toLowerCase().includes(searchTerm.toLowerCase()) ||
         (dateOnlyString && dateOnlyString.includes(searchTerm.toLowerCase())) ||
         (timeOnlyString && timeOnlyString.includes(searchTerm.toLowerCase()));
});


  const rowsPerPage = 10;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const userRows = filteredUsers
    .slice(startIndex, endIndex)
    .map((flight) => (
      <TableRow key={flight[0]}>
        <TableCell>{flight[0]}</TableCell>
        <TableCell>{flight[1]}</TableCell>
        <TableCell>{flight[2]}</TableCell>
        <TableCell>{new Date(flight[3]* 1000).toLocaleString('en-US', {timeZone: 'GMT', hour12: true})}</TableCell>
      </TableRow>
    ));

  return (
    <div>
         <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div style={{overflowX: 'scroll'}}>
      <Table className='myTable'>

    
        <TableHead>
          <TableRow>
            <TableCell>ICAO 24-bit address</TableCell>
            <TableCell>Callsign</TableCell>
            <TableCell>Origin Country</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{userRows}</TableBody>
      </Table>
    
      <div>
        <Button
          disabled={page === 0}
          onClick={() => handleChangePage(-1)}
        >
          Previous
        </Button>
        <Button
          disabled={endIndex >= flightData?.length}
          onClick={() => handleChangePage(1)}
        >
          Next
        </Button>
      </div>
      </div>
    </div>
  );
};

export default Mystatevectors;