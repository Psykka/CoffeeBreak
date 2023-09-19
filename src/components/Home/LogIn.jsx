import googleLogo from '../../assets/google.svg'
import instagramLogo from '../../assets/instagram.svg'
import line from '../../assets/line.svg'

function LogIn() {
  return (
    <div className='text-center space-y-4'>
      <div className='flex flex-row justify-center align-middle p-2 space-x-2 my-6 mb-10'>
        <button className='btn-outline' onClick={() => {
          window.location.href = '/signin'
        }}>
          Entrar
        </button>
      </div>
      <div className='flex flex-row justify-center align-middle p-2 space-x-2'>
        <img className='rotate-180' src={line} />
        <p className='px-2'>Ou continue com</p>
        <img src={line} />
      </div>
      <div className='flex justify-center align-middle p-2 space-x-2'>
        <button className='btn-login'>
          <img className='h-9 w-9' src={googleLogo} alt="Google" />
        </button>
        <button className='btn-login'>
          <img className='h-9 w-9' src={instagramLogo} alt="Google" />
        </button>
      </div>
      <div>
        <p>Não tem conta? <span className='text-brown font-semibold'>Registre-se aqui</span></p>
      </div>
    </div>
  );
}

export default LogIn;
