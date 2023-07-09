import { User } from '../../users/entity/user.entity';
import { UserDTO } from './user.dto';

export const userDtoMapper = (user: User): UserDTO => ({
  id: user.id,
  email: user.email,
});
