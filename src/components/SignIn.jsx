import pfp from '../assets/pfp.png'

function SignIn() {
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
      <form className='flex flex-col items-center space-y-4'>
        <div className='flex flex-col items-center'>
          <input type="file" id="file" className="hidden" />
          <label htmlFor="file">
            <img src={pfp} alt="profile picture" className="rounded-full h-41 w-41" />
            <p className='text-brown font-semibold text-md mt-4'>
              Adicionar foto
            </p>
          </label>
        </div>
        <div className='flex flex-col space-y-4 w-72'>
          <input className='input-home' type="text" placeholder="Nome" />
          <input className='input-home' type="email" placeholder="E-Mail" />
          <input className='input-home' type="password" placeholder="Senha" />
        </div>
        <div className='flex flex-row items-center space-x-2'>
          <div>
            <input id="checkbox" type="checkbox" className='checkbox' />
          </div>
          <label htmlFor className='text-sm'>Eu aceito os <a href="/termos"><span className="text-brown font-semibold">Termos de uso</span></a></label>
        </div>
        <button className='btn-outline w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
          Cadastrar
        </button>
      </form>
      <p>Já tem conta? <a href="/login"><span className='text-brown font-semibold'>Entre aqui</span></a></p>
    </div>
  );
}

export default SignIn;
