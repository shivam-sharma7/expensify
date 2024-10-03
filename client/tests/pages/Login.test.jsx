import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../src/pages/Login';
import { LOGIN } from '../../src/graphql/mutations/user.mutation';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: LOGIN,
      variables: { username: 'test', password: 'test' },
    },
    result: {
      data: {
        login: {
          token: 'test-token',
        },
      },
    },
  },
];

describe('Login', () => {
  it('should render the login page', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(screen.getByText('Welcome back! Log in to your account'));
  });
});
