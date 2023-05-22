import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/layout';
import { MainPage } from './pages/main';
import { Paths } from './enums/paths';
import { FavoritePage } from './pages/favorite';
import { VacancyPage } from './pages/vacancy';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path={Paths.root} element={<Layout />}>
          <Route path={Paths.root} element={<Navigate to={Paths.vacancies} />} />
          <Route path={Paths.vacancies} element={<MainPage />} />
          <Route path={Paths.favorite} element={<FavoritePage />} />
          <Route path={Paths.vacancy} element={<VacancyPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

