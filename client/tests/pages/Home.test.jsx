import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../src/pages/Home';
import { LOGOUT } from '../../src/graphql/mutations/user.mutation';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: LOGOUT,
    },
    result: {
      data: {
        logout: true,
      },
    },
  },
];

describe('Home', () => {
  // TODO: Error: Not implemented: HTMLCanvasElement.prototype.getContext
  it.skip('should render the home page', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(screen.getByText('Spend wisely, track wisely'));
  });
});
