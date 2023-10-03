import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './components/Home/Home'
import Welcome from './components/Home/Welcome'
import SignIn from './components/SignIn'
import LogIn from "./components/Home/LogIn";
import Coffee from "./components/Coffee/Coffee";

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Welcome />
      },
      {
        path: '/login',
        element: <LogIn />
      }
    ],
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/coffee',
    element: <Coffee />
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
