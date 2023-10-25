import { useState } from 'react'
import { auth } from '../../lib/pocketbase'

function LogIn() {
  const [credetials, setCredetials] = useState({
    email: '',
    password: '',
  })

  const login = async (e) => {
    e.preventDefault()
    const user = await auth(credetials, 'email')
    console.log(user)
  }

  return (
    <div className="flex flex-col h-screen">
      <form className="flex flex-col items-center mt-12" onSubmit={login}>
        <div className="flex flex-col space-y-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <input className="input-home" type="email" placeholder="E-Mail" value={credetials.email} onChange={(e) => setCredetials({ ...credetials, email: e.target.value })} />
          <input className="input-home" type="password" placeholder="Senha" value={credetials.password} onChange={(e) => setCredetials({ ...credetials, password: e.target.value })} />
        </div>
        <p className="text-sm mt-2 text-right text-brown">
          <a href="#">Esqueci minha senha</a>
        </p>
        <button className='btn-outline w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-6'>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LogIn;
