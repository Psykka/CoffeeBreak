const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-brown p-4 text-white shadow-lg">
      <div>
        <h1 className="text-2xl font-semibold">
          Bom dia!
        </h1>
        <h2 className="text-2xl">
          Felipe Kamada
        </h2>
      </div>
      <img src="https://github.com/kamadarada.png" alt="profile picture" className="rounded-full h-20 w-20" />
    </div>
  );
};

export default Header;