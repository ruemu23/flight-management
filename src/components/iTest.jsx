import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com' },
  { id: 5, name: 'Mark Wilson', email: 'mark.wilson@example.com' },
  { id: 6, name: 'Sara Garcia', email: 'sara.garcia@example.com' },
  { id: 7, name: 'David Lee', email: 'david.lee@example.com' },
  { id: 8, name: 'Maria Hernandez', email: 'maria.hernandez@example.com' },
  { id: 9, name: 'Peter Johnson', email: 'peter.johnson@example.com' },
  { id: 10, name: 'Lisa Davis', email: 'lisa.davis@example.com' },
  { id: 11, name: 'Mike Jones', email: 'mike.jones@example.com' },
  { id: 12, name: 'Emily Brown', email: 'emily.brown@example.com' },
  { id: 13, name: 'Tom Wilson', email: 'tom.wilson@example.com' },
  { id: 14, name: 'Cathy Garcia', email: 'cathy.garcia@example.com' },
  { id: 15, name: 'Jerry Lee', email: 'jerry.lee@example.com' },
];

const iTest = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (value) => {
    setPage(page + value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredUsers = users.filter((user) =>
  user.id.toString().includes(searchTerm.toLowerCase()) || user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const rowsPerPage = 10;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const userRows = filteredUsers
    .slice(startIndex, endIndex)
    .map((user) => (
      <TableRow key={user.id}>
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
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
          disabled={endIndex >= users.length}
          onClick={() => handleChangePage(1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default iTest;