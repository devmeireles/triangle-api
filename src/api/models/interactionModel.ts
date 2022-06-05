import dynamo from '../../libs//dynamo'
import { IInteraction } from '../../types/Interaction'

const TableName: string = process.env.MAIN_TABLE

/**
 * Saves a interaction on database
 * @param data object as {@link IInteraction}
 */
export const saveInteraction = async (data: IInteraction): Promise<void> => {
  try {
    await dynamo.put({
      TableName,
      Item: data
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * List requested triangles interactions
 * @returns arr of object as {@link IInteraction}
 */
export const getInteractions = async (): Promise<IInteraction[]> => {
  try {
    const expressionAttributeNames = {
      '#action': 'PK',
      '#interaction': 'SK'
    }

    const expressionAttributeValues = {
      ':action': 'INTERACTION#',
      ':interaction': 'INTERACTION#'
    }

    const filterExpression =
      'begins_with(#action, :action) AND begins_with(#interaction, :interaction)'

    const interactions = (
      await dynamo.scan({
        TableName,
        FilterExpression: filterExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      })
    ).Items as IInteraction[]

    return interactions
  } catch (error) {
    console.log(error)
  }
}
