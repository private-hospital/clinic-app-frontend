import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import NotFound from './pages/NotFound';
import 'unfonts.css';
import HomePageRedirect from './components/HomePageRedirect';
import LoginPage from './components/LoginPage';
import './styles/main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
