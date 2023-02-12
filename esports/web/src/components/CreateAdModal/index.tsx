import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';

import { Input } from '../Form/Input';
import { IGame } from '../../pages/interfaces/IGame';
import { FormEvent, useState } from 'react';
import { getWeekDays } from '../../helpers/getWeekDays';
import { api } from '../../services/api';

type CreateAdModalProps = {
  games: IGame[];
}

export function CreateAdModal({ games }: CreateAdModalProps) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    if(!data.name) {
      return;
    }

    api.post(`/games/${data.game}/ads`, {
      name: data.name,
      discord: data.discord,
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      yearsPlaying: Number(data.yearsPlaying),
      weekDays: weekDays.map(Number),
      useVoiceChannel,
    })
      .then(() => alert('Anúncio criado com sucesso'))
      .catch(() => alert('Erro ao criar anúncio'));
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed max-h-[90vh] md:max-h-screen overflow-y-scroll md:overflow-y-auto bg-[#2A2634] py-8 px-4 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-4/5 lg:w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-xl md:text-3xl font-black'>
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className='flex flex-col gap-4 mt-8'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold'>Qual o game</label>
            <select
              id='game'
              name='game'
              defaultValue=""
              className='bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-500 appearance-none'
            >
              <option disabled value="">Selecione o game que deseja jogar</option>
              {games.map(game => (
                <option key={game.id} value={game.id}>{game.title}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='font-semibold'>Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder='Como te chamam dentro da game?'
            />
          </div>

          <div className='flex flex-col md:grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying" className='font-semibold'>Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder='Tudo bem ser 0'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="discord" className='font-semibold'>Qual o seu Discord?</label>
              <Input
                id="discord"
                name="discord"
                placeholder='usuario#0000'
              />
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <div>
                <ToggleGroup.Root
                  type='multiple'
                  className='grid grid-cols-7 md:grid-cols-4 gap-2'
                  onValueChange={setWeekDays}
                >
                  {getWeekDays().map(day => (
                    <ToggleGroup.Item
                      title={day.name}
                      value={day.value}
                      key={day.value}
                      className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes(day.value) ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      {day.initial}
                    </ToggleGroup.Item>
                  ))}
                </ToggleGroup.Root>
              </div>
            </div>

            <div className='flex flex-col gap-2 md:flex-1'>
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-6 md:gap-1'>
                <Input type="time" id="hourStart" name="hourStart" placeholder='De' />
                <Input type="time" id="hourEnd" name="hourEnd" placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root
              onCheckedChange={checked => {
                checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
              }}
              checked={useVoiceChannel}
              className='w-6 h-6 p-1 rounded bg-zinc-900'
            >
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex flex-col-reverse md:flex-row justify-end gap-4'>
            <Dialog.Close
              type="button"
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center hover:bg-violet-600'
            >
              <div className='self-center flex align-middle justify-center w-full gap-3'>
                <GameController size={24} />
                Encontrar duo
              </div>
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
