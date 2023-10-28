import googleLogo from '../../assets/google.svg'
import instagramLogo from '../../assets/instagram.svg'
import line from '../../assets/line.svg'

import { auth, pb } from '../../lib/pocketbase'

function Welcome() {
  const login = (type) => async () => {
    const user = await auth({}, type)

    console.log(user)

    if (!user) return

    switch (type) {
      case 'google':
        const formData = new FormData()

        const fileInput = document.createElement('input')
        fileInput.type = 'file'

        const avatar = await fetch(user.meta.avatarUrl)
        const avatarBlob = await avatar.blob()
        formData.append('avatar', avatarBlob)

        formData.append('name', user.meta.name)
        formData.append('email', user.meta.email)

        await pb.collection('users').update(user.record.id, formData)
        break;
    
      default:
        break;
    }

    window.location.href = '/coffee'
  }

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
        <p className='sm:p-0 md:p-2 mb-1'>Ou continue com</p>
        <img src={line} />
      </div>
      <div className='flex justify-center align-middle p-2 space-x-2'>
        <button className='btn-login'>
          <img className='h-9 w-9' src={googleLogo} onClick={login('google')} alt="Google" />
        </button>
        <button className='btn-login'>
          <img className='h-9 w-9' src={instagramLogo} onClick={login('instagram')} alt="Google" />
        </button>
      </div>
      <div>
        <p>Não tem conta? <a href="/signin"><span className='text-brown font-semibold'>Registre-se aqui</span></a></p>
      </div>
    </div>
  );
}

export default Welcome;
