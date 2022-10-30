import React from 'react';
import { createHashRouter, RouterProvider, Route } from 'react-router-dom';
import Home from './components/Home';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
