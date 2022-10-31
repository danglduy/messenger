import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Messages from './components/Messages';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/channels/:id',
    element: <Messages />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
