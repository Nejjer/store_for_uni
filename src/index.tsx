import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { WithStore } from './components/WithStore/WithStore';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <WithStore>
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </WithStore>
  </BrowserRouter>
);
