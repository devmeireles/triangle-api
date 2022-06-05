import { context, event } from "./mocks/aws.mock";
import { ETriangle, ITriangle } from "../src/types/Triangle";
import { calculateTriangle } from "../src/api/controllers/triangleController";
import {
  getEquilateralTriangle,
  getIsoscelesTriangle,
  getRandomTriangle,
  getScaleneTriangle,
} from "./mocks/triangle.mock";

describe("Triangle", () => {
  it("It shouldn't return a triangle because there's no sizes", async () => {
    event.body = JSON.stringify({});

    const { body, statusCode } = await calculateTriangle(event, context);
    const resultTriangle = JSON.parse(body);

    expect(statusCode).toEqual(400);
    expect(resultTriangle).toHaveProperty("error");
  });

  it("It shouldn't return a triangle because the request body contains a value as zero", async () => {
    const triangle: ITriangle = {
      sizeA: 0,
      sizeB: 3,
      sizeC: 3,
    };
    event.body = JSON.stringify(triangle);

    const { body, statusCode } = await calculateTriangle(event, context);
    const resultTriangle = JSON.parse(body);

    expect(statusCode).toEqual(400);
    expect(resultTriangle).toHaveProperty("error");
  });

  it("It should return a equilateral triangle type", async () => {
    const equilateral: ITriangle = getEquilateralTriangle();

    event.body = JSON.stringify(equilateral);

    const { body, statusCode } = await calculateTriangle(event, context);
    const resultTriangle = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(resultTriangle).toHaveProperty("success");
    expect(resultTriangle).toHaveProperty("data");
    expect(resultTriangle.data.type).toStrictEqual(ETriangle.EQUILATERAL);
  });

  it("It should return a isosceles triangle", async () => {
    const isosceles: ITriangle = getIsoscelesTriangle();

    event.body = JSON.stringify(isosceles);

    const { body, statusCode } = await calculateTriangle(event, context);
    const resultTriangle = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(resultTriangle).toHaveProperty("success");
    expect(resultTriangle).toHaveProperty("data");
    expect(resultTriangle.data.type).toStrictEqual(ETriangle.ISOSCELES);
  });

  it("It should return a scalene triangle", async () => {
    const scalene: ITriangle = getScaleneTriangle();

    event.body = JSON.stringify(scalene);

    const { body, statusCode } = await calculateTriangle(event, context);
    const resultTriangle = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(resultTriangle).toHaveProperty("success");
    expect(resultTriangle).toHaveProperty("data");
    expect(resultTriangle.data.type).toStrictEqual(ETriangle.SCALENE);
  });

  it("It should return a random triangle type", async () => {
    const randomic: ITriangle = getRandomTriangle();

    event.body = JSON.stringify(randomic);

    const { body, statusCode } = await calculateTriangle(event, context);
    const resultTriangle = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(resultTriangle).toHaveProperty("success");
    expect(resultTriangle).toHaveProperty("data");
    expect(Object.values(ETriangle)).toContain(resultTriangle.data.type);
  });
});
