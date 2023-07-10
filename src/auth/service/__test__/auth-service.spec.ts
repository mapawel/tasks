import { User } from "users/entity/user.entity";
import { AuthService } from "../auth.service";
import { JwtService } from "../jwt.service";
import { AuthTestsConfig } from "./auth-tests.config";
import { Repository } from "typeorm";

describe("auth service testing suit:", () => {
  let authService: AuthService;
  let authTestsConfig: AuthTestsConfig;

  beforeEach(async () => {
    authTestsConfig = new AuthTestsConfig();
    authService = new AuthService(
      authTestsConfig.mockedUserRepository as unknown as Repository<User>
    );
  });

  describe("login method", () => {
    it('should accept credentials and run "sign" method from JwtService', async () => {
      // given
      const {
        createMockedRequestWithBody,
        mockedNextFn,
        mockedResponse,
        mockedUserRepository,
        testUserCredentials,
      } = authTestsConfig;

      const mockedUserRepoFindOneSpy = jest
        .spyOn(mockedUserRepository, "findOne")
        .mockResolvedValue({ id: 1 } as User);

      const jwtServiceSignSpy = jest
        .spyOn(JwtService, "sign")
        .mockResolvedValue("mockedToken");

      //when
      await authService.login(
        createMockedRequestWithBody(testUserCredentials),
        mockedResponse,
        mockedNextFn
      );

      //then
      expect(mockedUserRepoFindOneSpy).toBeCalledTimes(1);
      expect(jwtServiceSignSpy).toBeCalledTimes(1);
      expect(mockedResponse.json).toHaveBeenCalledWith({
        token: "mockedToken",
      });
      expect(mockedNextFn).not.toHaveBeenCalled();
    });
  });
});
