import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Header from '../Header/Header';
import { pb } from '../../lib/pocketbase';

const CoffeePrice = () => {
  const [subscription, setSubscription] = useState({});
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.00);

  const getSubscription = async () => {
    return await pb.collection('subscription').getFullList();
  }

  useEffect(() => {
    getSubscription().then((res) => {
      const data = res[0];
      setSubscription(res);
      setUnitPrice(data.unitPrice);
      setQuantity(data.quantity);
      setTotalPrice(data.unitPrice * data.quantity);
    });
  }, []);

  const handleUnitPriceChange = (value) => () => {
    const newUnitPrice = unitPrice + value;
    setUnitPrice(newUnitPrice);
    setTotalPrice(quantity * newUnitPrice);
  }

  const handleQuantityChange = (value) => () => {
    const newQuantity = quantity + value;
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * unitPrice);
  }

  return (
    <>
      <Header />
      <div className="flex flex-col">
      
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">
        Valor do café
      </h1>

      <h2 className="text-2xl text-center mb-8">
        R$ {totalPrice.toFixed(2)}
      </h2>
      
      <div className="flex flex-row justify-center items-center gap-4">
        <div className='rounded shadow-md bg-yellow text-white p-4'>
          <h1 className='text-center text-brown font-bold'>
            Valor por unidade
          </h1>
          <div className='flex justify-center items-center gap-4'>
            <button className='text-brown text-3xl' onClick={handleUnitPriceChange(-1)}>-</button>
            <p className='text-lg text-brown font-semibold'>R$ {unitPrice.toFixed(2)}</p>
            <button className='text-brown text-2xl' onClick={handleUnitPriceChange(1)}>+</button>
          </div>
        </div>
        <div className='rounded shadow-md bg-yellow text-white p-4'>
          <h1 className='text-center text-brown font-bold'>
            Unidades por mês
          </h1>
          <div className='flex justify-center items-center gap-4'>
            <button className='text-brown  text-3xl' onClick={handleQuantityChange(-1)}>-</button>
            <p className='text-lg text-brown font-semibold'>{quantity}</p>
            <button className='text-brown  text-2xl' onClick={handleQuantityChange(1)}>+</button>
          </div>
        </div>
      </div>
      
      <form className="flex flex-col items-center" onSubmit={(e) => {
        e.preventDefault();
        pb.collection('subscription').update(subscription[0].id, { unitPrice, quantity })
          .then(() => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Valor do café atualizado',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          })
      }}>
        <button className='bg-yellow shadow-md text-brown font-bold h-16 p-2 rounded w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10'>
          Salvar alterações
        </button>
      </form>
    </div>
    </>
  );
}

export default CoffeePrice;