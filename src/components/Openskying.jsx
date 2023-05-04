import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenSky = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://opensky-network.org/api/states/all',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStates = data.states ? data.states.filter(state => {
    return (
      state[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
      state[1].toLowerCase().includes(searchQuery.toLowerCase()) ||
      state[2].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }) : [];

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search..."/>
      <table>
        <thead>
          <tr>
            <th>ICAO24</th>
            <th>Call sign</th>
            <th>Origin country</th>
          </tr>
        </thead>
        <tbody>
          {filteredStates.map((state) => (
            <tr key={state[0]}>
              <td>{state[0]}</td>
              <td>{state[1]}</td>
              <td>{state[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenSky;
