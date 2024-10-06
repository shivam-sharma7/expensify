import React from 'react';
import { it, describe } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionPage from '../../src/pages/Transaction';
import { MockedProvider } from '@apollo/client/testing';
import { UPDATE_TRANSACTION } from '../../src/graphql/mutations/transaction.mutation';
import { GET_TRANSACTION } from '../../src/graphql/queries/transaction.query';

const mocks = [
  {
    request: {
      query: GET_TRANSACTION,
      variables: { id: '1' },
    },
    result: {
      data: {
        transaction: {
          _id: '1',
          description: 'test',
          paymentType: 'test',
          category: 'test',
          amount: 'test',
          location: 'test',
          date: 'test',
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_TRANSACTION,
      variables: {
        input: {
          description: 'test',
          paymentType: 'test',
          category: 'test',
          amount: 'test',
          location: 'test',
          date: 'test',
          transactionId: '1',
        },
      },
    },
    result: {
      data: {
        updateTransaction: {
          _id: '1',
          description: 'test',
          paymentType: 'test',
          category: 'test',
          amount: 'test',
          location: 'test',
          date: 'test',
        },
      },
    },
  },
];

describe('Transaction', () => {
  it('should render the transaction page', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <TransactionPage />
        </MemoryRouter>
        ,
      </MockedProvider>,
    );
  });
});
