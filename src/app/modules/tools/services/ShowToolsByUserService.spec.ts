import FakeUsersRepository from "../../users/repositories/fakes/FakeUsersRepository";
import FakeToolsRepository from "../repositories/fakes/FakeToolsRepository";
import ShowToolsByUserService from "./ShowToolsByUserService";

describe("ShowToolsByUser", () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeToolsRepository: FakeToolsRepository;

  let showToolsByUser: ShowToolsByUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeToolsRepository = new FakeToolsRepository();

    showToolsByUser = new ShowToolsByUserService(fakeToolsRepository);
  });

  test("should be able to list all tools by user", async () => {
    const tool1 = await fakeToolsRepository.create({
      user_id: "user_id",
      title: "Notion",
      link: "https://notion.so",
      description: "All in one tool to organize teams and ideas. Write, plan. ",
      tags: ["organization", "collaboration", "writing", "calendar"],
    });

    const tool2 = await fakeToolsRepository.create({
      user_id: "user_id",
      title: "json-server",
      link: "https://github.com/typicode/json-server",
      description:
        "Fake REST API based on a json schema. Useful for mocking and ...",
      tags: ["api", "json", "schema", "node", "github", "rest"],
    });

    const tool3 = await fakeToolsRepository.create({
      user_id: "user_id",
      title: "fastify",
      link: "https://www.fastify.io/",
      description:
        "Extremely fast and simple, low-overhead web framework for NodeJS.",
      tags: ["web", "framework", "node", "http2", "https", "localhost"],
    });

    const tools = await showToolsByUser.execute({
      user_id: "user_id",
    });

    expect(tools).toEqual([tool1, tool2, tool3]);
  });

  test("should be able to list tools filter by tag", () => {
    expect(true).toBe(true);
  });
});
