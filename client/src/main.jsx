import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import GridBackground from './components/GridBackground.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  // TODO: change uri to production uri
  uri: import.meta.env.VITE_NODE_ENV === ' development ' ? 'http://localhost:4000/graphql' : '/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </StrictMode>,
);
