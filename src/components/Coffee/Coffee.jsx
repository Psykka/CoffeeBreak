import { useState } from 'react'
import { useEffect } from 'react'
import beams from '../../assets/beams.svg'
import plus from '../../assets/plus.svg'
import { pb } from '../../lib/pocketbase'

const Coffee = () => {
  const [remaning, setRemaning] = useState({ quantity: 0 })
  const [avatar, setAvatar] = useState('')

  const getRemaning = async () => {
    const res = await pb.collection('remainingDrink').getFullList()
    if (res.length > 0) setRemaning(res[0])
  }

  const getAvatar = async () => {
    const res = await pb.collection('users').getOne(pb.authStore.model.id)
    setAvatar(pb.files.getUrl(res, res.avatar))
  }

  const getDayTime = () => {
    const date = new Date()
    const hours = date.getHours()
    if (hours >= 0 && hours < 12) return 'Bom dia!'
    if (hours >= 12 && hours < 18) return 'Boa tarde!'
    if (hours >= 18 && hours <= 23) return 'Boa noite!'
  }

  const toggleModal = async () => {
    const modal = document.querySelector('.fixed')
    modal.classList.toggle('hidden')
  }

  const takeCoffee = async () => {
    if (remaning.quantity <= 0) return alert('Não há mais café disponível!')
    const newRemaning = remaning.quantity - 1
    // await pb.collection('remainingDrink').update(remaning.id, { quantity: newRemaning })
    setRemaning({ ...remaning, quantity: newRemaning })
    toggleModal()
  }

  useEffect(() => {
    if (!pb.authStore.isValid) return window.location.href = '/'

    getRemaning()
    getAvatar()
  }, [])

  return (
    <>
      <div className="fixed bg-brown top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 hidden">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="bg-white rounded-lg p-4">
            <p className="text-center text-xl font-semibold">
              Deseja pegar um café?
            </p>
            <div className="flex flex-row mt-4 gap-2">
              <button className="bg-brown text-white p-2 rounded w-full" onClick={takeCoffee}>
                Sim
              </button>
              <button className="bg-brown text-white p-2 rounded w-full" onClick={toggleModal}>
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-screen">
        <div className="flex flex-row justify-between items-center bg-brown p-4 text-white shadow-lg">
          <div>
            <h1 className="text-2xl font-semibold">
              {getDayTime()}
            </h1>
            <h2 className="text-2xl">
              {pb.authStore.model && pb.authStore.model.name ? pb.authStore.model.name : 'Usuário'}
            </h2>
          </div>
          <img src={avatar} alt="profile picture" className="rounded-full h-20 w-20" />
        </div>
        <div className="flex flex-col text-white items-center relative">
          <img src={beams} alt="beams" className="h-80 w-80" />
          <div className="flex flex-col items-center leading-none absolute gap-10">
            <div className="flex flex-col items-center">
              <p className="counter font-bold">
                {remaning.quantity}
              </p>
              <p className="counter-subtitle font-bold">
                Restantes
              </p>
            </div>
            <button>
              <img src={plus} alt="Comprar mais café" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mb-20">
          <button className="bg-brown text-white p-2 rounded w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10" onClick={toggleModal}>
            Pegar café
          </button>
        </div>
      </div>
    </>
  )
}

export default Coffee
