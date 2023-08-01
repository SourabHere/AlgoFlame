import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signin/SignupPage';
import Problems from './pages/problems/Problems';
import Problem from './pages/problem/Problem';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthContext';
import AddProb from './pages/addProb/AddProb';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Problems />}></Route>
          <Route path='/auth/signup' element={<SignupPage />}></Route>
          <Route path='/auth/login' element={<LoginPage />}></Route>
          <Route path='/problems/:id' element={<Problem />}></Route>
          <Route path='/problems/add-problem' element={<AddProb />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
