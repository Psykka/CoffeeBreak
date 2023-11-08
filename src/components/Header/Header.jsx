import { useEffect } from 'react';
import pfp from '../../assets/pfpimage.jpg'
import { pb } from '../../lib/pocketbase';

const Header = () => {
  useEffect(() => {
    if (!pb.authStore.isValid) window.location.href = '/admin';
  })

  return (
    <div className="flex flex-row justify-between items-center w-full h-16 bg-brown">
      <div className="flex flex-row justify-between items-center gap-4 ml-4">
        <img src={pfp} alt="pfp" className="w-10 h-10 rounded-full" />
        <h1 className="text-white font-bold text-xl">{pb.authStore.model.email}</h1>
      </div>
      <div className="flex flex-row justify-between items-center gap-4 mr-4">
        <a href="/admin/users" className="text-white font-bold text-xl">Usuários</a>
        <a href="/admin/coffee" className="text-white font-bold text-xl">Café</a>
        <a href="#" className="text-white font-bold text-xl" onClick={() => {
          pb.authStore.clear();
          window.location.href = '/admin';
        }}>Sair</a>
      </div>
    </div>
  );
};

export default Header;