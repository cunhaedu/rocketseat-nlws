import { useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Share } from 'react-native';

import { EmptyMyPoolList } from '../../components/EmptyMyPoolList';
import { PoolCardPros } from '../../components/PoolCard';
import { PoolHeader } from '../../components/PoolHeader';
import { Guesses } from '../../components/Guesses';
import { Loading } from '../../components/Loading';
import { Header } from '../../components/Header';
import { Option } from '../../components/Option';
import { api } from '../../services/api';

type RouteParams = {
  id: string;
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>(
    'guesses'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [pool, setPool] = useState({} as PoolCardPros);
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const toast = useToast();

  async function handleCodeShare() {
    await Share.share({
      message: pool.code,
    })
  }

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`pools/${id}`);
      setPool(response.data);
    } catch (error) {
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão!',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pool.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pool._count?.participants > 0
        ? (
          <VStack px={5} flex={1}>
            <PoolHeader data={pool} />

            <HStack bg="gray.800" p={1} rounded="sm" mb={5}>
              <Option
                title="Seus palpites"
                isSelected={optionSelected === 'guesses'}
                onPress={() => setOptionSelected('guesses')}
              />
              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === 'ranking'}
                onPress={() => setOptionSelected('ranking')}
              />
            </HStack>

            <Guesses poolId={pool.id} code={pool.code} />
          </VStack>
        ) : (
          <EmptyMyPoolList code={pool.code} />
        )
      }
    </VStack>
  )
}
