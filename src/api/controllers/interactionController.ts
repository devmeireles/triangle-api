import { APIGatewayEvent } from 'aws-lambda'
import { IInteraction } from '../../types/Interaction'
import { getInteractions } from '../models/interactionModel'

import handler from '../../libs/handler'

export const listInteractions = handler(
  async (event: APIGatewayEvent): Promise<IInteraction[]> => {
    const interactions: IInteraction[] = await getInteractions()

    if (interactions.length === 0) throw new Error("There's no items to list")

    return interactions
  }
)
