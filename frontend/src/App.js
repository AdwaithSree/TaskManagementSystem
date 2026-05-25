import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './components/Login';

import Register from './components/Register';

import Dashboard from './components/Dashboard';

import CreateTask from './components/CreateTask';

import EditTask from './components/EditTask';

import ProtectedRoute from './components/ProtectedRoute';

import Welcome from './components/Welcome';

import {
  ToastContainer,
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (

    <>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Welcome />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>

                <Dashboard />

              </ProtectedRoute>
            }
          />

          <Route
            path="/create-task"
            element={
              <ProtectedRoute>

                <CreateTask />

              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-task/:id"
            element={
              <ProtectedRoute>

                <EditTask />

              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>


      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
      />

    </>

  );
}

export default App;