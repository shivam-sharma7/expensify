import { Routes, Route } from 'react-router-dom';
import {
  Home,
  LoginPage,
  SignUpPage,
  TransactionPage,
  NotFound,
} from './pages/constant.js';
import { Header } from './components/Header.jsx';

function App() {
  const authUser = true; // TODO: remove hardcode data
  return (
    <>
      {authUser === true ? <Header /> : <NotFound />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
