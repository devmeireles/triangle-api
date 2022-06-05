import { APIGatewayEvent } from 'aws-lambda'
import { v4 } from 'uuid'

import { ITriangle } from '../../types/Triangle'
import handler from '../../libs/handler'
import { getTriangleType } from '../models/triangleModel'
import { saveInteraction } from '../models/interactionModel'
import { IInteraction } from '../../types/Interaction'
import { ApiError } from '../../libs/responseHandler'

export const calculateTriangle = handler(
  async (event: APIGatewayEvent): Promise<Record<string, any>> => {
    const sizes: ITriangle = JSON.parse(event.body)

    if (Object.entries(sizes).length < 3) {
      throw new ApiError('You need to fill up the triangle sizes', 400)
    }
    if (Object.values(sizes).some((val) => val === 0)) {
      throw new ApiError('All sizes must be greater than zero', 400)
    }

    const type = getTriangleType(sizes)
    const interactionID = v4()
    const nowTS = new Date().getTime()

    const data: IInteraction = {
      PK: `INTERACTION#${interactionID}`,
      SK: `INTERACTION#${interactionID}`,
      type,
      shape: { ...sizes },
      createdAt: nowTS,
      updatedAt: nowTS
    }

    await saveInteraction(data)

    return { type }
  }
)
