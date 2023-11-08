import { useState } from 'react'
import { auth } from '../../lib/pocketbase'
import Swal from 'sweetalert2'

function LogIn() {
  const [credetials, setCredetials] = useState({
    email: '',
    password: '',
  })

  const showError = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

  const login = async (e) => {
    e.preventDefault()
    if (!credetials.email || !credetials.password) return showError('Erro ao entrar', 'Preencha todos os campos')

    Swal.fire({
      title: 'Entrando...',
      text: 'Aguarde enquanto entramos na sua conta',
      icon: 'info',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const user = await auth(credetials, 'email')
      .catch(() => showError('Erro ao entrar', 'Verifique se o e-mail e a senha estão corretos'))

    if (!user) return showError('Erro ao entrar', 'Verifique se o e-mail e a senha estão corretos')

    window.location.href = '/coffee'
  }

  return (
    <div className="flex flex-col h-screen">
      <form className="flex flex-col items-center mt-12" onSubmit={login}>
        <div className="flex flex-col space-y-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <input className="input-home" type="email" placeholder="E-Mail" value={credetials.email} onChange={(e) => setCredetials({ ...credetials, email: e.target.value })} />
          <input className="input-home" type="password" placeholder="Senha" value={credetials.password} onChange={(e) => setCredetials({ ...credetials, password: e.target.value })} />
        </div>
        <p className="text-sm mt-2 text-right text-brown">
          <a href="/PasswordRecovery">Esqueci minha senha</a>
        </p>
        <button className='btn-outline w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-6'>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LogIn;
