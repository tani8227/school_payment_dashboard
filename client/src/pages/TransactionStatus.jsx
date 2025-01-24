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
import { getTransactionsByCustomId } from '../Reducers/transactions/transactionsThunks/getTransactionsStatusThunk';
import { getUpdateTransactionStatus } from '../Reducers/transactions/transactionsThunks/getUpdateTransactionStatusThunk';


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
    const [checkTransactionsStatus, setCheckTransactionsStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [schoolId, setSchoolId] = useState('');
    const [customId, setCustomId] = useState();
    const [status, setStatus] = useState(''); // State for status

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await dispatch(getTransactions()).unwrap();
                setTransactions(response.data);
            } catch (error) {
                setError('Error fetching transactions');
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [dispatch]);

    const handleSchoolIdChange = (event) => {
        setSchoolId(event.target.value);
        setCustomId(event.target.value);
    };

    const handleCustomId = async () => {
        try {
            setLoading(true);
            const response = await dispatch(getTransactionsByCustomId(customId)).unwrap();
            setCheckTransactionsStatus(response.data);
            toast.success('fetched the transactions Status ',
                {
                    position: "top-right",
                    autoClose: 1500,
                })

            console.log(response.data);
        } catch (error) {
            toast.error('transactions Status not found ',
                {
                    position: "top-right",
                    autoClose: 1500,
                })

            setError('Error fetching transactions');
           
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async () => {
        if (!status || !checkTransactionsStatus?.collect_id) {
            setError('Please select a status and a valid transaction');
            return;
        }
        try {
            setLoading(true);
            const response = await dispatch(getUpdateTransactionStatus({
                id: checkTransactionsStatus._id,
                status
            })).unwrap();
            setCheckTransactionsStatus(response.data); // Update the status in the UI
            toast.success('Updated Status ',
                {
                    position: "top-right",
                    autoClose: 1500,
                })

            setStatus(''); 
            setError(null);

        } catch (error) {
            toast.error('Failed to Update ',
                {
                    position: "top-right",
                    autoClose: 1500,
                })
            setError('Error updating status');
           
        } finally {
            setLoading(false);
        }
    };


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
                <Grid item xs={12}>
                    <Item>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-helper-label">custom ID</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={schoolId}
                                    onChange={handleSchoolIdChange}
                                    label="School ID"
                                >
                                    <MenuItem value="">All</MenuItem>
                                    {[...new Set(transactions.map(t => t.collect_id.custom_order_id))].map((id) => (
                                        <MenuItem key={id} value={id}>{id}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" color="secondary" onClick={handleCustomId}>
                                Find
                            </Button>
                        </Box>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>collect_id</TableCell>
                                        <TableCell>payment_method</TableCell>
                                        <TableCell>Gateway</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Transaction Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {checkTransactionsStatus &&
                                        <TableRow key={checkTransactionsStatus._id}>
                                            <TableCell>{checkTransactionsStatus.collect_id}</TableCell>
                                            <TableCell>{checkTransactionsStatus.payment_method}</TableCell>
                                            <TableCell>{checkTransactionsStatus.gateway}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    select
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                    variant="outlined"
                                                    label="Update Status"
                                                >
                                                    <option value={checkTransactionsStatus?.status}>{checkTransactionsStatus?.status}</option>
                                                    <option value="SUCCESS">Success</option>
                                                    <option value="PENDING">Pending</option>
                                                    <option value="FAILED">Failed</option>
                                                </TextField>
                                            </TableCell>
                                            <TableCell>{checkTransactionsStatus.transaction_amount}</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                       
                        <Button variant="outlined" color="secondary" onClick={handleUpdateStatus} sx={{ marginTop: 2 }}>
                            Update Status
                        </Button>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
