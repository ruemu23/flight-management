import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

const TestComponent = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [flightData, setFlightData] = useState([]);

//   const now = new Date().getTime();
//   const twoDaysAgo = new Date(now - 2 * 24 * 60 * 60 * 1000).getTime();
//   const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000).getTime();
//   const apiLink = `https://opensky-network.org/api/flights/all?begin=${twoDaysAgo}&end=${oneDayAgo}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opensky-network.org/api/flights/all?begin=1617227200&end=1617230800');
        const data = await response.json();
        setFlightData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (value) => {
    setPage(page + value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredData = flightData?.filter((flight) =>
    flight.callsign?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rowsPerPage = 5;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const flightRows = filteredData
    ?.slice(startIndex, endIndex)
    .map((flight) => (
        
      <TableRow key={flight.icao24}>
        <TableCell>{flight.icao24}</TableCell>
        <TableCell>{new Date(flight.firstSeen * 1000).toLocaleString()}</TableCell>
        <TableCell>{flight.estDepartureAirport}</TableCell>
        <TableCell>{new Date(flight.lastSeen * 1000).toLocaleString()}</TableCell>
        <TableCell>{flight.estArrivalAirport}</TableCell>
        <TableCell>{flight.callsign}</TableCell>
        <TableCell>{flight.departureAirportCandidatesCount}</TableCell>
        <TableCell>{flight.arrivalAirportCandidatesCount}</TableCell>
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ICAO 24-bit Address</TableCell>
            <TableCell>First Seen</TableCell>
            <TableCell>Estimated Departure Airport</TableCell>
            <TableCell>Last Seen</TableCell>
            <TableCell>Estimated Arrival Airport</TableCell>
            <TableCell>Callsign</TableCell>
            <TableCell>Departure Airport Candidates Count</TableCell>
            <TableCell>Arrival Airport Candidates Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{flightRows}</TableBody>
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
  );
};

export default TestComponent;

