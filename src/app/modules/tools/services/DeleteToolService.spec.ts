import AppError from "../../../erros/AppError";
import FakeToolsRepository from "../repositories/fakes/FakeToolsRepository";
import DeleteToolService from "./DeleteToolService";

describe("DeleteTool", () => {
  let toolsRepository: FakeToolsRepository;

  let deleteTool: DeleteToolService;

  beforeEach(() => {
    toolsRepository = new FakeToolsRepository();

    deleteTool = new DeleteToolService(toolsRepository);
  });

  it("should be able to delete a tool", async () => {
    const tool = await toolsRepository.create({
      title: "hotel",
      link: "https://github.com/typicode/hotel",
      description:
        "Local app manager. Start apps within your browser, developer too.",
      tags: ["webapps", "domain", "developer", "https", "proxy"],
      user_id: "user_id",
    });

    await deleteTool.execute({
      tool_id: tool.id,
      user_id: "user_id",
    });

    const response = await toolsRepository.findById(tool.id);

    expect(response).toBeUndefined();
  });

  it("should not be able to delete with non-existent tool", async () => {
    await expect(
      deleteTool.execute({
        tool_id: 0,
        user_id: "user_id",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete a tool of another user", async () => {
    const tool = await toolsRepository.create({
      title: "hotel",
      link: "https://github.com/typicode/hotel",
      description:
        "Local app manager. Start apps within your browser, developer too.",
      tags: ["webapps", "domain", "developer", "https", "proxy"],
      user_id: "user_id",
    });

    await expect(
      deleteTool.execute({
        tool_id: tool.id,
        user_id: "another_user_id",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
