import { UserProfile } from './UserProfile';
import { UserProfileController } from './UserProfileController';
import { PrismaUserRepository } from '../../repositories/prisma/PrismaUserRepository';

const prismaUserRepository = new PrismaUserRepository();

const userProfile = new UserProfile(prismaUserRepository);

const userProfileController = new UserProfileController(userProfile);

export { userProfile, userProfileController };
