import { useState, useEffect } from 'react';

function Arrivals() {
  const [flightData, setFlightData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://opensky-network.org/api/flights/all?begin=1517227200&end=1517230800');
      const data = await response.json();
      setFlightData(data);
    };
    fetchData();
  }, []);




  
  

  return (
    <div>
    
      <table>
        <thead>
          <tr>
            <th>ICAO 24-bit Address</th>
            <th>First Seen</th>
            <th>Estimated Departure Airport</th>
            <th>Last Seen</th>
            <th>Estimated Arrival Airport</th>
            <th>Callsign</th>
            <th>Departure Airport Candidates Count</th>
            <th>Arrival Airport Candidates Count</th>
          </tr>
        </thead>
        <tbody>
          {flightData.map((flight, index) => (
            <tr key={index}>
              <td>{flight.icao24} </td>
              <td>{new Date(flight.firstSeen * 1000).toLocaleString()}</td>
              <td>{flight.estDepartureAirport ?? 'Unknown'}</td>
              <td>{new Date(flight.lastSeen * 1000).toLocaleString()}</td>
              <td>{flight.estArrivalAirport ?? 'Unknown'}</td>
              <td>{flight.callsign ?? 'Unknown'}</td>
              <td>{flight.departureAirportCandidatesCount}</td>
              <td>{flight.arrivalAirportCandidatesCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Arrivals;
