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
        password, // WYŁACZNIE NA POTRZEBY TEGO ZADANIA DOPUSZCZAM TRZYMANIE CZYSTEGO HASŁA! OCZYWIŚCIE TU MUSI BYĆ HASH ALE NIE MA TU IMPLEMENTACJI SIGNON I TWORZENIA USER ENTITY WIĘC NIE WDRAŻAM HASHOWANIA!!!
        createdAt: new Date(),
      });
    }

    return {
      email: testUser.email,
      password: testUser.password, // WYŁACZNIE NA POTRZEBY TEGO ZADANIA DOPUSZCZAM TRZYMANIE CZYSTEGO HASŁA! OCZYWIŚCIE TU MUSI BYĆ HASH ALE NIE MA TU IMPLEMENTACJI SIGNON I TWORZENIA USER ENTITY WIĘC NIE WDRAŻAM HASHOWANIA!!!
    };
  } catch (err) {
    console.error(
      "Error during geting or creating test user for development:",
      err
    );
  }
};
