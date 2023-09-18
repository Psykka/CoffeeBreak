import googleLogo from '../../assets/google.png'

function LogIn() {
  return (
    <>
      <button onClick={() => {
        window.location.href = '/signin'
      }}>
        Entrar
      </button>
      <p>Ou continue com</p>
      <button>
        <img src={googleLogo} alt="" />
      </button>
      <p>Não tem conta? <span>Registre-se aqui</span></p>
    </>
  );
}

export default LogIn;
