import { Routes, Route } from 'react-router-dom';
import {
  Home,
  LoginPage,
  SignUpPage,
  TransactionPage,
  NotFound,
} from './pages/constant.js';

function App() {
  return (
    <>
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
