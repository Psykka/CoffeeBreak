import { Outlet } from "react-router-dom";

import Logo from "../../assets/logo.png";

function Home() {
  return (
    <section className="flex flex-col justify-center align-middle h-screen bg-beige">
      <div className="flex flex-col justify-center align-middle p-2 space-y-2">
        <img className="object-none" src={Logo} alt="Logo" />
      </div>
      <h1 className="text-4xl font-sans text-center text-white font-bold">Bem-vindo!</h1>
      <Outlet />
    </section>
  );
}

export default Home;
