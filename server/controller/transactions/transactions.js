import Transaction from '../../modal/transactions/transactions.js'


export const getTransactions= async(req, res)=>
    {
        try {
            console.log("8888");
            const transactions = await Transaction.find({})
            .populate('collect_id')  
            .exec();
          
           
               if(transactions)
                {
                    return res.status(200).json(
                        {
                            data:transactions,
                            message:"successfully found all thransactions "

                        })
                }
        } catch (error) {
            return res.status(500).json(
                {
                    error:error,
                    message:"successfully found all thransactions "

                })
        }
    }