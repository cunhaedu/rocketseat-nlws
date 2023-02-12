import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';
import React from 'react';

type ButtonProps = IButtonProps & {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...props }: ButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'PRIMARY' ? 'yellow.500' : 'red.500'}
      _pressed={{
        bg: type === 'PRIMARY' ? 'yellow.600' : 'red.600',
      }}
      _loading={{
        _spinner: { color: 'black' }
      }}
      {...props}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === 'PRIMARY' ? 'black' : 'white'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
