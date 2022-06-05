import { listInteractions } from "../src/api/controllers/interactionController";
import { context, event } from "./mocks/aws.mock";
import { getInteraction } from "./mocks/interaction.test";

describe("Interaction", () => {
  it("It should return a equilateral triangle type", async () => {
    const interaction = getInteraction();

    const { body, statusCode } = await listInteractions(event, context);
    const resultInteraction = JSON.parse(body);

    const resultKeys = Object.keys(resultInteraction.data[0]).sort()
    const staticKeys = Object.keys(interaction).sort()

    expect(statusCode).toEqual(200);
    expect(resultInteraction).toHaveProperty("success");
    expect(resultInteraction).toHaveProperty("data");
    expect(resultKeys).toMatchObject(staticKeys)
  });
});
