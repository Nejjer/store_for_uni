import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { WithStore } from './components/WithStore/WithStore';
import { ThemeProvider } from '@mui/material';
import { Theme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={Theme}>
      <WithStore>
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </WithStore>
    </ThemeProvider>
  </BrowserRouter>
);
