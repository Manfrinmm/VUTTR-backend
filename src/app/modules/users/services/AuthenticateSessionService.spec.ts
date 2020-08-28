import AppError from "../../../erros/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe("AuthenticateUser", () => {
  let fakeUsersRepository: FakeUsersRepository;

  let createUser: CreateUserService;
  let authenticateSession: AuthenticateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository);
    authenticateSession = new AuthenticateUserService(fakeUsersRepository);
  });

  it("should be able to authenticate", async () => {
    const user = {
      name: "Matheus mm",
      email: "matheus_poow@hotmail.com",
      password: "123",
    };

    const userCreated = await createUser.execute(user);

    const response = await authenticateSession.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(userCreated);
  });

  it("should not be able to authenticate with non existing user", async () => {
    const user = {
      name: "Matheus mm",
      email: "matheus_poow@hotmail.com",
      password: "123",
    };

    await expect(
      authenticateSession.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const user = {
      name: "Matheus mm",
      email: "matheus_poow@hotmail.com",
      password: "123",
    };

    await createUser.execute(user);

    await expect(
      authenticateSession.execute({
        email: user.email,
        password: "wrong password",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
