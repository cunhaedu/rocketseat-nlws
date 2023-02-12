import { useNavigation } from '@react-navigation/native';
import { Heading, useToast, VStack } from 'native-base';
import React, { useState } from 'react';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

export function FindPool() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();

  async function handleJoinPool() {
    if (!code.trim().length) {
      return toast.show({
        title: 'Informe um código para encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setIsLoading(true);

      await api.post('/pools/join', { code: code.trim().toUpperCase() });

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigate('pools');
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data?.message === 'Pool not found!') {
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      if (
        error.response?.data?.message === 'User has already joined this pool!'
      ) {
        return toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão!',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar bolão" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          value={code}
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
