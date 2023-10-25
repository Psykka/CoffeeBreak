import pfp from '../assets/pfp.png'
import { useState } from 'react'
import { auth } from '../lib/pocketbase'

function SignIn() {
  const [registry, setRegistry] = useState({
    name: '',
    email: '',
    password: '',
  })

  const register = async (e) => {
    e.preventDefault()
    const user = await auth({ ...registry }, 'singin')
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
          <input type="file" id="file" className="hidden" />
          <label htmlFor="file">
            <img src={pfp} alt="profile picture" className="cursor-pointer rounded-full h-41 w-41" />
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
