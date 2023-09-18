import { Outlet } from "react-router-dom";

function Home() {
  return (
    <section className="flex flex-col content-center h-screen bg-beige">
      <img className="object-scale-down" src="https://placehold.co/220x180" alt="Logo" />
      <h1 className="text-4xl font-sans text-center text-white font-bold">Bem-vindo!</h1>
      <Outlet />
    </section>
  );
}

export default Home;
