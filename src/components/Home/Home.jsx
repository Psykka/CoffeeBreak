import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Logo from "../../assets/logo.png";
import { pb } from "../../lib/pocketbase";

function Home() {
  useEffect(() => {
    if (pb.authStore.isValid) window.location.href = "/coffee"
  })

  return (
    <section className="flex flex-col justify-around h-screen">
      <div>
        <div className="flex justify-center align-middle p-2 space-x-2 my-6 mb-10">
          <img className="object-none object-center" src={Logo} alt="Logo" />
        </div>
        <h1 className="text-4xl font-sans text-center text-white font-bold">Bem-vindo!</h1>
      </div>
      <Outlet />
    </section>
  );
}

export default Home;
