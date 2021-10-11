import { User } from '../models/user.model';

export const NEW_USER_PAGE = '/users/-1';
export const NEW_USER_ID = -1;

export const EMPTY_USER: User = {
  id: 0,
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
};
