import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionPage from '../../src/pages/Transaction';

describe('Transaction', () => {
  it('should render the transaction page', () => {
    render(
      <MemoryRouter>
        <TransactionPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Update this transaction'));
  });
});
