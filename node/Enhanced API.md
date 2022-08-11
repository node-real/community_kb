# Enhanced API (Draft)

## Overview

Enhanced API is a set of APIs that supports developers to achieve their business goals in a simpler, faster and more reliable way. Compared with raw RPC APIs, you can achieve more with fewer code!

Our enhanced APIs are categorised into the following packages. 

1. Platform

2.  NFT

   Obtaining NFT data is complicated, with NFT APIs you can easily retrieve the NFT related data in more straightforward and fast ways.

3. Account and Balances

4. Swap(planning)

## NFT

### Query NFT token balance from contract address, address, and block number

### nr_getTokenBalance1155

#### Token balance of ERC 1155

In ERC1155, each token ID represents a class of tokens. For example, if we have a collection of pens, with token id is 100, then we can query how many pens does one person has, and the number of pens is the balance of the address.

We support ERC1155/BEP1155 NFT balance query. To get the balance of a token, you need specify the smart contract address, account address, block number and token id. 

This is an API by which you can return the balance of an ERC1155/BEP1155 token of an address. The input parameter includes the block number, you can either specify latest,earliest,or specific hex value of the number of blocks. 
NOTICE: if the contract has no function of balanceOf(address account,uint256 id) method, api will return an error. The default chain is the BSC chain; if you need to query the balance from other chains, you need to add the chain like “eth” or “bsc” in your parameter.

#### Request Body 

```yaml
requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: integer
                  example: 1
                method:
                  type: string
                  example: nr_getTokenBalance1155
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: 'contract address,account address,blockNumber(latest,earliest,or specific hex value),tokenId(hex value)'
                  items:
                    type: string
                  example:
                    - '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
                    - '0xe04f27eb70e025b78871a2ad7eabe85e61212761'
                    - 'latest'
                    - '0x895280'
```

#### Response Body

```json
responses:
        '200':
          description: The balance of an ERC1155/BEP1155 token of an address
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    example: 1
                  jsonrpc:
                    type: string
                    example: '2.0'
                  result:
                    type: string
                    description: 32-byte fixed-length hexadecimal number
                    example: >-
                      0x000000000000000000000000000000000000000005bf8de73e1a17553e3e59d4
```

#### Example

CURL Request

```shell
curl --location --request POST 'https://bsc-mainnet.nodereal.io/v1/{your-api-key}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": 1,
  "method": "nr_getTokenBalance1155",
  "jsonrpc": "2.0",
  "params": [
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "0xe04f27eb70e025b78871a2ad7eabe85e61212761",
    "latest",
    "0x895280"
  ]
}'
```

#### Response

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": "0x000000000000000000000000000000000000000005bf8de73e1a17553e3e59d4"
}
```

### nr_getTokenBalance721

#### Token balance of ERC 721

Compared with ERC 1155, every ERC 721 token is unique. Therefore the balance of ERC 721 is the number of unique tokens of an owner. The API returns the number of NFTs in owner’s account. The contract address is usually a collection contract address, which includes a collection of NFTs.

**Note**: If the contract has not balanceOfbalanceOf(address owner) method, api will return error.

#### Request Body 

```yaml
requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: integer
                  example: 1
                method:
                  type: string
                  example: nr_getTokenBalance721
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: 'contract address,account address,blockNumber(latest,earliest,or specific hex value)'
                  items:
                    type: string
                  example:
                    - '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
                    - '0xe04f27eb70e025b78871a2ad7eabe85e61212761'
                    - 'latest'
```

#### Response

```yaml
responses:
        '200':
          description: The balance of an ERC721/BEP721 token of an address
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    example: 1
                  jsonrpc:
                    type: string
                    example: '2.0'
                  result:
                    type: string
                    description: 32-byte fixed-length hexadecimal number
                    example: >-
                      0x000000000000000000000000000000000000000005bf8de73e1a17553e3e59d4
```

#### Example

CURL request

```shell
curl -X 'POST' \
  'https://bsc-mainnet.nodereal.io/v1/{your-api-key}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "id": 1,
  "method": "nr_getTokenBalance721",
  "jsonrpc": "2.0",
  "params": [
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "0xe04f27eb70e025b78871a2ad7eabe85e61212761",
    "latest"
  ]
}'

```

#### Response

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": "0x000000000000000000000000000000000000000005bf8de73e1a17553e3e59d4"
}
```

### 

### nr_getTotalSupply721

#### Token supply of ERC721

This function is to used to return the total number of tokens of a contract. Usually you can use this API to query the total amount of a collection of NFTs.

**Note**: If the contract has not totalsupply() method, api will return error.

#### Request Body 

```yaml
 requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: integer
                  example: 1
                method:
                  type: string
                  example: nr_getTotalSupply721
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: contract address,blockNumber(latest,earliest,or specific hex value)
                  items:
                    type: string
                  example:
                    - '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
                    - '0x895440'
```

#### Response

```yaml
responses:
        '200':
          description: Total supply of tokens of a contract
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    example: 1
                  jsonrpc:
                    type: string
                    example: '2.0'
                  result:
                    type: string
                    description: 32-byte fixed-length hexadecimal number
                    example: >-
                      0x000000000000000000000000000000000000000005bf8de73e1a17553e3e59d4
```

#### Example

CURL request

```shell
curl -X 'POST' \
  'https://bsc-mainnet.nodereal.io/v1/{your-api-key}' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "method": "nr_getTotalSupply721",
  "jsonrpc": "2.0",
  "params": [
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "0x895440"
  ]
}'
```

#### Response

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": "0x000000000000000000000000000000000000000005bf8de73e1a17553e3e59d4"
}
```

### nr_getTotalSupply1155

#### Token supply of ERC1155

This function is to used to return the total number of a token of one contract. Different from ERC721, ERC1155 token id is a collection of tokens that can be converted to NFT. For exmaple, when you want to query the total number of a type of swords in your game, and this type swords will be associated with the token id, then you can use this API get the total number of the swords.

**Note**: If the contract has not totalsupply(uint256 id) method, api will return error.

#### Request Body 

```yaml
requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: integer
                  example: 1
                method:
                  type: string
                  example: nr_getTotalSupply721
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: >-
                    address,blockNumber(latest,earliest,or specific hex
                    value),tokenId(hex value)
                  items:
                    type: string
                  example:
                    - '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
                    - 'latest'
                    - '0x895280'
```

#### Response

```yaml
responses:
        '200':
          description: Total supply of tokens of a contract
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    example: 1
                  jsonrpc:
                    type: string
                    example: '2.0'
                  result:
                    type: string
                    description: 32-byte fixed-length hexadecimal number
                    example: >-
                      0x000000000000000000000000000000000000000005bf8de73e1a17553e3e59d4
```

#### Example

CURL request

```shell
curl -X 'POST' \
  'https://apus-swagger.fe.nodereal.cc/nr_getTotalSupply1155' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "method": "nr_getTotalSupply721",
  "jsonrpc": "2.0",
  "params": [
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "latest",
    "0x895280"
  ]
}'
```

#### Response

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": "0x000000000000000000000000000000000000000005bf8de73e1a17553e3e59d4"
}
```

### 

### nr_getTokenMeta

#### Metadata of a Token

This an API that returns the metadata of a Token using its contract address as a paramater. Metadata summarises the basic information about the data.

#### Request Body 

```yaml
requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: integer
                  example: 1
                method:
                  type: string
                  example: nr_getTokenMeta
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  items:
                    type: string
                  example:
                    - '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
```

#### Response

```yaml
responses:
        '200':
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    example: 1
                  jsonrpc:
                    type: string
                    example: '2.0'
                  result:
                    type: object
                    properties:
                      name:
                        type: string
                        example: USD Coin
                      symbol:
                        type: string
                        example: USDC
                      decimails:
                        type: integer
                        example: 18
                      tokenType:
                        type: string
                        example: ERC20
```

#### Example

CURL request

```shell
curl -X 'POST' \
  'https://apus-swagger.fe.nodereal.cc/nr_getTokenMeta' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "method": "nr_getTokenMeta",
  "jsonrpc": "2.0",
  "params": [
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "name": "USD Coin",
    "symbol": "USDC",
    "decimals": 18,
    "tokenType": "ERC20"
  }
}
```
