import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import 'core-js/stable';
import { useOpenPix } from '@openpix/react';

import { pb } from '../../lib/pocketbase'
import beams from '../../assets/beams.svg'
import plus from '../../assets/plus.svg'

const Coffee = () => {
  const [remaning, setRemaning] = useState({ quantity: 0 })
  const [avatar, setAvatar] = useState('')
  const [charge, setCharge] = useState(null)

  const getRemaning = async () => {
    const res = await pb.collection('remainingDrink').getFullList()
    if (res.length > 0) setRemaning(res[0])
  }

  const getAvatar = async () => {
    const res = await pb.collection('users').getOne(pb.authStore.model.id)
    setAvatar(pb.files.getUrl(res, res.avatar))
  }

  const onPay = async (charge) => {
    Swal.fire({
      title: 'Pagamento realizado!',
      text: 'Obrigado por comprar mais café!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  const { chargeCreate } = useOpenPix({
    appID: 'Q2xpZW50X0lkX2RjYTI1OGE2LTZmNTItNDc1Yy04YjQ5LTc4M2U4YzFjOTE1NjpDbGllbnRfU2VjcmV0Xzh6ZEIxY1BSRm9naGpaTzBoWmFSbk51eXF4bnlsUFZzV2M0ZlFVa1pQQ1E9',
    onPay,
  });

  const newCharge = async () => {
    const payload = {
      correlationID: Math.random().toString(36).substring(7),
      value: 2000,
      comment: 'CoffeeBreak',
    }

    const { charge, error } = await chargeCreate(payload);

    if (error) {
      Swal.fire({
        title: 'Ops!',
        text: 'Não foi possível criar a cobrança, tente novamente mais tarde!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })

      return;
    }

    setCharge(charge);

    Swal.fire({
      title: 'Cobrança criada!',
      text: 'Agora é só pagar a cobrança que já adicionamos mais café para você!',
      html: `
        <a href="${charge.paymentLinkUrl}" class="underline" target="_blank">Clique aqui para pagar fora do site</a>
        <img src="${charge.qrCodeImage}" alt="QR Code" height="220" />
        <h1 class="text-3xl">R$ <b>${(charge.value / 100).toFixed(2)}</b></h1>
        <p class="mt-2">Vencimento: ${new Date(charge.expiresDate).toLocaleDateString()}</p>
        <button id="copy" class="bg-brown text-white p-2 rounded w-1/2 mt-4" onclick="navigator.clipboard.writeText('${charge.brCode}'); document.querySelector('#copy').innerHTML = 'Copiado!';">
          Copiar código
        </button>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
    })
  }

  const getDayTime = () => {
    const date = new Date()
    const hours = date.getHours()
    if (hours >= 0 && hours < 12) return 'Bom dia!'
    if (hours >= 12 && hours < 18) return 'Boa tarde!'
    if (hours >= 18 && hours <= 23) return 'Boa noite!'
  }

  const toggleModal = async () => {
    if (remaning.quantity <= 0) return Swal.fire({
      title: 'Ops!',
      text: 'Não tem mais café, compre mais!',
      icon: 'error',
      confirmButtonText: 'Ok'
    })

    await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você realmente quer pegar um café?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        takeCoffee()
      }
    })
  }

  const takeCoffee = async () => {
    // await pb.collection('remainingDrink').update(remaning.id, { quantity: newRemaning })
    const newRemaning = remaning.quantity - 1

    setRemaning({ ...remaning, quantity: newRemaning })

    Swal.fire({
      title: 'Café pegado!',
      text: 'Você pegou um café, aproveite!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  const buyCoffee = async () => {
    await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você realmente quer comprar mais café?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        newCharge()
      }
    })
  }

  useEffect(() => {
    if (!pb.authStore.isValid) return window.location.href = '/'

    getRemaning()
    getAvatar()
  }, [])

  return (
    <>
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
            <button onClick={buyCoffee}>
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
