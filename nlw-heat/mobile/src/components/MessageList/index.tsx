import React, { useEffect, useState } from 'react';

import {
  ScrollView,
  View
} from 'react-native';
import { io } from 'socket.io-client';

import { IMessage } from '../../interfaces/IMessage';
import { api } from '../../services/api';
import { Message } from '../Message';

import { styles } from './styles';

let messagesQueue: IMessage[] = [];

const socket = io(String(api.defaults.baseURL));

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
  console.log(newMessage);
});

export function MessageList(){
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    api.get<IMessage[]>('messages').then(data => {
      const { data: response } = data;

      console.log(response);

      setMessages(response);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[1],
          prevState[2],
        ]);

        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'
    >
      {messages.map(message => <Message key={message.user.id} data={message} />)}
    </ScrollView>
  );
}
