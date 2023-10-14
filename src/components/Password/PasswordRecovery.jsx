
function PasswordRecovery() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row justify-center mt-32 align-middle p-2 space-x-2">
        <img className='' src="src\assets\logo.png" alt="" />
      </div>
      <div className='flex flex-col items-center'>
            <p className='text-brown font-bold text-md mt-5 cursor-pointer'>
              Esqueceu sua senha? 
            </p>
            <p className='text-center text-brown font-semibold text-md mt-10 ml-5 mr-5 cursor-pointer'>
              Informe o e-mail de cadastro para receber 
              um link de recuperação de senha 
            </p>
        </div>
        <form className="flex flex-col items-center mt-12">
        <div className="flex w-64 flex-col space-y-4 w-1/2 mt-5 md:w-1/3 lg:w-1/4 xl:w-1/6">
          <input className=" rounded input-home" type="email" placeholder="E-Mail" />
        </div>
        <button href="/EmailCheck"className='bg-brown text-white w-64 p-2 rounded w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10'>
          Enviar email
        </button>
      </form>
    </div>
    
  );
}

export default PasswordRecovery;
