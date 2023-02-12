import { ToastContainer, toast, Slide } from 'react-toastify';
import { FormEvent, useState } from 'react';
import { GetServerSideProps, GetStaticProps } from 'next';
import Image from 'next/image';

import { api } from '../services/api';

type HomeProps = {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  async function handleCreatePool(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!poolTitle.trim().length) {
      return;
    }

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      setPoolTitle('');

      toast.success('Bolão cadastrado com sucesso, o código foi copiado para a área de transferência', {
        position: "bottom-right",
        transition: Slide,
        autoClose: 3000,
        theme: "dark",
      });

    } catch (error) {
      toast.error('Falha ao cadastrar Bolão, tente novamente mais tarde', {
        position: "bottom-right",
        transition: Slide,
        autoClose: 3000,
        theme: "dark",
      });
    }
  }

  return (
    <>
      <div className='max-w-6xl min-h-screen mx-auto md:grid grid-cols-2 items-center gap-28 py-8 px-8 xl:px-0'>
        <main>
          <Image
            src="/assets/logo.svg"
            alt="NLW Copa"
            width={120}
            height={96}
            className="mx-auto md:mx-0"
          />

          <h1 className='mt-14 text-white text-4xl md:text-5xl font-bold leading-tight text-center md:text-left'>
            Crie seu próprio bolão da copa e compartilhe entre amigos
          </h1>

          <div className='mt-10 flex flex-col md:flex-row items-center gap-2'>
            <Image
              src="/assets/users-avatar-example.png"
              alt="Avatar dos participantes do evento"
              width={120}
              height={96}
            />

            <strong className='text-gray-100 text-base md:text-xl'>
              <span className='text-ignite-500'>+{userCount}</span> pessoas já estão usando
            </strong>
          </div>

          <form
            onSubmit={handleCreatePool}
            className='mt-10 flex flex-col md:flex-row gap-2'
          >
            <input
              type="text"
              required
              placeholder='Qual nome do seu bolão?'
              onChange={e => setPoolTitle(e.target.value)}
              value={poolTitle}
              className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-gray-100'
            />
            <button
              type="submit"
              className='bg-yellow-500 px-6 py-4 rounded uppercase text-gray-900 font-bold hover:bg-yellow-700'
            >
              Criar meu bolão
            </button>
          </form>

          <p className='mt-4 text-gray-300 text-sm leading-relaxed'>
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar seus amigos
          </p>

          <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
            <div className='flex items-center gap-6 w-[50vw] md:w-auto'>
              <Image
                src="/assets/icon-check.svg"
                alt="icon"
                width={50}
                height={50}
              />

              <div className='flex flex-col'>
                <span className='font-bold text-base md:text-2xl'>+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className='hidden md:block w-px h-10 bg-gray-600' />

            <div className='flex items-center gap-6 w-[50vw] md:w-auto'>
              <Image
                src="/assets/icon-check.svg"
                alt="icon"
                width={50}
                height={50}
              />

              <div className='flex flex-col'>
                <span className='font-bold text-base md:text-2xl'>+{guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>

        <Image
          src="/assets/app-nlw-copa-preview.png"
          alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
          width={400}
          height={400}
          quality={100}
          className="hidden md:block"
        />
      </div>

      <ToastContainer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse
  ] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count'),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data ? poolCountResponse.data.count : 0,
      guessCount: guessCountResponse.data ? guessCountResponse.data.count : 0,
      userCount: userCountResponse.data ? userCountResponse.data.count : 0,
    },
    revalidate: 60 * 1,
  }
}
