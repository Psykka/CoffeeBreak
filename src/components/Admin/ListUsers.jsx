import { useState } from 'react';
import Header from '../Header/Header';

const ListUsers = () => {
  return (
    <div className="flex flex-col h-screen">

      <Header />
      
      <div className="flex flex-col items-center justify-between m-10 gap-10">
        
          <h1 className="text-brown text-2xl font-semibold">Listagem de usuários</h1>  
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Consumiu</th>
                <th>Status</th>
              </tr>
              
            </thead>
            <tbody>
              <tr className="bg-light-beige m-10">
                <td>Felipe Kamada</td>
                <td>20</td>
                <td><span className="text-green">Pago</span></td>
              </tr>
              <tr className="bg-light-beige gap-10">
                <td>Kauan Boaro</td>
                <td>10</td>
                <td><span className="text-red">Pendente</span></td>
              </tr>
            </tbody>
          </table>
        
      </div>
      
    </div>
  );
}

export default ListUsers;