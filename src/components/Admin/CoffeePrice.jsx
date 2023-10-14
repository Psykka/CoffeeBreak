import { useState } from 'react';

function CoffeePrice() {
  const [valorCotacao, setValorCotacao] = useState(20);
  const [valorUnidadesPorMes, setValorUnidadesPorMes] = useState(100);

  const aumentarCotacao = () => {
    setValorCotacao(valorCotacao + 1);
  };

  const diminuirCotacao = () => {
    if (valorCotacao > 0) {
      setValorCotacao(valorCotacao - 1);
    }
  };

  const aumentarUnidadesPorMes = () => {
    setValorUnidadesPorMes(valorUnidadesPorMes + 1);
  };

  const diminuirUnidadesPorMes = () => {
    if (valorUnidadesPorMes > 0) {
      setValorUnidadesPorMes(valorUnidadesPorMes - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold text-center mt-16">Cotação do café</h1>
      <div className="flex flex-row justify-center mt-10 space-x-4 items-center"> {/* Espaço entre os blocos de contador */}
        <div className='rounded shadow-md bg-yellow h-28 w-44 text-white'>
          <h1 className='text-center text-brown font-bold mt-4'>Mensalidade</h1>
          <div className='flex justify-center items-center mt-6'>
            <button className='text-brown text-3xl' onClick={diminuirCotacao}>-</button>
            <p className='text-lg text-brown font-semibold ml-3 mr-3'>R$ {valorCotacao.toFixed(2)}</p>
            <button className='text-brown text-2xl' onClick={aumentarCotacao}>+</button>
          </div>
        </div>
        <div className='rounded shadow-md bg-yellow h-28 w-44 text-white'>
          <h1 className='text-center text-brown font-bold mt-4'>Unidades por Mês</h1>
          <div className='flex justify-center items-center mt-6'>
            <button className='text-brown  text-3xl' onClick={diminuirUnidadesPorMes}>-</button>
            <p className='text-lg text-brown font-semibold ml-3 mr-3'>{valorUnidadesPorMes}</p>
            <button className='text-brown  text-2xl' onClick={aumentarUnidadesPorMes}>+</button>
          </div>
        </div>
        
      </div>
      <div className="flex flex-row justify-center mt-10 space-x-4 items-center"> {/* Espaço entre os blocos de contador */}
        <div className='rounded shadow-md bg-brown h-32 w-96 text-white'>
          <h1 className='text-2xl text-center text-white font-bold mt-2'>Mensalidade</h1>
          <p className='text-center text-white  ml-3 mr-3'>(Mensalidade x usuário)</p>
          <div className='flex justify-center items-center mt-6'>
            <p className='text-lg text-white font-semibold ml-3 mr-3'>R$ {valorCotacao.toFixed(2)}</p>
            
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center mt-10 space-x-4 items-center"> {/* Espaço entre os blocos de contador */}
        <div className='rounded shadow-md bg-brown h-32 w-96 text-white'>
          <h1 className='text-2xl text-center text-white font-bold mt-2'>Lucro total</h1>
          <p className='text-center text-white  ml-3 mr-3'>(Mensalidade x usuários)</p>
          <div className='flex justify-center items-center mt-6'>
            <p className='text-lg text-white font-semibold ml-3 mr-3'>R$ {valorCotacao.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <form className="flex flex-col items-center mt-12">
        <button className='bg-yellow shadow-md text-brown font-bold w-80 h-16 p-2 rounded w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10'>
          Salvar alterações
        </button>
      </form>
    </div>
  );
}

export default CoffeePrice;