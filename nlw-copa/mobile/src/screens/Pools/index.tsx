import { VStack, Icon, useToast, FlatList } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Octicons } from '@expo/vector-icons';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { Loading } from '../../components/Loading';
import { PoolCard, PoolCardPros } from '../../components/PoolCard';
import { EmptyPoolList } from '../../components/EmptyPoolList';

export function Pools() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolCardPros[]>([]);

  const toast = useToast();

  async function fetchPools() {
    try {
      const response = await api.get<{ pools: PoolCardPros[] }>('pools');
      setPools(response.data.pools);
    } catch (error) {
      toast.show({
        title: 'Houve um erro ao buscar os bolões, tente novamente mais tarde!',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []));

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading
        ? <Loading />
        : <FlatList
            data={pools}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <PoolCard
                key={item.id}
                data={item}
                onPress={() => navigate('details', { id: item.id })}
              />
            }
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
            ListEmptyComponent={() => <EmptyPoolList />}
          />
      }

    </VStack>
  );
}
