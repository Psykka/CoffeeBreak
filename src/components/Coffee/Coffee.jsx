import { useState } from 'react'
import { useEffect } from 'react'
import beams from '../../assets/beams.svg'
import { pb } from '../../lib/pocketbase'

const Coffee = () => {
  const [remaning, setRemaning] = useState(0)

  const getRemaning = async () => {
    const res = await pb.collection('remainingDrink').getFullList()

    if (res.length <= 0) return setRemaning(0)

    setRemaning(res[0])
  }

  useEffect(() => {
    if (!pb.authStore.isValid) return window.location.href = '/'

    getRemaning()
  })

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-row justify-between items-center bg-brown p-4 text-white shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold">
            Bom dia!
          </h1>
          <h2 className="text-2xl">
            {pb.authStore.model.name}
          </h2>
        </div>
        <img src="https://github.com/kamadarada.png" alt="profile picture" className="rounded-full h-20 w-20" />
      </div>
      <div className="relative flex flex-col text-white items-center ">
        <img src={beams} alt="beams" />
        <div className="flex flex-col items-center absolute top-0">
          <p className="counter font-bold">
            {remaning}
          </p>
          <p className="counter-subtitle font-bold top-0">
            Restantes
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center m-20">
        <button className="bg-brown text-white w-64 p-2 rounded w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10">
          Pegar café
        </button>
      </div>
    </div>
  )
}

export default Coffee
