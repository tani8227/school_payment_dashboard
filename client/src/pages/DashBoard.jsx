import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { getTransactions } from '../Reducers/transactions/transactionsThunks/getTransactionThunk';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, MenuItem, Select, InputLabel, FormControl, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { toast } from 'react-toastify';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DashBoard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch();



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dispatch(getTransactions()).unwrap();
        setTransactions(response.data);
      } catch (error) {
          
        nav
        toast.error('Error fetching transactions', {
          position: "top-right",
          autoClose: 1500,
        });

        setError('Error fetching transactions');
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (event) => {

    console.log(event.target.value)
    setStatusFilter(event.target.value);
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setStartDate(null);
    setEndDate(null);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    let matches = true;

    // Filter by status
    if (statusFilter) {
      matches = transaction.status === statusFilter;
    }

    // Filter by date range
    if (startDate || endDate) {
      const transactionDate = new Date(transaction.createdAt);

      // Ensure both startDate and endDate are valid Date objects
      if (startDate instanceof Date && !isNaN(startDate)) {
        matches = matches && transactionDate >= startDate;
      }
      if (endDate instanceof Date && !isNaN(endDate)) {
        matches = matches && transactionDate <= endDate;
      }
    }

    return matches;
  });


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        height: '75vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sx={{ flexGrow: 1 }}>
          <Item>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', marginBottom: 2 }}>

              <FormControl sx={{ minWidth: 120, marginBottom: { xs: 1, sm: 0 } }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} onChange={handleStatusChange} label="Status">
                  <MenuItem value="SUCCESS">Success</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="FAILURE">Failed</MenuItem>
                </Select>
              </FormControl>


              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField {...params} sx={{ marginBottom: { xs: 1, sm: 0 }, marginRight: 1 }} />}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    textField={<TextField sx={{ marginBottom: { xs: 1, sm: 0 } }} />}
                  />
                </LocalizationProvider>
              </Box>


              <Button variant="outlined" color="secondary" onClick={handleClearFilters} sx={{ marginTop: { xs: 1, sm: 0 } }}>
                Clear Filters
              </Button>
            </Box>


            <TableContainer
              sx={{
                maxHeight: 'calc(75vh - 130px)',
                overflowY: 'auto',
                overflowX: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                '@media (max-width: 600px)': {
                  'msOverflowStyle': 'none',
                  scrollbarWidth: 'none',
                },
              }}
            >
              <Table aria-label="transaction table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Collect ID</TableCell>
                    <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>School ID</TableCell>
                    <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Gateway</TableCell>
                    <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Order Amount</TableCell>
                    <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Transaction Amount</TableCell>
                    <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Status</TableCell>
                    <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>Custom Order ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((transaction) => (
                      <TableRow
                        key={transaction.collect_id._id}
                        sx={{
                          '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                          '&:hover': { backgroundColor: '#f1f1f1' },
                        }}
                      >
                        <TableCell>{transaction.collect_id._id}</TableCell>
                        <TableCell>{transaction.collect_id.school_id}</TableCell>
                        <TableCell>{transaction.gateway}</TableCell>
                        <TableCell>{transaction.collect_id.order_amount}</TableCell>
                        <TableCell>{transaction.transaction_amount}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                        <TableCell>{transaction.collect_id.custom_order_id}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>

              </Table>
            </TableContainer>


            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredTransactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ marginTop: 2 }}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
