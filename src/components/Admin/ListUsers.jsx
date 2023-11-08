import { useState, useEffect } from 'react';
import { pb } from '../../lib/pocketbase';
import Header from '../Header/Header';

const ListUsers = () => {
  const [users, setUsers] = useState([{
    name: '',
    payments: [{
      created: '',
      value: 0
    }]
  }]);
  const [payments, setPayments] = useState([{
    created: '',
    value: 0
  }]);

  const getDataLastMonth = () => {
    const date = new Date();
    const lastMonth = date.getMonth() - 1;
    const year = date.getFullYear();

    return `${year}-${lastMonth}-01`;
  }

  const getUsers = async () => {
    return await pb.collection('users').getFullList();
  }

  const getPayments = async () => {
    return await pb.collection('payments').getFullList({
      filters: 'created > ' + getDataLastMonth()
    });
  }

  const getPaymentsByUser = (userId) => {
    return payments.filter((payment) => payment.user === userId);
  }

  useEffect(() => {
    getPayments().then((res) => {
      setPayments(res);
    })

    getUsers().then((res) => {
      setUsers(res);
    })

  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col h-screen">
        <div className="flex flex-col items-center justify-between m-10 gap-2">

          <h1 className="text-brown text-2xl font-semibold">Listagem de usuários</h1>
          <div className="flex flex-row justify-between items-center w-1/2 bg-white rounded-lg p-4">
            <div className="flex flex-col justify-between items-start">
              <h1 className="text-brown text-lg font-semibold">Nome</h1>
              <h2 className="text-brown text-lg font-semibold">Valor total</h2>
            </div>
            <div className="flex flex-col justify-between items-end">
              {/* não é o consumo de vdd */}
              <h1 className="text-brown text-lg font-semibold">Consumo</h1>
            </div>
          </div>

          {users.map((user) => {
            return (
              <div className="flex flex-row justify-between items-center w-1/2 bg-yellow rounded-lg p-4">
                <div className="flex flex-col justify-between items-start">
                  <h1 className="text-brown text-lg font-semibold">{user.name}</h1>
                  <h2 className="text-brown text-lg font-semibold">R$ {getPaymentsByUser(user.id).reduce((acc, curr) => acc + curr.value, 0).toFixed(2)}</h2>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <h1 className="text-brown text-lg font-semibold">{getPaymentsByUser(user.id).length}</h1>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default ListUsers;