import beams from '../../assets/beams.svg'

const Coffee = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-row justify-between items-center bg-brown p-4 text-white shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold">
            Bom dia!
          </h1>
          <h2 className="text-2xl">
            Felipe Kamada
          </h2>
        </div>
        <img src="https://avatars.githubusercontent.com/u/112417899" alt="profile picture" className="rounded-full h-20 w-20" />
      </div>
      {/* stack text top of image */}
      <div className="relative flex flex-col text-white items-center">
        <img src={beams} alt="beams" />
        <div className="flex flex-col items-center absolute top-0">
          <p className="counter font-bold">
            10
          </p>
          <p className="counter-subtitle font-bold top-0">
            Restantes
          </p>
        </div>
      </div>
      <button>Pegar café</button>
    </div>
  )
}

export default Coffee
