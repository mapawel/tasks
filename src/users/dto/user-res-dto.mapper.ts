import { User } from "../entity/user.entity";
import { UserResDTO } from "./user-res.dto";

export const userResDtoMapper = (user: User): UserResDTO => ({
  id: user.id,
  email: user?.email,
});
