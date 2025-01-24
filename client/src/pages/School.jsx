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
    const [schoolId, setSchoolId] = useState('');
    const [flg, setFlg] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await dispatch(getTransactions()).unwrap();
                setTransactions(response.data);
                
            } catch (error) {

                 toast.error('Error fetching transactions', {
                        position: "top-right",
                        autoClose: 1500,
                      });
                
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [dispatch]);

   

   
    const handleSchoolIdChange = (event) => {
        setSchoolId(event.target.value);
    };

    const handleClearFilters = () => {
        setSchoolId('');
        setFlg(true);
    };

    const filteredTransactions = transactions.filter((transaction) => {
        let matches = true;

        if (schoolId) {
            matches = transaction.collect_id.school_id === schoolId;
        }

        
        
        
        
        return matches;
    });
   let  newfilteredTransactions;
    if(schoolId)
        {

             newfilteredTransactions= [...filteredTransactions]
        }

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
        <Box sx={{ flexGrow: 1, padding: 2, height: '75vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} sx={{ flexGrow: 1 }}>
                    <Item>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-helper-label">School Id</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={schoolId}
                                    onChange={handleSchoolIdChange}
                                    label="School ID"

                                >
                                    <MenuItem value="">All</MenuItem>
                                    {[...new Set(transactions.map(t => t.collect_id.school_id))].map((id) => (
                                        <MenuItem key={id} value={id}>{id}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
                                Clear Filters
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Collect ID</TableCell>
                                        <TableCell>School ID</TableCell>
                                        <TableCell>Gateway</TableCell>
                                        <TableCell>Order Amount</TableCell>
                                        <TableCell>Transaction Amount</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Custom Order ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {newfilteredTransactions&&newfilteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
                                        <TableRow key={transaction.collect_id._id}>
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
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
