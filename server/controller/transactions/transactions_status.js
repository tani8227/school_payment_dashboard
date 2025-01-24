import TransactionStatus from "../../modal/transactions/transactions_status.js";
import Transaction from "../../modal/transactions/transactions.js";
import mongoose from "mongoose";

export const getTransactionsStatus = async (req, res) => {
    try {
        const { id } = req.query;

        // Check if id is provided
        if (!id) {
            return res.status(400).json({
                message: "Transaction ID is required"
            });
        }

       

        

        // Find the transaction status by custom_order_id
        const transactions = await TransactionStatus.findOne({ custom_order_id: id });

        if (!transactions) {
            return res.status(401).json({
                message: "No transaction status found for the provided ID"
            });
        }

        

       
        const transaction_status = await Transaction.findOne({ collect_id: new mongoose.Types.ObjectId(transactions._id) });

        if (!transaction_status) {
            return res.status(401).json({
                message: "No transaction found related to the provided transaction status"
            });
        }



       
        return res.status(200).json({
            data:  transaction_status ,     
            message: "Successfully found the transaction status"
        });

    } catch (error) {
        console.error("Error fetching transaction status:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
            message: "Error occurred while fetching the transaction status"
        });
    }
};


export const updateTransactionStatus = async (req, res) => {
    try {
        const { id, status } = req.body;  // Destructure collect_id and status from the request body

        console.log(id);  // Debugging: log the id received

        if (!id || !status) {
            return res.status(400).json({
                message: "collect_id and status are required"
            });
        }

        // Find the transaction by _id and update the status
        const transaction = await Transaction.findByIdAndUpdate(
            id,  // Use id directly, not in an object
            { status },  // Update the status
            { new: true }  // This will return the updated document
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        console.log(transaction)
        return res.status(200).json({
            data: transaction,  // Return the updated transaction
            message: "Transaction status updated successfully"
        });

    } catch (error) {
        console.error("Error updating transaction status:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
            message: "Error occurred while updating the transaction status"
        });
    }
};
