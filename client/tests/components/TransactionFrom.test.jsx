import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import TransactionForm from '../../src/components/TransactionForm';

describe('Transaction', () => {
  it('should render the Transaction component', () => {
    render(<TransactionForm />);
    expect(screen.getByText('Transaction'));
  });
});
