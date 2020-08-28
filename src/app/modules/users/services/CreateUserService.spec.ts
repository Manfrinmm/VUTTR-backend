import AppError from "../../../erros/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

describe("CreateUser", () => {
  let fakeUsersRepository: FakeUsersRepository;

  let createUser: CreateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "Matheus mm",
      email: "matheus_poow@hotmail.com",
      password: "123",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with an email already used", async () => {
    await createUser.execute({
      name: "Matheus mm",
      email: "matheus_poow@hotmail.com",
      password: "123",
    });

    await expect(
      createUser.execute({
        name: "Matheus mm",
        email: "matheus_poow@hotmail.com",
        password: "123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
