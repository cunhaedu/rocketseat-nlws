import { IUser } from './IUser';

export interface IMessage {
  id: string
  text: string
  user: IUser
  created_at: Date
}
