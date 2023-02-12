import * as Select from '@radix-ui/react-select';
import { SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function SelectComponent(_props: SelectProps) {
  return (
    <Select.Root>
      <Select.Trigger className='bg-zinc-900 inset-0 px-4 py-3 text-sm placeholder:text-zinc-500'>
        <Select.Value placeholder="Selecione o game que deseja jogar" className='text-zinc-500' />
        {/* <Select.Icon /> */}
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className='bg-zinc-900 rounded-md overflow-hidden'>
          <Select.ScrollUpButton />
          <Select.Viewport className='p-1'>
            <Select.Item value='algo' className='inset-0 text-white flex align-middle h-6 relative'>
              <Select.ItemText />
              <Select.ItemIndicator />
            </Select.Item>

            <Select.Group>
              <Select.Label />
              <Select.Item value='alguma coisa'>
                <Select.ItemText />
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
