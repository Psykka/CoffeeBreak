function LogIn() {
  return (
    <div className="flex flex-col h-screen">
      <form className="flex flex-col items-center mt-12">
        <div className="flex flex-col space-y-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <input className="input-home" type="email" placeholder="E-Mail" />
          <input className="input-home" type="password" placeholder="Senha" />
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
