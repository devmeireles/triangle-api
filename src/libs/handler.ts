import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export default function handler<T>(
  lambda: (event: APIGatewayEvent, context: Context) => Promise<T>
) {
  return async function (
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    try {
      const data = await lambda(event, context)

      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          data
        })
      }
    } catch (e) {
      return {
        statusCode: e.statusCode || 500,
        body: JSON.stringify({ error: e.message })
      }
    }
  }
}
