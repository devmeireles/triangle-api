# Triangle REST API application

This is a quite simple API that allows to determine if a triangle is equilateral, isosceles, or scalene according to the requested data.

- [Preamble](#preamble)
- [Stack](#stack)
- [Install](#install)
- [Execute](#execute)
- [Test](#test)
- [Deploy](#deploy)
- [REST API](#rest-api)
  - [Evaluating the triangle type](#evaluating-the-triangle-type)
    - [Request](#request)
    - [Response](#response)
  - [Listing the interactions](#listing-the-interactions)
    - [Request](#request-1)
    - [Response](#response-1)
- [TODO](#todo)

## Preamble

An equilateral triangle has all three sides the same length.

An isosceles triangle has at least two sides the same length.

A scalene triangle has all sides of different lengths.

## Stack

- Serverless
- AWS SDK
- TypeScript
- Jest
- Prettier
- ESLint
- Webpack

## Install

Make sure to add an AWS profile as **triangle-api** with:

```
serverless config credentials \
--provider aws \
--key AKIAIOSFODNN7EXAMPLE \
--secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

For more datails please take a look on [Serverless Oficial Documentation](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) <br /> <br />

Installing the required Serverless plugins

```
serverless plugin install -n serverless-webpack &&
serverless plugin install -n serverless-offline &&
serverless plugin install -n serverless-api-gateway-throttling
```

<br />

Installing the packages dependencies

```
npm i
```

<br />

Setting the local environment

```
cp env.yml.example env.yml && cp .env.example .env
```

Setting a `.env` file:

```
MAIN_TABLE=dev-triangle
AWS_DYNAMO_ACCESS_KEY=AKIAIO6S8E3BA1EXAMPLE
AWS_DYNAMO_SECRET_KEY=xA2GwIdjqfm4Jc97DDbFRa8rOwD2pnfrEXAMPLEKEY
```

*All interactions on dev / test environment reflect changes on database, so be aware when setting the **MAIN_TABLE** value*

<br />

The **env.yml** is responsible for setup your lambda environment variables, make sure to setup properly the env.yml file considering scenarios such as dev, stage and prod like:

```yml
default:
  MAIN_TABLE: dev-triangle
  AWS_DYNAMO_ACCESS_KEY: AKIAIOSFODNN7EXAMPLE
  AWS_DYNAMO_SECRET_KEY: fIjn3fgnNlbfAGMacxfc8xl6f7LtdpZiEXAMPLEKEY
  REGION: sa-east-1
dev:
  MAIN_TABLE: dev-triangle
  AWS_DYNAMO_ACCESS_KEY: AKI32OSCVAPC3EXAMPLE
  AWS_DYNAMO_SECRET_KEY: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  REGION: sa-east-1
stage:
  MAIN_TABLE: stage-triangle
  AWS_DYNAMO_ACCESS_KEY: AKIFDASGODEN7EXAMPLE
  AWS_DYNAMO_SECRET_KEY: V1csfShUTBRc4xK6VcLT4SEv2HOq7fruEXAMPLEKEY
  REGION: sa-east-1
prod:
  MAIN_TABLE: prod-triangle
  AWS_DYNAMO_ACCESS_KEY: AKIAIO6S8E3BA1EXAMPLE
  AWS_DYNAMO_SECRET_KEY: xA2GwIdjqfm4Jc97DDbFRa8rOwD2pnfrEXAMPLEKEY
  REGION: sa-east-1
```

Finally you need to deploy at least the dev database to be able to run the application locally and test cases

<table class="demo">
 <thead>
 <tr>
  <th>Command</th>
  <th>Stage</th>
 </tr>
 </thead>
 <tbody>
 <tr>
  <td><strong>deploy:database:dev</strong></td>
  <td>dev</td>
 </tr>
 <tr>
  <td><strong>deploy:database:stage</strong></td>
  <td>stage</td>
 </tr>
 <tr>
  <td><strong>deploy:database:prod</strong></td>
  <td>production</td>
 </tr>
 </tbody>
</table>

To deploy an initial database for dev environment:
```
npm run deploy:database:dev
```

## Execute

With `serverless-offline` and `serverless-webpack` you can compile and execute your lambdas locally executing:

```
npm run start:dev
```

With that you'll be able to see a list containing the current API endpoints such as:

<table class="demo">
 <thead>
 <tr>
  <th>Method</th>
  <th>Endpoint</th>
 </tr>
 </thead>
 <tbody>
 <tr>
  <td><strong>POST</strong></td>
  <td>http://localhost:3000/dev/triangle</td>
 </tr>
 <tr>
  <td><strong>GET</strong></td>
  <td>http://localhost:3000/dev/interactions</td>
 </tr>
 </tbody>
</table>

## Deploy

Make sure to initially deploy the database as mentioned on [Install](#install) section then you'll be able to deploy the API using the following commands: <br />
<table class="demo">
 <thead>
 <tr>
  <th>Command</th>
  <th>Stage</th>
 </tr>
 </thead>
 <tbody>
 <tr>
  <td><strong>deploy:dev</strong></td>
  <td>stage</td>
 </tr>
 <tr>
  <td><strong>deploy:stage</strong></td>
  <td>stage</td>
 </tr>
 <tr>
  <td><strong>deploy:prod</strong></td>
  <td>stage</td>
 </tr>
 </tbody>
</table>

## Test

You can run test cases easily using Jest

<br />

To test with coverage results (you can see the results on `test/coverage`):

```
npm run test:coverage
```

<br />

To test without coverage:

```
npm run test
```

## REST API

The application contains two endpoins, a `POST` with a body containing three sizes to form a trianglue that will validate and return the type of triangle according to the shared sizes and finally save an interaction on database; The other one is a `GET` request responsible for listing all registered interactions

### Evaluating the triangle type
Receives a json body containing three sizes of a triangle the returns the type of according to the sizes

#### Request

`POST /triangle`

    curl -i http://localhost:3000/dev/triangle \
    -d '{ "sizeA": 1, "sizeB": 1, "sizeC": 3 }' \
    -H 'Accept: application/json'

#### Response

```
HTTP/1.1 200 OK
access-control-allow-origin: *
access-control-allow-credentials: true
content-type: application/json; charset=utf-8
cache-control: no-cache
content-length: 44
Date: Fri, 03 Jun 2022 22:48:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "data": {
        "type": "isosceles"
    }
}
```

***

### Listing the interactions
Returns a list of interactions containing the lasts request triangle calculation

#### Request

`GET /interactions`

    curl -i http://localhost:3000/dev/interactions

#### Response

```
HTTP/1.1 200 OK
access-control-allow-origin: *
access-control-allow-credentials: true
content-type: application/json; charset=utf-8
cache-control: no-cache
content-length: 4222
vary: accept-encoding
accept-ranges: bytes
Date: Fri, 03 Jun 2022 22:53:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
    "success": true,
    "data": [
        {
            "updatedAt": 1654287131848,
            "createdAt": 1654287131848,
            "SK": "INTERACTION#f5773602-7e9b-4c7d-ab21-bbae9877cdb7",
            "shape": {
                "sizeC": 3,
                "sizeA": 1,
                "sizeB": 2
            }
        }, {
            "updatedAt": 1654287086380,
            "createdAt": 1654287086380,
            "SK": "INTERACTION#1dd2c34e-59d1-44a0-bfc5-998589866493",
            "shape": {
                "sizeC": 3,
                "sizeA": 3,
                "sizeB": 3
            },
            "PK": "INTERACTION#1dd2c34e-59d1-44a0-bfc5-998589866493",
            "type": "equilateral"
        }
    ]
}

```

## TODO

1e. Optional: Bonus points if authentication is implemented