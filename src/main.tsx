import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import NotFound from './pages/NotFound';
import 'unfonts.css';
import HomePageRedirect from './components/HomePageRedirect';
import LoginPage from './pages/LoginPage';
import './styles/main.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './components/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*  Not authenticated */}
          <Route path="/" element={<HomePageRedirect />} />
          <Route path="/login" element={<LoginPage />} />

          {/*  Doctor | Registrar */}
          <Route path="/registry" element={<>Registry</>} />
          <Route path="/patient/:id" element={<>Patient</>} />

          {/*  Doctor */}
          <Route path="/appointments" element={<>Appointments</>} />

          {/*  Clinic Head*/}
          <Route path="/statistics" element={<>Statistics</>} />
          <Route path="/price-lists" element={<>Price lists</>} />
          <Route path="/statements" element={<>Statements</>} />

          {/*  Errors */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
