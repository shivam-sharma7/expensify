import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, LoginPage, SignUpPage, TransactionPage, NotFound } from './pages/constant.js';
import { Header } from './components/Header.jsx';
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query.js';
import { Toaster } from 'react-hot-toast';

function App() {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

  console.log(data);

  if (loading) {
    return <p className="flex justify-center text-center text-xl">Loading....</p>;
  }

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path="/" element={data.authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!data.authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/transaction/:id" element={data.authUser ? <TransactionPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
