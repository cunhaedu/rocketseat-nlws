import { ListMessage } from './ListMessage';
import { ListMessageController } from './ListMessageController';
import { PrismaMessageRepository } from '../../repositories/prisma/PrismaMessageRepository';

const prismaMessageRepository = new PrismaMessageRepository();

const listMessage = new ListMessage(prismaMessageRepository);

const listMessageController = new ListMessageController(listMessage);

export { listMessage, listMessageController };
