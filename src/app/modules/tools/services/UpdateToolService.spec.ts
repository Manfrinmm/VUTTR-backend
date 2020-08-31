import AppError from "../../../erros/AppError";
import FakeToolsRepository from "../repositories/fakes/FakeToolsRepository";
import UpdateToolService from "./UpdateToolService";

describe("UpdateToolService", () => {
  let toolsRepository: FakeToolsRepository;

  let updateTool: UpdateToolService;

  beforeEach(() => {
    toolsRepository = new FakeToolsRepository();

    updateTool = new UpdateToolService(toolsRepository);
  });

  it("should be able to update a tool", async () => {
    const tool = {
      title: "hotel",
      link: "https://github.com/typicode/hotel",
      description:
        "Local app manager. Start apps within your browser, developer too.",
      tags: ["webapps", "domain", "developer", "https", "proxy"],
      user_id: "user_id",
    };

    const toolCreated = await toolsRepository.create(tool);

    const toolUpdateData = {
      id: toolCreated.id,
      user_id: "user_id",
      title: "Update title",
      link: "Update link",
      tags: ["domain", "https", "proxy", "Add a new tag"],
    };

    const toolUpdated = await updateTool.execute({
      tool_id: toolUpdateData.id,
      ...toolUpdateData,
    });

    expect(toolUpdated).toEqual(expect.objectContaining(toolUpdateData));
  });

  it("should not be able to update with non-existent tool", async () => {
    await expect(
      updateTool.execute({
        tool_id: 0,
        user_id: "user_id",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a tool of another user", async () => {
    const tool = await toolsRepository.create({
      title: "hotel",
      link: "https://github.com/typicode/hotel",
      description:
        "Local app manager. Start apps within your browser, developer too.",
      tags: ["webapps", "domain", "developer", "https", "proxy"],
      user_id: "user_id",
    });

    await expect(
      updateTool.execute({
        tool_id: tool.id,
        user_id: "another_user_id",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
