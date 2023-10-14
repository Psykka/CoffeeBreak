function CreatePassword() {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-row justify-center mt-32 align-middle p-2 space-x-2">
          <img className='' src="src\assets\logo.png" alt="" />
        </div>
        <p className='text-brown text-center font-bold text-md mt-5 cursor-pointer'>
            Cheque seu email
        </p>
        
        <form className="flex flex-col items-center mt-12">
          <div className="flex flex-col w-64 space-y-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
            <input className="rounded input-home" type="password" placeholder="Digite sua nova senha" />
            <input className="rounded input-home" type="password" placeholder="Confirme sua nova senha" />
          </div>
            <button className='bg-brown text-white w-64 p-2 rounded w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10'>
                Alterar senha
            </button>
        </form>
      </div>
    );
  }
  
  export default CreatePassword;
  