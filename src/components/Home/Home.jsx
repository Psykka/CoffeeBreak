import { Outlet } from "react-router-dom";

import './Home.css'

function Home() {
  return (
    <>
      <h1>Bem-vindo!</h1>
      <img src="https://placehold.co/220x180" alt="" />
      <Outlet />
    </>
  );
}

export default Home;
