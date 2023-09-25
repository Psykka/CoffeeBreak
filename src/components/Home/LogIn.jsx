function LogIn() {
  return (
    <div className="flex flex-col items-center h-full space-y-4">
      <form className="flex flex-col items-center mt-16 space-y-10">
        <div className="flex flex-col items-center space-y-4">
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
