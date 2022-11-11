/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState,useCallback } from 'react';
import useIsMountedRef from 'use-is-mounted-ref';
 
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import AddUser from 'src/popups/AddUser';
import call from '../core/services/http/index';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
 


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: '' },
];

 

 

export default function UserPage() {
 
  const isMountedRef=useIsMountedRef()
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState([])

 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
 

 const getUsers = useCallback(async () =>{
  if (isMountedRef.current) {
    await call("get","get-users")
    .then(res=>{
      setUsers(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
 },[isMountedRef])

 useEffect(()=>{
  getUsers()
 },[getUsers])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  

   

  return (
    <>
      <Helmet>
        <title> User ededde3d| County crm </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
            <AddUser/>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}

                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
         
         <TableBody>
    {users?.map((row,index) => {
        const { id, first_name, last_name,username } = row;

        return (
            <TableRow
                hover
                key={id}
                tabIndex={-1}
            >
                <TableCell component="th" scope="row">
                    <Typography variant="caption" noWrap>
                        {index+1}
                    </Typography>
                </TableCell>
                <TableCell width={'20%'} component="th" scope="row">
                    <Typography variant="caption" >
                        {first_name}
                    </Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                    <Typography variant="caption" noWrap>
                        {last_name}
                    </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Typography variant="caption" noWrap>
                        {username}
                    </Typography>
                </TableCell>
            </TableRow>
        );
    })}
    {/* {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
        </TableRow>
    )} */}
</TableBody>







              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

   
      
    </>
  );
}
