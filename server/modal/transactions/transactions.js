import mongoose from 'mongoose';
import TransactionStatus from './transactions_status.js'

const transactionsSchema = new mongoose.Schema(
    {
        collect_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'TransactionStatus',
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
        },
        gateway: {
            type: String,
            required: true,
        },
        transaction_amount: {
            type: Number,
            required: true,
        },
        bank_refrence: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,  
        collection: 'collect_request_status',  
    }
);

const Transaction = mongoose.model('Transaction', transactionsSchema);

export default Transaction;
