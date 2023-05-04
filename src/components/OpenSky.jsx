import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/OpenSky.css';

const OpenSky = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://opensky-network.org/api/states/all',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const filteredData = data.states && data.states.filter((state) => {
    // Filter based on search criteria (ICAO24, call sign, origin country)
    const searchTerm = search.toLowerCase();
    return (
      state[0].toLowerCase().includes(searchTerm) ||
      state[1].toLowerCase().includes(searchTerm) ||
      state[2].toLowerCase().includes(searchTerm)
    );
  });

  // Logic for displaying current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData && filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Logic for displaying page numbers
  const pageNumbers = [];
  if (filteredData) {
    for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  // Handle click on page numbers
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Handle click on First button
  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };

  // Handle click on Prev button
  const handlePrevPageClick = () => {
    setCurrentPage(currentPage - 1);
  };

  // Handle click on Next button
  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  };

  // Handle click on Last button
  const handleLastPageClick = () => {
    setCurrentPage(pageNumbers.length);
  };

  // Render page numbers
  const renderPageNumbers =
  pageNumbers &&
  pageNumbers
    .slice(Math.max(currentPage - 4, 0), Math.min(currentPage + 3, pageNumbers.length))
    .map((number) => {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    });

  return (
    <div>
      <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>ICAO24</th>
            <th>Call sign</th>
            <th>Origin country</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentRows && currentRows.map((state) => (
            <tr key={state[0]}>
              <td>{state[0]}</td>
              <td>{state[1]}</td>
              <td>{state[2]}</td>
              <td>{state[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handleFirstPageClick} disabled={currentPage === 1}>First</button>
        <button onClick={handlePrevPageClick} disabled={currentPage === 1}>Prev</button>
        <ul id="page-numbers">
          {renderPageNumbers}
    </ul>
    <button onClick={handleNextPageClick} disabled={currentPage === pageNumbers.length}>Next</button>
    <button onClick={handleLastPageClick} disabled={currentPage === pageNumbers.length}>Last</button>
  </div>
</div> );
};

export default OpenSky;