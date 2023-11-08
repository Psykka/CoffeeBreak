import { useState } from 'react';
import Swal from 'sweetalert2';

import { pb } from '../../lib/pocketbase';

const Login = () => {
  const [loginData, setLoginData] = useState({
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

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>
        <form onSubmit={(e) => {
          e.preventDefault();

          if (!loginData.email || !loginData.password) return showError('Erro ao entrar', 'Preencha todos os campos')

          Swal.fire({
            title: 'Entrando...',
            text: 'Aguarde enquanto entramos na sua conta',
            icon: 'info',
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading()
            }
          })

          pb.admins.authWithPassword(loginData.email, loginData.password)
            .then(() => window.location.href = '/admin/users')
            .catch(() => showError('Erro ao entrar', 'Verifique se o e-mail e a senha estão corretos'))
        }} className="flex flex-col items-center justify-center gap-4">
          <input type="text" placeholder="Email" className="input-home" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
          <input type="password" placeholder="Senha" className="input-home" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
          <input type="submit" value="Entrar" className="btn-outline" />
        </form>
      </div>
    </>
  )
}

export default Login;