import googleLogo from '../../assets/google.svg'
import instagramLogo from '../../assets/instagram.svg'
import line from '../../assets/line.svg'

function Welcome() {
  return (
    <div className='text-center space-y-4'>
      <div className='flex flex-row justify-center align-middle p-2 space-x-2 my-6 mb-10'>
        <button className='btn-outline w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5' onClick={() => {
          window.location.href = '/login'
        }}>
          Entrar
        </button>
      </div>
      <div className='flex flex-row justify-center align-middle p-2 space-x-2'>
        <img className='rotate-180' src={line} />
        <p className='sm:p-0 md:p-2'>Ou continue com</p>
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

export default Welcome;
