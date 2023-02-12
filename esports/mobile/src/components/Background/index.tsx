import {
  ImageBackground
} from 'react-native';

import { styles } from './styles';

import backgroundImg from '../../assets/background-galaxy.png';

type BackgroundProps = {
  children: React.ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      style={styles.container}
      source={backgroundImg}
      defaultSource={backgroundImg}
    >
      {children}
    </ImageBackground>
  );
}
