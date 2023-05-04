import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const FlightTable = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://opensky-network.org/api/flights/all?begin=1517227200&end=1517230800');
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

  return (
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
      <TableBody>
        {flights.map((flight) => (
          <TableRow key={flight.icao24}>
            <TableCell>{flight.icao24}</TableCell>
            <TableCell>{flight.callsign}</TableCell>
            <TableCell>{flight.estDepartureAirport}</TableCell>
            <TableCell>{flight.estArrivalAirport}</TableCell>
            <TableCell>{new Date(flight.firstSeen * 1000).toLocaleString()}</TableCell>
            <TableCell>{new Date(flight.lastSeen * 1000).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FlightTable;
