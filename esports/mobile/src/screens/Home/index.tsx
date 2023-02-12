import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';

import { IGame } from '../../interfaces/IGame';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';

export function Home(){
  const [games, setGames] = useState<IGame[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.0.164:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      })
  }, []);

  function handleNavigationToGame({ id, title, bannerUrl }: IGame) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          defaultSource={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar"
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <GameCard
              data={item}
              onPress={() => handleNavigationToGame(item)}
            />
          }
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          horizontal
        >
        </FlatList>

      </SafeAreaView>
    </Background>
  );
}
