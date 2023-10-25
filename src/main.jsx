import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './components/Home/Home'
import Welcome from './components/Home/Welcome'
import SignIn from './components/SignIn'
import LogIn from "./components/Home/LogIn";
import Coffee from "./components/Coffee/Coffee";
import PasswordRecovery from "./components/Password/PasswordRecovery";
import './index.css'
import EmailCheck from "./components/Password/EmailCheck";
import CreatePassword from "./components/Password/CreatePassword";
import CoffeePrice from "./components/Admin/CoffeePrice";
import ListUsers from "./components/Admin/ListUsers";

import { store } from './store'

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
  },
  {
    path: '/PasswordRecovery',
    element: <PasswordRecovery/>
  },
  {
    path: '/EmailCheck',
    element: <EmailCheck/>
  },
  {
    path:'/CreatePassword',
    element: <CreatePassword/>
  },
  {
    path:'/CoffeePrice',
    element: <CoffeePrice/>
  },
  {
    path:'/ListUsers',
    element: <ListUsers/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
