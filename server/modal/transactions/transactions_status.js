import mongoose from 'mongoose'


const transactionsSchema = new mongoose.Schema(
    {
        school_id:
        {
            type: String,
            required: true,
        },
        trustee_id:
        {
            type: String,
            required: true,
        },
        gateway:
        {
            type: String,
            required: true
        },
        order_amount:
        {
            type: Number,
            required: true
        },
        custom_order_id:
        {
            type: String,
            required: true
        },
    }, 
    {
        timestamps: true,  
      collection: 'collect_request' 
    }
);

const TransactionStatus = mongoose.model('TransactionStatus', transactionsSchema);
export default TransactionStatus;