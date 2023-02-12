import { IMessageRepository } from '@modules/message/repositories/IMessageRepository';

export class ListMessage {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(limit?: string) {
    return this.messageRepository.list({
      limit: limit || 3,
    });
  }
}
