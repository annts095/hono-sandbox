import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const endpoint = process.env.DYNAMODB_ENDPOINT ?? undefined;
const region = process.env.DYNAMODB_REGION ?? "ap-northeast-1";
const accessKeyId = process.env.DYNAMODB_ACCESS_KEY_ID ?? undefined;
const secretAccessKey = process.env.DYNAMODB_SECRET_ACCESS_KEY ?? undefined;

const main = async () => {
  const dynamoDB = new DynamoDBClient({
    endpoint,
    region,
    credentials: (() => {
      if (accessKeyId === undefined || secretAccessKey === undefined) {
        return undefined;
      }
      return { accessKeyId, secretAccessKey };
    })(),
  });

  await dynamoDB.send(
    new CreateTableCommand({
      TableName: "Messages",
      AttributeDefinitions: [
        {
          AttributeName: "code",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "code",
          KeyType: "HASH",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    })
  );

  console.log("DynamoDB initialized!");
};

main();
