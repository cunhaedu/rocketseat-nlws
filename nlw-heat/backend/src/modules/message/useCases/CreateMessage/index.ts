import { CreateMessage } from './CreateMessage';
import { CreateMessageController } from './CreateMessageController';
import { PrismaMessageRepository } from '../../repositories/prisma/PrismaMessageRepository';

const prismaMessageRepository = new PrismaMessageRepository();

const createMessage = new CreateMessage(prismaMessageRepository);

const createMessageController = new CreateMessageController(createMessage);

export { createMessage, createMessageController };
