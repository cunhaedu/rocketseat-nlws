import { IGame } from '../../pages/interfaces/IGame';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import { useEffect, useState } from 'react';

type GameBannerProps = {
  games: IGame[];
}

export function GameBannerSlider({ games }: GameBannerProps) {
  const [options, setOptions] = useState({});
  const [sliderRef] = useKeenSlider(options);

  useEffect(() => {
    setTimeout(() => {
      setOptions({
        breakpoints: {
          "(min-width: 375px)": {
            slides: { perView: 2, spacing: 30 },
          },
          "(min-width: 768px)": {
            slides: { perView: 4, spacing: 30 },
          },
          "(min-width: 1024px)": {
            slides: { perView: 6, spacing: 30 },
          },
          "(min-width: 1536px)": {
            slides: { perView: 8, spacing: 10 },
          },
        },
        slides: { perView: 1, spacing: 30 },
      });
    }, 10);
  }, []);

  return (
    <section className="mx-auto cursor-pointer max-w-[1344px] pl-8 md:px-8 flex flex-col items-center mb-10">
      <div ref={sliderRef} className="keen-slider">
        {games.map(game => (
          <div key={game.id} className='keen-slider__slide flex align-middle justify-center h-60 max-h-screen'>
          <div className='relative rounded-lg overflow-hidden'>
            <img
              src={game.bannerUrl}
              alt="imagem"
              className='w-auto h-60 object-cover object-center'
            />

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className='font-bold block text-white'>{game.title}</strong>
              <span className='text-zinc-300 text-sm block mt-1'>{game._count.ads} Anúncios</span>
            </div>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
}
