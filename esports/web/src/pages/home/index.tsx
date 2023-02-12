import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import { CreateAdModal } from '../../components/CreateAdModal';
import { GameBannerSlider } from '../../components/GameBannerSlider';

import { api } from '../../services/api';
import { IGame } from '../interfaces/IGame';

export default function Example() {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    api.get<IGame[]>('/games').then(response => {
      setGames(response.data);
    });
  }, []);

  return (
    <>
      <div className="min-h-[90vh] bg-main bg-no-repeat bg-cover bg-center">
        <div className="mx-auto max-w-7xl">
          <main className="sm:text-center lg:text-left h-[90vh] w-full flex flex-col-reverse lg:flex-row align-middle justify-evenly lg:justify-between">
            <aside className='lg:h-full px-8 flex align-middle justify-center flex-col lg:w-1/2'>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                Seu <span className="bg-nlw-gradient bg-clip-text text-transparent"> duo </span> está aqui.
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Encontre aqui aquela dupla perfeita para você compartilhar as melhores (ou não tão boas) experiências enquanto joga.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Dialog.Root>
                    <Dialog.Trigger
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-violet-500 px-8 py-3 text-base font-medium text-white hover:bg-violet-600 md:py-4 md:px-10 md:text-lg"
                    >
                      <MagnifyingGlassPlus size={24} />
                      Publicar anúncio
                    </Dialog.Trigger>

                    <CreateAdModal games={games} />
                  </Dialog.Root>
                </div>
              </div>
            </aside>
            <section className='h-64 lg:h-full flex align-middle justify-center flex-col lg:w-1/2'>
              <img src="/assets/logo.svg" alt="logo" className='w-64 lg:w-2/4 self-center' />
            </section>
          </main>
        </div>
      </div>

      <GameBannerSlider games={games} />
    </>
  )
}
