import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../../src/pages/Signup';

describe('Signup', () => {
  it('should render the signup page', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );
    expect(screen.getByText('Join to keep track of your expenses'));
  });
});
