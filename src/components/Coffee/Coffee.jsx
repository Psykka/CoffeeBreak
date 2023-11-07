import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import { pb } from '../../lib/pocketbase'
import beams from '../../assets/beams.svg'
import plus from '../../assets/plus.svg'

const Coffee = () => {
  const [remaning, setRemaning] = useState({ quantity: 0 })
  const [avatar, setAvatar] = useState('')
  const [isPaing, setIsPaying] = useState(false)

  const getRemaning = async () => {
    const res = await pb.collection('remainingDrink').getFullList()
    if (res.length > 0) setRemaning(res[0])

    // subscribe to changes
    pb.collection('remainingDrink').unsubscribe('*');
    pb.collection('remainingDrink').subscribe('*', (e) => {
      setRemaning(e.record)
    })
  }

  const getAvatar = async () => {
    const res = await pb.collection('users').getOne(pb.authStore.model.id)
    setAvatar(pb.files.getUrl(res, res.avatar))
  }

  const onPay = async () => {
    setIsPaying(false)

    Swal.fire({
      title: 'Pagamento realizado!',
      text: 'Obrigado por comprar mais café!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  const newCharge = async () => {
    const url = pb.baseUrl + '/payment-intent/' + pb.authStore.model.id

    const charge = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())

    setIsPaying(true)

    Swal.fire({
      title: 'Cobrança criada!',
      text: 'Agora é só pagar a cobrança que já adicionamos mais café para você!',
      html: `
        <a href="${charge.paymentLinkUrl}" class="underline">Clique aqui para pagar fora do site</a>
        <img src="${charge.pixImage}" alt="QR Code" height="220" />
        <h1 class="text-3xl">R$ <b>${(charge.value / 100).toFixed(2)}</b></h1>
        <p class="mt-2">Expira em: ${charge.expiresIn / 60000} minutos</p>
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
      text: 'Acabou o café, compre mais!',
      icon: 'error',
      confirmButtonText: 'Ok'
    })

    await Swal.fire({
      title: 'Deseja retirar um café?',
      text: 'Isso irá descontar um café! Mas vale a pena!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Preparando café...',
          text: 'Aguarde um momento',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        takeCoffee()
      }
    })
  }

  const takeCoffee = async () => {
    const res = await fetch(pb.baseUrl + '/system-take-coffee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: pb.authStore.token
      },
    })

    if (res.status !== 200) return Swal.fire({
      title: 'Ops!',
      text: 'Não foi possível retirar o café, tente novamente mais tarde!',
      icon: 'error',
      confirmButtonText: 'Ok'
    })

    Swal.fire({
      title: 'O café está pronto!',
      text: 'aproveite!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  const buyCoffee = async () => {
    await Swal.fire({
      title: 'Deseja comprar mais créditos?',
      text: 'Uma cobrança será gerada para o pagamento',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Criando cobrança...',
          text: 'Aguarde um momento',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        newCharge()
      }
    })
  }

  useEffect(() => {
    if (!pb.authStore.isValid) return window.location.href = '/'

    getRemaning()
    getAvatar()
  }, [])

  useEffect(() => {
    if (isPaing) {
      onPay()
    }
  }, [remaning])
 
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
