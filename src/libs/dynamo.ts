import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Config } from 'aws-sdk'

let config = {}

if (
  (process.env.IS_OFFLINE && process.env.stage.includes('dev')) ||
  process.env.NODE_ENV === 'test'
) {
  config = new Config({
    credentials: {
      accessKeyId: process.env.AWS_DYNAMO_ACCESS_KEY,
      secretAccessKey: process.env.AWS_DYNAMO_SECRET_KEY
    },
    region: process.env.REGION || 'sa-east-1'
  })
}

const client: DocumentClient = new DocumentClient(config)

const put = async (
  params: DocumentClient.PutItemInput
): Promise<DocumentClient.PutItemOutput> => client.put(params).promise()

const query = async (
  params: DocumentClient.QueryInput
): Promise<DocumentClient.QueryOutput> => client.query(params).promise()

const scan = async (
  params: DocumentClient.ScanInput
): Promise<DocumentClient.ScanOutput> => client.scan(params).promise()

export default {
  put,
  query,
  scan
}
