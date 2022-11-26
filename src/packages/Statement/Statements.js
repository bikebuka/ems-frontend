/* eslint-disable  */
import useIsMountedRef from 'use-is-mounted-ref';
// waas/user-transactions/?account_number=11117-871
import { filter } from 'lodash';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { StatementListHead, StatementListToolbar, StatementMoreMenu } from './index';
// mock
import USERLIST from '../../shared/_mock/user';
import { getStorageItem, postDataAuth } from '../../shared/utils/generalFunctions';
import { BASE } from '../../shared/utils/urls';
import { fCurrency } from '../../shared/utils/formatNumber';
import { fDateTimeSuffix } from '../../shared/utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'id', label: 'Transaction ID', alignRight: false },
  { id: '' },
  { id: 'transaction_code', label: 'Transaction Code', alignRight: false },
  // { id: 'payment_detail', label: 'Payment Type', alignRight: false },
  { id: 'full_name', label: 'Name', alignRight: false },
  { id: 'account_number', label: 'Account Number', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'created_date', label: 'Date', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_row) =>
      _row.payment_detail.account_number && _row.payment_detail.account_number.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      _row.payment_detail.full_name && _row.payment_detail.full_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      _row.transaction_code && _row.transaction_code.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      _row.description && _row.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      _row.id && _row.id.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// const profile = profile&&profile
// const AC = JSON.parse(getStorageItem('profile'))&&profile.customer_account_number

const raw = getStorageItem('profile')
let profile = { customer_account_number: '' }
if (raw !== '') {
  profile = JSON.parse(raw)
}
export default function Statements() {

  // const profile = useSelector(state => state.profile)
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [links, setLinks] = useState('');

  const [records, setList] = useState([]);
  const [count, setCount] = useState(0);

  const isMountedRef = useIsMountedRef();
  const getStatements = useCallback(async () => {
    if (isMountedRef.current) {
      refresh()
    }
  }, [isMountedRef, rowsPerPage])
  useEffect(() => {
    getStatements()
  }, [getStatements])

  const handleResponse = (response) => {
    if (response.status) {
      setLinks(response.links)
      setCount(response.count)
      const rows = []

      /* eslint-disable array-callback-return */
      response.data.map((row) => {

        row = {
          id: row.id,
          transaction_type_enum: row.transaction_type_enum,
          transaction_code: row.transaction_code,
          payment_detail: row.payment_detail,
          amount: row.amount,
          description: row.description,
          created_date: row.created_date,
        }
        rows.push(row)
      })

      setList(rows)
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const refresh = async () => {
    const profile = JSON.parse(getStorageItem('profile'))
    const response = await postDataAuth(`${BASE}waas/user-transactions/?account_number=${profile.customer_account_number}&page=${page + 1}&page_size=${rowsPerPage}`, {}, 'GET')
    handleResponse(response)
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    const profile = JSON.parse(getStorageItem('profile'))
    const response = await postDataAuth(`${BASE}waas/user-transactions/?account_number=${profile.customer_account_number}&page=${newPage + 1}&page_size=${rowsPerPage}`, {}, 'GET')
    handleResponse(response)
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    const response = await postDataAuth(`${BASE}waas/user-transactions/?account_number=${JSON.parse(getStorageItem('profile')).customer_account_number}&page=1&page_size=${event.target.value}`, {}, 'GET')
    handleResponse(response)
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(records, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Statements">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Account Transactions
          </Typography>
          <Button variant="contained" onClick={refresh} startIcon={<Iconify icon="eva:refresh-fill" />}>
            Refresh
          </Button>
        </Stack>

        <Card>
          <StatementListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <StatementListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>

                  {filteredUsers.map((row) => {
                    const { id, amount, created_date, description, transaction_code, transaction_type_enum, payment_detail } = row;
                    const { account_number, full_name, payment_type } = payment_detail
                    const { value } = payment_type
                    const isItemSelected = selected.indexOf(value) !== -1;

                    return (
                      <TableRow
                        hover
                        key={transaction_code}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >

                        <TableCell align="right">
                          {transaction_type_enum === 2 ? <Iconify sx={{ color: 'red' }} icon='akar-icons:arrow-up' /> : <Iconify sx={{ color: 'green' }} icon='akar-icons:arrow-down' />}
                        </TableCell>
                        <TableCell align="left">{
                          <Label variant="ghost" color={transaction_type_enum === 2 ? 'error' : 'success'}>
                            {(transaction_code)}
                          </Label>}
                        </TableCell>
                        {/* <TableCell align="left">{value}</TableCell> */}
                        <TableCell align="left">
                          {full_name}
                        </TableCell>
                        
                        <TableCell align="left">
                          {account_number}
                        </TableCell>
                        <TableCell align="left">{fCurrency(amount)}</TableCell>
                       
                        <TableCell align="left">
                          {description}
                        </TableCell>
                        <TableCell align="left">
                          {fDateTimeSuffix(created_date)}
                        </TableCell>

                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}






