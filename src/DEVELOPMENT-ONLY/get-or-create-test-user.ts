import { User } from "../users/entity/user.entity";
import { mySQLDataSource } from "../data-source/mySQL.data-source";

export const onlyForDevelopmentGetOrCreateTestUser = async (
  email: string,
  password: string
): Promise<{ email: string; password: string } | void> => {
  try {
    const userRepository = mySQLDataSource.getRepository(User);
    let testUser: User | null;

    testUser = await userRepository.findOne({
      where: { email, password },
    });

    if (!testUser) {
      testUser = await userRepository.save({
        email,
        password,
        createdAt: new Date(),
      });
    }

    return {
      email: testUser.email,
      password: testUser.password,
    };
  } catch (err) {
    console.error(
      "Error during geting or creating test user for development:",
      err
    );
  }
};
