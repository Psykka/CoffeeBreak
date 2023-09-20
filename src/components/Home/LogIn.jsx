function LogIn() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col items-center justify-center w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <div className="flex flex-col items-center justify-center mb-4 gap-4">
          <input className="input-home" type="email" placeholder="E-Mail" />
          <input className="input-home" type="password" placeholder="Senha" />
        </div>
        <button className='btn-outline w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LogIn;
