
function EmailCheck() {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-row justify-center mt-32 align-middle p-2 space-x-2">
          <img className='' src="src\assets\logo.png" alt="" />
        </div>
        <div className='flex flex-col items-center'>
              <p className='text-brown font-bold text-md mt-10 cursor-pointer'>
                Cheque seu email
              </p>
              <p className='text-center text-brown font-semibold text-md mt-10 ml-5 mr-5 cursor-pointer'>
                Enviamos instruções de recuperação de senha para seu e-mail
              </p>
          </div>
          <form className="flex flex-col items-center mt-12">
            <button className='bg-brown text-white w-64 p-2 rounded w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10'>
                Enviar email novamente 
            </button>
        </form>
      </div>
      
    );
  }
  
  export default EmailCheck;
  