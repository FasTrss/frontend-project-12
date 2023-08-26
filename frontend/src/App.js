import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/commonComponents/Header';
import LoginPage from './components/loginPage/LoginPage';
import SignupPage from './components/signupPage/SignupPage';
import Chat from './components/chatPage/ChatPage';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import { AuthProvider, useAuth } from './contexts/authContext/AuthContext.jsx';
import routes from './routes';

const LoggedInRoute = () => {
  const { userData } = useAuth();
  return (
    userData ? <Outlet /> : <Navigate to={routes.loginRoute()} />
  );
};

const LoggedOutRoute = () => {
  const { userData } = useAuth();
  return (
    !userData ? <Outlet /> : <Navigate to={routes.chatRoute()} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={routes.chatRoute()} element={<LoggedInRoute />}>
            <Route path={routes.chatRoute()} element={<Chat />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path={routes.loginRoute()} element={<LoggedOutRoute />}>
            <Route path="" element={<LoginPage />} />
          </Route>
          <Route path={routes.signupRoute()} element={<LoggedOutRoute />}>
            <Route path="" element={<SignupPage />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
