import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button} from '@mui/material';

const MyAircraft = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://opensky-network.org/api/flights/aircraft?icao24=3c675a&begin=1517184000&end=1517270400');
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        setError(error.message);
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

  const filteredUsers = flights.filter((flight) => {


    // const dateString = flight.firstSeen && new Date(flight.firstSeen*1000).toLocaleString('en-US', {timeZone: 'GMT'}); // formatted date string
    // const dateOnlyString = dateString && dateString.split(',')[0]; // date string only
    // const timeString = dateString && dateString.split(',')[1].trim(); // formatted time string
    // const timeOnlyString = timeString && timeString.substring(0, timeString.lastIndexOf(' ')); // time string only

    const dateString = flight.firstSeen && new Date(flight.firstSeen*1000).toLocaleString('en-US', {timeZone: 'GMT'}); // formatted date string
    const dateOnlyString = dateString && dateString.split(',')[0]; // date string only
    const timeString = dateString && dateString.split(',')[1].trim(); // formatted time string
    const timeOnlyString = timeString && timeString.substring(0, timeString.lastIndexOf(' ')); // time string only
  
    const lastSeenDateString = flight.lastSeen && new Date(flight.lastSeen*1000).toLocaleString('en-US', {timeZone: 'GMT'}); // formatted date string for lastSeen
    const lastSeenDateOnlyString = lastSeenDateString && lastSeenDateString.split(',')[0]; // date string only for lastSeen
    const lastSeenTimeString = lastSeenDateString && lastSeenDateString.split(',')[1].trim(); // formatted time string for lastSeen
    const lastSeenTimeOnlyString = lastSeenTimeString && lastSeenTimeString.substring(0, lastSeenTimeString.lastIndexOf(' ')); // time string only for lastSeen
  


   return flight.icao24 &&
    flight.icao24.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.callsign &&
    flight.callsign.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.estDepartureAirport &&
    flight.estDepartureAirport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.estArrivalAirport &&
    flight.estArrivalAirport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dateOnlyString && dateOnlyString.includes(searchTerm.toLowerCase())) ||
    (timeOnlyString && timeOnlyString.includes(searchTerm.toLowerCase())) ||
    (lastSeenDateOnlyString && lastSeenDateOnlyString.includes(searchTerm.toLowerCase())) || // search for lastSeen date
    (lastSeenTimeOnlyString && lastSeenTimeOnlyString.includes(searchTerm.toLowerCase())); // search for lastSeen time
    // (dateOnlyString && dateOnlyString.includes(searchTerm.toLowerCase())) ||
    // (timeOnlyString && timeOnlyString.includes(searchTerm.toLowerCase()));
  });
  
  
    const rowsPerPage = 10;
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
  
    const userRows = filteredUsers.slice(startIndex, endIndex).map((flight) => (
        <TableRow key={flight.icao24}>
            <TableCell>{flight.icao24}</TableCell>
            <TableCell>{flight.callsign}</TableCell>
            <TableCell>{flight.estDepartureAirport}</TableCell>
            <TableCell>{flight.estArrivalAirport}</TableCell>
            <TableCell>{new Date(flight.firstSeen * 1000).toLocaleString()}</TableCell>
            <TableCell>{new Date(flight.lastSeen * 1000).toLocaleString()}</TableCell>
          </TableRow>
      ));
  

  return (
    <>
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
          <TableCell> ICAO 24-bit address</TableCell>
          <TableCell>Callsign</TableCell>
          <TableCell>Departure Airport</TableCell>
          <TableCell>Arrival Airport</TableCell>
          <TableCell>Departure Time</TableCell>
          <TableCell>Arrival Time</TableCell>
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
          disabled={endIndex >= flights?.length}
          onClick={() => handleChangePage(1)}
        >
          Next
        </Button>
      </div>
      </div>
    </>
  );
};

export default MyAircraft;