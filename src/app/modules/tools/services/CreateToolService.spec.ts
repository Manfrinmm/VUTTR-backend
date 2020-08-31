import FakeToolsRepository from "../repositories/fakes/FakeToolsRepository";
import CreateToolService from "./CreateToolService";

describe("CreateTool", () => {
  let fakeToolsRepository: FakeToolsRepository;

  let createTool: CreateToolService;

  beforeEach(() => {
    fakeToolsRepository = new FakeToolsRepository();

    createTool = new CreateToolService(fakeToolsRepository);
  });

  it("should be able to create a new tool", async () => {
    const tool = {
      user_id: "user_id",
      title: "Notion",
      link: "https://notion.so",
      description: "All in one tool to organize teams and ideas. Write, plan.",
      tags: ["planning", "collaboration", "writing", "calendar"],
    };

    const toolCreated = await createTool.execute(tool);

    expect(toolCreated).toEqual(expect.objectContaining(tool));
  });
});
