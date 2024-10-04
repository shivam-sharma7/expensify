import { Transaction } from '../models/transaction.model.js';

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error('Unauthorized user');
        }

        const userId = await context.getUser()._id;
        const transaction = await Transaction.find({ userId });
        return transaction;
      } catch (err) {
        console.log('Error in getting transactions:', err);
        throw new Error('Error in getting transactions');
      }
    },
    transaction: async ({ transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        console.log('Error in getting transaction:', err);
        throw new Error('Error in getting transaction');
      }
    },

    // TODO: Implement the categoryStatistics resolver
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const validPaymentTypes = ['cash', 'credit card'];
        const categoryTypes = ['saving', 'expense', 'investment'];
        if (
          !validPaymentTypes.includes(input.paymentType) ||
          !categoryTypes.includes(input.category)
        ) {
          throw new Error(
            `Invalid payment type: ${input.paymentType} and category: ${input.category}`,
          );
        }
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.log('Error in creating transaction:', err);
        throw new Error('Error in creating transaction');
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true },
        );
        return updateTransaction;
      } catch (err) {
        console.log('Error in updating transaction:', err);
        throw new Error('Error in updating transaction');
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deleteTransaction =
          await Transaction.findByIdAndDelete(transactionId);
        return deleteTransaction;
      } catch (err) {
        console.log('Error in deleting transaction:', err);
        throw new Error('Error in deleting transaction');
      }
    },
  },
  // TODO: Add the transaction/user relationship
};

export default transactionResolver;
