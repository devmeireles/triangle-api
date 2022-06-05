import { v4 } from "uuid";

import { ETriangle } from "../../src/types/Triangle";
import { IInteraction } from "../../src/types/Interaction";
import { getEquilateralTriangle } from "./triangle.mock";

const interactionID = v4();

/**
 * Generates an interaction response
 */
export const getInteraction = jest.fn((): IInteraction => (
    {
        PK: `INTERACTION#${interactionID}`,
        SK: `INTERACTION#${interactionID}`,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        type: ETriangle.EQUILATERAL,
        shape: getEquilateralTriangle()
    }
))