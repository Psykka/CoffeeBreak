import pfp from '../assets/pfp.png'
import { useState } from 'react'
import { auth, pb } from '../lib/pocketbase'
import Swal from 'sweetalert2'

function SignIn() {
  const [registry, setRegistry] = useState({
    name: '',
    email: '',
    password: '',
    pfp: null
  })

  const register = async (e) => {
    e.preventDefault()

    Swal.fire({
      title: 'Criando conta...',
      text: 'Aguarde enquanto criamos sua conta',
      icon: 'info',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    await auth({ ...registry }, 'singin')
    await auth({ ...registry }, 'email')

    // upload avatar
    const user = await pb.collection('users').getOne(pb.authStore.model.id)
    const formData = new FormData()

    const fileInput = document.createElement('input')
    fileInput.type = 'file'

    const avatar = await fetch(registry.pfp)
    const avatarBlob = await avatar.blob()

    formData.append('avatar', avatarBlob)

    await pb.collection('users').update(user.id, formData)

    if (pb.authStore.isValid) {
      return window.location.href = '/coffee'
    }
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setRegistry({ ...registry, pfp: URL.createObjectURL(event.target.files[0]) })
    }
  }

  return (
    <div className='text-center h-screen space-y-6 p-4 flex flex-col justify-around align-middle'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-sans text-center text-brown font-bold'>
          Criar conta
        </h1>
        <h2 className='text-1xl font-sans text-center text-brown font-bold'>
          Seja bem vindo
        </h2>
      </div>
      <form className='flex flex-col items-center space-y-4' onSubmit={register}>
        <div className='flex flex-col items-center'>
          <input type="file" id="file" className="hidden" onChange={onImageChange} />
          <label htmlFor="file">
            <img alt="profile picture" src={registry.pfp || pfp} className="cursor-pointer rounded-full h-48 w-48" />
            <p className='text-brown font-semibold text-md mt-4 cursor-pointer'>
              Adicionar foto
            </p>
          </label>
        </div>
        <div className='flex flex-col space-y-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
          <input required className='input-home' type="text" placeholder="Nome" value={registry.name} onChange={(e) => setRegistry({ ...registry, name: e.target.value })} />
          <input required className='input-home' type="email" placeholder="E-Mail" value={registry.email} onChange={(e) => setRegistry({ ...registry, email: e.target.value })} />
          <input required minLength={8} className='input-home' type="password" placeholder="Senha" value={registry.password} onChange={(e) => setRegistry({ ...registry, password: e.target.value })} />
        </div>
        <div className='flex flex-row items-center space-x-2'>
          <div>
            <input required id="checkbox" type="checkbox" className='checkbox' />
          </div>
          <label htmlFor="checkbox" className='text-sm'>Eu aceito os <a href="/termos"><span className="text-brown font-semibold">Termos de uso</span></a></label>
        </div>
        <button className='btn-outline w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6'>
          Criar conta
        </button>
      </form>
      <p>Já tem conta? <a href="/login"><span className='text-brown font-semibold'>Entre aqui</span></a></p>
    </div>
  );
}

export default SignIn;
