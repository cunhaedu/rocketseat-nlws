import { IMessageRepository } from '@modules/message/repositories/IMessageRepository';
import { io } from '@infra/http/app';
import { Message } from '.prisma/client';

export class CreateMessage {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(text: string, user_id: string) {
    const message = await this.messageRepository.create({
      text,
      user_id,
    } as Message);

    const infoWS = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      },
    };

    io.emit('new_message', infoWS);

    return message;
  }
}
