import { User } from '../users/entity/user.entity';
import { mySQLDataSource } from '../data-source/mySQL.data-source';

export const onlyForDevelopmentGetOrCreateTestUser = async (
  email: string,
  hashpass: string
): Promise<{ email: string; hashpass: string } | void> => {
  try {
    const userRepository = mySQLDataSource.getRepository(User);
    let testUser: User | null;

    testUser = await userRepository.findOne({
      where: { email: email, hashpass: hashpass },
    });

    if (!testUser) {
      testUser = await userRepository.save({
        email,
        hashpass,
        createdAt: new Date(),
      });
    }

    return {
      email: testUser.email,
      hashpass: testUser.hashpass,
    };
  } catch (err) {
    console.error(
      'Error during geting or creating test user for development:',
      err
    );
  }
};
