import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionForm from '../../src/components/TransactionForm';
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_TRANSACTION } from '../../src/graphql/mutations/transaction.mutation';

const mocks = [
  {
    request: {
      query: CREATE_TRANSACTION,
      variables: {
        input: {
          description: 'test',
          paymentType: 'test',
          category: 'test',
          amount: 1,
          location: 'test',
          date: 'test',
        },
      },
    },
    result: {
      data: {
        createTransaction: {
          _id: 'test-id',
          description: 'test',
          paymentType: 'test',
          category: 'test',
          amount: 1,
          location: 'test',
          date: 'test',
        },
      },
    },
  },
];

describe('Transaction', () => {
  it('should render the Transaction component', () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TransactionForm />
        </MockedProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Transaction'));
  });
});
