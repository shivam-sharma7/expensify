import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../../src/pages/Signup';
import { SIGN_UP } from '../../src/graphql/mutations/user.mutation';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: SIGN_UP,
      variables: { username: 'test', password: 'test' },
    },
    result: {
      data: {
        signup: {
          token: 'test-token',
        },
      },
    },
  },
];

describe('Signup', () => {
  it('should render the signup page', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(screen.getByText('Join to keep track of your expenses'));
  });
});
