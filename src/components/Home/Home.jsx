import { Outlet } from "react-router-dom";

function Home() {
  return (
    <section className="flex flex-col content-center">
      <img className="object-contain" src="https://placehold.co/220x180" alt="Logo" />
      <h1 className="text-4xl text-center">Bem-vindo!</h1>
      <Outlet />
    </section>
  );
}

export default Home;
