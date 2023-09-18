import googleLogo from '../../assets/google.png'

function LogIn() {
  return (
    <div className='text-center'>
      <button onClick={() => {
        window.location.href = '/signin'
      }}>
        Entrar
      </button>
      <p>Ou continue com</p>
      <button>
        <img className='h-10 w-10' src={googleLogo} alt="Google" />
      </button>
      <p>Não tem conta? <span>Registre-se aqui</span></p>
    </div>
  );
}

export default LogIn;
