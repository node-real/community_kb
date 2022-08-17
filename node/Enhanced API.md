# Enhanced API

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
NOTICE: if the contract has no function of balanceOf(address account,uint256 id) method, API will return an error. The default chain is the BSC chain; if you need to query the balance from other chains, you need to add the chain like “eth” or “bsc” in your parameter.

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

**Note**: If the contract doesn't have a balanceOfbalanceOf(address owner) method, the API will return an error.

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

**Note**: If the contract doesn't have totalsupply() method, the API will return an error.

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

This function is to used to return the total number of a token of one contract. Different from ERC721, ERC1155 token id is a collection of tokens that can be converted to NFT. For exmaple, when you want to query the total number of a type of swords in your game, and this type swords will be associated with the token id, then you can use this API to get the total number of the swords.

**Note**: If the contract doesn't have totalsupply(uint256 id) method, the API will return an error.

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
  'https://bsc-mainnet.nodereal.io/v1/{your-api-key}' \
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

### nr_getTokenMeta

#### Metadata of a Token

This is an API that returns the metadata of a Token using its contract address as a paramater. Metadata summarises the basic information about the data and usually being displayed on UI of an NFT marketplace to provide the information.

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
  'https://bsc-mainnet.nodereal.io/v1/{your-api-key}' \
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

### nr_getTotalSupply20

#### Total supply of an ERC20/BEP20 token

For each ERC20/BEP20 token, there's a specified total supply. This total supply is the amount of coins that have already been created, minus any coins that have been burned or removed from circulation. This information is usually being displayed to coin/token tracker websites such as Coinmarketcap and Coingecko.

**Note**: If the contract doesn't have totalSupply() method, the API will return an error.

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
                  example: nr_getTotalSupply20
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: address,blockNumber(latest,earliest,or specific hex value)
                  items:
                    type: string
                  example:
                    - '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
                    - latest
```

#### Response

```yaml
responses:
        '200':
          description: Total supply of token
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
  "method": "nr_getTotalSupply20",
  "jsonrpc": "2.0",
  "params": [
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "latest"
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0000000000000000000000000000000000000000061245ba1ae22428223e59d4"
}
```

### nr_getTokenBalance20

#### Returns the balance of an ERC20/BEP20 token of an address.

This API returns the balance of an ERC20/BEP20 using a specified contract address of the token, account address, and block number (latest,earliest,or specific hex value). 

One use case of this API is when a user of a DEX wants to perform a swap transaction using a particular token, the DEX will have to determine first the actual balance of the token that this user has in their wallet before they can perform their swap.

**Note**: If the contract has not balanceOf(address account) method, API will return error.

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
                  example: nr_getTokenBalance20
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: 'contract address,account address,blockNumber(latest,earliest,or specific hex value)'
                  items:
                    type: string
                  example:
                    - '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
                    - '0x8894e0a0c962cb723c1976a4421c95949be2d4e3'
                    - '0x1312D00'
```

#### Response

```yaml
responses:
        '200':
          description: The balance of an ERC-20/BEP20 token of an address
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
                      0x000000000000000000000000000000000000000002e04bb41ca9ed87e4b22cb6
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
  "method": "nr_getTokenBalance20",
  "jsonrpc": "2.0",
  "params": [
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
    "0x1312D00"
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x000000000000000000000000000000000000000002e04bb41ca9ed87e4b22cb6"
}
```

### nr_getTokenHoldings

#### BEP20 token holdings of an address

When calling this API, it will return a list of BEP20 tokens being held on a specified account address, page and page size (<100) as parameters.

This API can be used for Wallet application to display token balances and other information.

**Note**: The API will return empty name and symbol if the token address does not have name and symbol functions.

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
                  example: nr_getTokenHoldings
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: >-
                    
                    - accountAddress: account address.

                    - page: page is hex encoded.
                    
                    - pageSize: each page return at most pageSize items. pageSize is hex encoded and should be less equal than 100.

                  example:
                    - '0x0E34aD56379aceC7F09d815729B70c85adC1Ec99'
                    - '0x1'
                    - '0x12'
```

#### Response

```yaml
responses:
        '200':
          description: A JSON array of tokens and amount
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
                      details:
                        type: array
                        description: 'tokenAddress,tokenName,tokenSymbol,tokenDecimails(hex encoded),tokenBalance'
                        items:
                          type: object
                          properties:
                            tokenAddress:
                              type: string
                              example: '0xfcb5DF42e06A39E233dc707bb3a80311eFD11576'
                            tokenName:
                              type: string
                              example: 'www.METH.co.in'
                            tokenSymbol:
                              type: string
                              example: 'METH'
                            tokenDecimails:
                              type: string
                              example: '0x12'
                            tokenBalance:
                              type: string
                              example: '0x0000000000000000000000000000000000000000f'
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
  "method": "nr_getTokenHoldings",
  "jsonrpc": "2.0",
  "params": [
    "0x0E34aD56379aceC7F09d815729B70c85adC1Ec99",
    "0x1",
    "0x5"
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "details": [
      {
        "tokenAddress": "0x04645027122c9f152011f128c7085449b27cb6d7",
        "tokenBalance": "0x00000000000000000000000000000000000000000000a968163f0a57b4000000",
        "tokenName": "ARKR.org",
        "tokenSymbol": "ARKR.org",
        "tokenDecimals": "0x12"
      },
      {
        "tokenAddress": "0x0487b824c8261462f88940f97053e65bdb498446",
        "tokenBalance": "0x000000000000000000000000000000000000000000000000016345785d8a0000",
        "tokenName": "JetSwap Token",
        "tokenSymbol": "WINGS",
        "tokenDecimals": "0x12"
      },
      {
        "tokenAddress": "0x09e6733a59f329a408abb387e29e69ba3582a5af",
        "tokenBalance": "0x00000000000000000000000000000000000000000000062417d8af6a38200000",
        "tokenName": "VenLP.com",
        "tokenSymbol": "Venus-LP",
        "tokenDecimals": "0x12"
      },
      {
        "tokenAddress": "0x0df62d2cd80591798721ddc93001afe868c367ff",
        "tokenBalance": "0x00000000000000000000000000000000000000000000a968163f0a57b4000000",
        "tokenName": "TheVera.io",
        "tokenSymbol": "VERA",
        "tokenDecimals": "0x12"
      },
      {
        "tokenAddress": "0x108f5f2b2d68f4075d5753caf41da293dd4bc2b5",
        "tokenBalance": "0x000000000000000000000000000000000000000000000038baf2d5e3da3c0d82",
        "tokenName": "swap-bal.io",
        "tokenSymbol": "BAL",
        "tokenDecimals": "0x12"
      }
    ]
  }
}
```

### nr_getTokenHolders

#### Token holders and amount of tokens held

This API returns a list of token holders and the amount of the tokens being held for each account address depending on the set token address and page size. If there are more results, then a page Id can be returned as part of the response.

Blockchain explorers like BSCscan and Etherscan can use this API to track and display the account addresses of the holders of a specific token.

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
                  example: nr_getTokenHolders
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: >-
                    
                    - contract address.

                    - pageSize: each page return at most pageSize items. pageSize is hex encoded and should be less equal than 100.

                    - pageId: If more results are available, a pageId be returned in the response. Pass the pageId to fetch the next pageSize items. First it should be empty.

                  example:
                    - '0xcea59dce6a6d73a24e6d6944cfabc330814c098a'
                    - '0x14'
                    - ''
```

#### Response

```yaml
responses:
        '200':
          description: A JSON array of tokens and amount
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
                      pageId:
                        type: string
                        example: '100_342'
                      details:
                        type: array
                        description: 'accountAddress,tokenBalance'
                        items:
                          type: object
                          properties:
                            accountAddress:
                              type: string
                              example: '0x00000000100f9d75535cbf23f82e23db5558e8c1'
                            tokenBalance:
                              type: string
                              example: '0x0000000000000000000000000000000000000000f'
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
  "method": "nr_getTokenHolders",
  "jsonrpc": "2.0",
  "params": [
    "0xcea59dce6a6d73a24e6d6944cfabc330814c098a",
    "0x5",
    ""
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "pageId": "5_1764857",
    "details": [
      {
        "accountAddress": "0xcea59DCE6A6d73a24e6d6944CFaBc330814c098A",
        "tokenBalance": "0x00000000000000000000000000000000000000000000032d26d200d7ec7c870b"
      },
      {
        "accountAddress": "0xd44A938BC56d970445417BdA4d1A996CeD32CC0b",
        "tokenBalance": "0x0000000000000000000000000000000000000000000003cfc82e37e9a7400000"
      },
      {
        "accountAddress": "0x99b3CD11641f575831A9201FA4F8AdAc81911bDc",
        "tokenBalance": "0x000000000000000000000000000000000000000000f6c48721562c9c464bbf8b"
      },
      {
        "accountAddress": "0xd977295501f57AbD2CaB2255f5E8A04D23946Ef8",
        "tokenBalance": "0x000000000000000000000000000000000000000000050390220a831580809986"
      },
      {
        "accountAddress": "0x2be87aD70Cf11EA294d7c42044b5b8277A3E4874",
        "tokenBalance": "0x0000000000000000000000000000000000000000000000129ba0f8031f266edd"
      }
    ]
  }
}
```

### nr_getNFTHoldings

#### BEP-721/1155 token holdings information

This API returns the token address, quantity, token name and symbol. The parameters needed are the account address, token type(erc721/erc1155), page number and page size (<100).

Wallet application can use this API to fetch the information above and display on the UI.

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
                  example: nr_getNFTHoldings
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: 'account address,token type(erc721/erc1155),page(hex encoded),page size(hex encode, should less than 100)'
                  example:
                    - '0x99817ce62abf5b17f58e71071e590cf958e5a1bf'
                    - 'erc721'
                    - '0x1'
                    - '0x14'
```

#### Response

```yaml
responses:
        '200':
          description: A JSON array of tokens and amount
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
                      details:
                        type: array
                        description: 'tokenAddress,tokenName,tokenSymbol,nftNum(hex encoded)'
                        items:
                          type: object
                          properties:
                            tokenAddress:
                              type: string
                              example: '0xfcb5DF42e06A39E233dc707bb3a80311eFD11576'
                            tokenName:
                              type: string
                              example: 'Pancake Lottery Ticket'
                            tokenSymbol:
                              type: string
                              example: 'PLT'
                            tokenIdNum:
                              type: string
                              example: '0x10'
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
  "method": "nr_getNFTHoldings",
  "jsonrpc": "2.0",
  "params": [
    "0x99817ce62abf5b17f58e71071e590cf958e5a1bf",
    "erc721",
    "0x1",
    "0x14"
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "details": [
      {
        "tokenAddress": "0x5e74094cd416f55179dbd0e45b1a8ed030e396a1",
        "tokenIdNum": "0x12",
        "tokenName": "Pancake Lottery Ticket",
        "tokenSymbol": "PLT"
      },
      {
        "tokenAddress": "0xdf7952b35f24acf7fc0487d01c8d5690a60dba07",
        "tokenIdNum": "0x1",
        "tokenName": "Pancake Bunnies",
        "tokenSymbol": "PB"
      }
    ]
  }
}
```

### nr_getNFTInventory

#### Returns the BEP-721/1155 token inventory of an address, filtered by contract address

For reach account address holding an NFT, this API can return the inventory by having the account address, token address and page size (<100) as parameters. Page Id can be returned on the response if there's more results.

One common use case of this API is for block explorers to display the inventory for each account address under the token drop-down menu. See this <a href="https://bscscan.com/address/0x99817ce62abf5b17f58e71071e590cf958e5a1bf">address</a> for an example.

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
                  example: nr_getNFTInventory
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: >- 
                    
                    - accountAddress: account address.

                    - contractAddress: contract address.

                    - pageSize: each page return at most pageSize items. pageSize is hex encoded and should be less equal than 100.

                    - pageId: If more results are available, a pageId be returned in the response. Pass the pageId to fetch the next pageSize items. First it should be empty.

                  example:
                    - '0x0042f9b78c67eb30c020a56d07f9a2fc83bc2514'
                    - '0x64aF96778bA83b7d4509123146E2B3b07F7deF52'
                    - '0x14'
                    - ''
```

#### Response

```yaml
responses:
        '200':
          description: A JSON array of tokens and amount
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
                      pageId:
                        type: string
                        example: '100_342'
                      details:
                        type: array
                        description: 'tokenAddress,tokenName,tokenSymbol,balance'
                        items:
                          type: object
                          properties:
                            tokenAddress:
                              type: string
                              example: '0x5e74094cd416f55179dbd0e45b1a8ed030e396a1'
                            tokenId:
                              type: string
                              example: '0x0000000000000000000000000000000000000000f'
                            balance:
                              type: string
                              example: '0x00000000000000000000000000000000000000001'
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
  "method": "nr_getNFTInventory",
  "jsonrpc": "2.0",
  "params": [
    "0x0042f9b78c67eb30c020a56d07f9a2fc83bc2514",
    "0x64aF96778bA83b7d4509123146E2B3b07F7deF52",
    "0x14",
    ""
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "pageId": "",
    "details": [
      {
        "tokenAddress": "0x64af96778ba83b7d4509123146e2b3b07f7def52",
        "tokenId": "0x0000000000000000000000000000000000000000000000000000000004010006",
        "balance": "0x0000000000000000000000000000000000000000000000000000000000000001"
      },
      {
        "tokenAddress": "0x64af96778ba83b7d4509123146e2b3b07f7def52",
        "tokenId": "0x0000000000000000000000000000000000000000000000000000000005000004",
        "balance": "0x0000000000000000000000000000000000000000000000000000000000008c4f"
      }
    ]
  }
}
```

### nr_getNFTHolders

#### Token holder account addresses

When calling this API, it returns a list of token holder account addresses using the contract address and token Id as parameters. 

Aside from blockchain explorers use case, another use of this API is for NFT projects to track the current holders of their NFT. Projects who usually keep track of these account addresses give the owner of these addresses special rewards during events and sometimes token airdrops as well.

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
                  example: nr_getNFTHolders
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: 'contract address, tokenId(hex string)'
                  items:
                    type: string
                  example:
                    - '0x64aF96778bA83b7d4509123146E2B3b07F7deF52'
                    - '0x5000004'
```

#### Response

```yaml
responses:
        '200':
          description: A string representing addresses of the owners
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
                    type: array
                    description: 'ownerList'
                    items:
                      type: string
                    example:
                      - '0x99817ce62abf5b17f58e71071e590cf958e5a1bf'
                      - '0x5e74094cd416f55179dbd0e45b1a8ed030e396a1'
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
  "method": "nr_getNFTHolders",
  "jsonrpc": "2.0",
  "params": [
    "0x64aF96778bA83b7d4509123146E2B3b07F7deF52",
    "0x5000004"
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "result": [
      "0x0042F9b78C67eb30c020A56D07f9a2Fc83BC2514",
      "0x00A382B93ad2F0c8f13B9cD297a0F5091db62b00",
      "0x010F011B7065F4a59e9337e6815A0ddfA1E8CF9F",
      "0x01Effd3C67f62b65aA8c5aCC9ba259EBAD3237bD",
      "0x0233b8b89d81c027AfFDB1F84d69DeED3e0a9846",
      "0x03ddcBbAe9e2bD20aC394fC2Db6688C3C22361D8",
      "0x04c67cC565ebf4CED17f0EFb70201308b984D23a",
      "0x05470Ea99aa6beB85cFcEc39709f8B7d19783Eda",
      "0x054F3eEba79b2C463F14F1aFAafDFb52CD358fF7",
      "0x06f5581BEdeFe4E8d9b7c680fc3cc7ce41bFC8E9",
      "0x078Ca0b8B10891887c4c8F1Bc064F766565a9787",
      "0x08291B06Aaadbc0E9ad2C1ED6f0D9175b00530A7",
      "0x0b188C26CFa9bE9b6a04376AE69c147A71EB1311",
      "0x0c154853E888C16D5f1c3732b132C11C5Ee3e5cf",
      "0x0d53c741a2DabE1C485C5E6DBE656ed336DeaEf0",
      "0x0Dc939f394BF90002605Ed3cA5a2a25d3C6f9019",
      "0x10F044c166514Dc119b72EE174779b40bA0b26dF",
      "0x12417B88229aCd69a01f4E49F78c0182F8138b99",
      "0x13C482ec58EF45691f45199e95877a47eF8b2a71",
      "0x13f9D1E40eAa559cCc8173D55dd6BC04Cace76b7",
      "0x14870b284267560a04a63Ad28899EC02c6Efe427",
      "0x14b96a733EB7eD277e958d802C5d7241af9e749a",
      "0x14bb5582C27d6048a970781468287EcE8C19B0a0",
      "0x16A62B086C462B41f16bE1bB26bc42FE99187948",
      "0x17F5DA6D05eA9aF146c1026D2A05F31d1c9e613D",
      "0x183A6016c4E5175a0fe168b79283CE5338ef9d6A",
      "0x1bDB2657Fbd1691E5B2fA894EF087Ba526eAAB62",
      "0x1c2632BD93Bab3e6E23C9dDC30a78c1252A3c720",
      "0x1C5212899F9E0d83Aa761300D224437623a958f0",
      "0x1cE7b0d1D609778e3cb4f33A4058CfB4AaEf2Ee7",
      "0x1fCFc1e7D11584ebbc86A054eD8cabAdF0327335",
      "0x209C99a5700c320Cd3bA2CbAa2fE6135a37bC92B",
      "0x2133a8849a63f89D4063cAf8fE9E800Ab8A058fc",
      "0x2220F117cfd9EF6455d72412f5aaE61C95742D8d",
      "0x22527Ed453831e0274618d91DE9DF0166d78758c",
      "0x23265a447778f0e7B0D2026321e2E4aA6133EE99",
      "0x23b5386b53C31BecA79961A5dEE637debf70Bc31",
      "0x23f34f6113a1e43955B1E3409eafF9ED1732cCbE",
      "0x24da512f3E71fb2BB59467E195bC9C49c64ece6A",
      "0x24eF44f35a3d330a7Bfa6126751bfF7856c9BF71",
      "0x259D38ABECa896C045d82c16e8b64E8B5BB139e1",
      "0x285cD72CAE400A9630Aca10ee9189369eD46c9c3",
      "0x2ac35E6B8c53eEB1f4AAB424067026f34F412202",
      "0x2Ae20788DFdaAE7bC01c217C448C7d8A8AA3D049",
      "0x2af1d7ac57DC2Ae74C7190072d26a152611Aa339",
      "0x2Cf5Cd8dc377deD9cA1b5041a43B8E0C05CA5a55",
      "0x2E2933DB5511277372480C26977420ad60FF401D",
      "0x2F697170F55e4736e3A02B0Eb5ad5e3D6766734C",
      "0x348a565FFBc98C15D0E5B3340dce247BD01d82E1",
      "0x34a890Bcff85AE091E5EcfcBC878DffCD9a5c8bf",
      "0x357673dB7939f5DB99b4f7904beE15586e8b6C3C",
      "0x36f4eDd7ba9C4812c9fa5266D2db1C1C9d268Fe3",
      "0x39c00454e2CfD4dE700fc4cf9DC0790c070A7558",
      "0x3D60f464A603A734eb402a53850e3FB8Be73A5d7",
      "0x40f015f93f243185B059544caa6bB61379f19cfF",
      "0x4449509E23587da40AfC48914EC2FCa6B49E5BB2",
      "0x4456CbCE2d92bdb71b815DFF9d0760871a23b061",
      "0x451A946AC9502BD49D452948628580D30B43e861",
      "0x468aDC5050c71066e6dEc0a066E0Df0f6Fc2AF83",
      "0x48B5766a5b9FC349189BBB4A0f2B05157615111F",
      "0x4946024DA0A70cb805e07F94e864534E1E07fbf6",
      "0x49499088c49aFBe32c83E94EFA48934Bb4EF881f",
      "0x4a53C83EDde2b455FECC7c97b81EEf83B8CCfa12",
      "0x4b38befD9273b1f90426811c8D2B6724A760e3ea",
      "0x4d6bd8e707caA6627bb76D425a8cAEF4C5a999B8",
      "0x52135dcD45dAa4bD0FdD10526fFd0C25aABD6D56",
      "0x52B707E7BDA324847CF04E6eD5cA53A6CD0a0663",
      "0x52d4a8ad6E45A5368c7DF8FD42E5C23331FAC61F",
      "0x540957AE5947Eb6bac3204AF6eC499271dD2f3DD",
      "0x5428F99579a2DD4091b117d4aaaBbe636AE6E832",
      "0x55005b717c4C7deD93BCfAEC7553b8342d94fbFd",
      "0x554233353f3A448F1F3Bf7a90f48746242Edc5EF",
      "0x589f6683276417608cfD0C252C868c1e4dcCC990",
      "0x5c401F6B27F5c8E1107eE2187AC6F27cD0a5F7f4",
      "0x5D4DC132C3E1F3F8A97d8f52a5C8364D55091acb",
      "0x5e15a27EdcfB9d44A6A5Cce3B8F7FFC091C165E8",
      "0x5f3ca105DdBDcf945391DEbE84821F6Dc159C95c",
      "0x5f89b8Fa6f881db252d429d92ffEE8B8EA957C11",
      "0x60FAFEB40C530C6C8c8A80175556dB36E3C6cAa0",
      "0x61ec7d4A94b652CbA13cEB0668da1CEF8FC59aDb",
      "0x624f3D8633487dC485bC12F920ab4c464eEAe5b0",
      "0x6360fC82eB35E9557FB4FB4623e97C206346F6Be",
      "0x63b3ECE9246B34C0624E5fE0F2F37A183195748E",
      "0x6405e6668Cc533BB66FB97F59fFe528680bB6Fb6",
      "0x641Bc5E70E63616be1434E7833355853352952b1",
      "0x64Ba17242F0bFe7EB31e66Cd553Bb1e4950A68D9",
      "0x6586B475B83Db7c2ea280ED57A91B1F078DB7942",
      "0x66DBFBD8b371f38bD124F69beAC65a36368daCd9",
      "0x67F04794b3E45cCB55550106aC4B56CEA45c4a2E",
      "0x681133a82f571bC9C7f2Df4434f73A1e23E73892",
      "0x6834CC7ED74B0c4Db72B6F7b911786085EFEB927",
      "0x68b61817752172543589604A3cCaAAe5fBa86443",
      "0x68e5F5e037E990cC029097B2408C52c3E6d34B1f",
      "0x697d7f8A558108731D0D1D1A6ace9b0fcE82A2B7",
      "0x69aA93C590e58A493EF15E05ee9E8B8c1144e671",
      "0x6b7BA4b7E359C11b272DB4B030F4797b72f44C9A",
      "0x6C8C9E9fcCD359956208272330960c028fd72282",
      "0x6d30c397254AC17c513bBFc9336ECa68A4B4a252",
      "0x6DbCe5f69929d8D0Bc721C5fD2c5DB2b6F2E84Af",
      "0x6eba8A68Dd813dF97b2547DC12826e822DBe2d01",
      "0x6F25f735d798f8Fc65698941358A30FE02012E39",
      "0x71631eE124A988C091A873F73eAC9293650Ea0d2",
      "0x71986A0963193191F302D160e48E3A7587f20478",
      "0x72508F1bA4aeB32eEA5e753bAF0732fd6F7F725A",
      "0x72c1109093B48a10da7A88601bf5A817044C4c70",
      "0x738bFb53Acc01B47356D5cf45673D55E9EA7958B",
      "0x76604A3160dEb2344EaF58D33cBAc4A6BDFcff9C",
      "0x76d34F8703678aD55227a9e81A24A6e6E75d72FD",
      "0x774be62074543C4A48bF68b94e648e92DEBE73CA",
      "0x77A7C75611a4FF307e1f96707975284104127ADd",
      "0x77B362eD6FE6F673bF21d7e26bE5774544A88a95",
      "0x7879B86a37402f4BDF07Abd3a345B8000E07f224",
      "0x791165a23E297C974a5cD8256D86ba28788e3e95",
      "0x793D59371e8c583C8b175B0db2d91Fef168de3D0",
      "0x7CB3d230A9B3E93BDa573c3e2C904D6C585bFEd6",
      "0x82B14A489F8a0de9F33e4Efa1955603dfc3a8C3C",
      "0x83d93Be8Bc55a1B03Cb329dB86632DB34e9faAfb",
      "0x844d1E8465e558C81b95bF06EB90f64d84F9c184",
      "0x84806a48a46aB75B9cE35A8A6Ef5380846F39ed0",
      "0x85D1eC716986B06C09f7c2b959D0A002889274fd",
      "0x86177D8199eD2ac4654881B3242B2cAA07286065",
      "0x86678D0320A5852Be20fbecE51850C8E1f96E17d",
      "0x8b1eEBfB3BF73D31A5eDB4b5302e55E348EC7685",
      "0x8B9DAa75f577Ba3a91ef89aB59d4DCc186300E51",
      "0x8bFb36d7A8D2E4768890a981cC6f69F4Dc209F42",
      "0x8c619F45dBEEc4936F36E0F813d9E95b279Ef5fa",
      "0x8E8a8744474C6dE2C8644E9E83FDaE6c212864A0",
      "0x8EEd17d512eC5F56B87206AEFB1F163B608CA3FE",
      "0x8F4b24d9D1E1E0dEA64Cd84799d0B4f99D9fdCc7",
      "0x92322859c5B39a9a6789e53F384B80CF65718a98",
      "0x926bc0070fa0F010dC7c63BF3d30131bFa009307",
      "0x929d8eC8f0084b94ABD69B9E4001d3C06139e81D",
      "0x92cBA34892AA453B5c7f2B134c9D17ec59B26f02",
      "0x95FDf1200F283B016e67c51f7C31cAd8c1c2bBF0",
      "0x9667Db75696d26829B40379260a515A94eFf744e",
      "0x96d8baa63D3484702C6196F870DA39E284f68966",
      "0x98a0Ff6B0168971F51f3448fF27f9B4A28161c95",
      "0x98E53775E0F84710E5328ce4d503E78a94E7411d",
      "0x98E77D1B7fbC368CCa46060Cd2079cC850cd0f06",
      "0x9a53bAc5B61338b88dE046545687CC093eb6b288",
      "0x9B81F85D289f14727Ce7aA070925aEae76a22aE2",
      "0x9c82793F07fF17dBDCe8F75F8174E1b8e4B276A7",
      "0x9Cd7FA33c3EA96cB877d63Aaf1029f884048578b",
      "0x9e6886990E0f8c3D6c5646102ceb4E11dA8162a0",
      "0x9ea3d0500e8c3Aa834d4996a3A5C5506B358924f",
      "0x9fcD4CdcA6E2A9839176563f15270F01208f0616",
      "0xa0a0393d952ef10427cEE7d6F66B0f000D4048E1",
      "0xA15fb2176dfcA846570CF547cCE09297D46EF4aA",
      "0xa1B17F930CDb8082989ea0CA41536D4636F242EF",
      "0xa26FEFEC430545E075fB6456728e3ef91Ae1B2fa",
      "0xA3783e0d3A348a42d42140c051217d59cE9d5bC2",
      "0xa3eb55bF36539ce6B2b91c391A7DA7E8951C55a6",
      "0xa548aF2F002071D86e812C70b7606Af0ADEE9FBA",
      "0xa66EA4736db295b7d5cd05bfa8b38dEf675D98c5",
      "0xaB0e31B3B4aA6A545449e0875F6A338E93273733",
      "0xAb9Ad5C77A91b7dA613b66b1130e230213D52492",
      "0xaBeD0681B32Bf4B0Fa4c4D2A98686B31B6b6A0fb",
      "0xaC2B46218DD386AB25a62eB009269481Fc8DE17a",
      "0xad3c3D90817C6E7AEE8B957103e8566eb5869d46",
      "0xaf103101035aE7e2Ff40329a799e59F86cb15E89",
      "0xafc712EcDa119437E369a6DaD17f81F95De1C12b",
      "0xB24823B0129B86EA723bCa76C9a5946f7BeBc84e",
      "0xB26D6702ae1808528B410Ab0565e261d330eBEA1",
      "0xb38A519b7e44CF9bB62890940a6255E6cC9dBC97",
      "0xb3a0266119fd597B7C4E86D4EEe43f734d5CD9CB",
      "0xb5Be105E8113B624b8Bd983E2E71874526416Bf6",
      "0xB769D4Ce0E1fC8bD07d472326de84d1F7bfC206c",
      "0xb77173C7B857C80AeBdCF218d7140D3Dc8cdE58a",
      "0xb7D25A9914ff55b553E51b632283FbcA867fC20A",
      "0xB842618497C17c8d008d7259eB144BF377dbA2F3",
      "0xB90Db03f3a39897BF4B3d389E229Ae6Ada6529D6",
      "0xbAe58b858a101a040785C7324D38Cc18c5F92774",
      "0xBB2B0Ae07A3dE9B9F2794262e2A5B062090a598d",
      "0xBD6279DB8c414E8aB5159c4b9f9f97b8E61dd3eC",
      "0xbED80d6c301A93a70858b0B591b8b886B8f259d4",
      "0xbF79CD25a7CCC0684c28ba9C441eCfB1220EFE4E",
      "0xBfa2487eF2B12192C687F8AE47409532efc0d2F7",
      "0xBFEDebB1785934f031ECF23615cd6c646F6d2b49",
      "0xc144F5D41657A6F24BC9f8A5E80200B495eb7cB8",
      "0xc27AA47d551A34A589d65aA04Fe330587eE26f0b",
      "0xC29f78743C1407ceB649f90198367Bd06405A75e",
      "0xC441fCd2E080A01F451b63e9b6BA4b524C5E1d58",
      "0xC60069E5016D39135e2736120194A52ebA6684D4",
      "0xC6104D31ecE0BBeceBe3f74477bAf493b33464F0",
      "0xC6b050A199Bf6EC29e85E72aBCdCdEe147d967E9",
      "0xC71B9c97a27fb2Cd0d98D449e75a63cBA312466D",
      "0xC7E4152a7797eddD576239c34e15ee755496d024",
      "0xCA4241027c1CD64DBf0138C0998e33B9Ca912bCc",
      "0xCcF16646566d18648cb58c4F6326CE8F43C4f878",
      "0xCD4465Ae7f96F4e6a8baa0056f7a4C5aDf759b86",
      "0xCE8318e466Fc6504f51CdF7dB653ddA11F408597",
      "0xd0aef3d43a5d83F2203d10f20ec8538028CD0954",
      "0xD14c175dd3F90FC161814938664dB0689F5E5e37",
      "0xD1D28cFB3c5fA176EC226E27a0FB69D533E9D74c",
      "0xD23b97041B323176C8b595c85b9851b91922e2a9",
      "0xD33DB639b545FcB2665C82399484eaafeD93634A",
      "0xD3aCfAAF65B6BA7332a3864959E71494a0D95193",
      "0xd62Ad0c272FE10D8Ebc8574bA2cB9aa3C3dF6ab8",
      "0xd6fB06d62796209b9AC0d4c8822AB93a3367A934",
      "0xD78A2EcaEA010c00EB4842D4aa69E86B1cc1AFA9",
      "0xD9B547E5E7a97Ef403D57F306C375FFaC93C99a6",
      "0xDadCBAAb7959F89291Dd2F8C663a5993217D8c28",
      "0xDbE4021D76904B55F8573d041F8A2bE3B317Cc7a",
      "0xddCC37cEFE5D77F5d2a6D0616C27423F0912e50c",
      "0xE0f3ee85aDEDAF538F08236494Ae469d4C6B07aB",
      "0xe24Cd41750f4ed868058BdE42046D5Bb3145589D",
      "0xe32BF91B50E2f8304B15f545664A43c94b927E5a",
      "0xe62229174b79e20209a964cD0552B99cb3E679B3",
      "0xe6ed9823e923B4F7Afe9A9EB46a5c4d8e7fD088f",
      "0xe7981B89e260Feb9E482DeB6978a720A29CDde87",
      "0xebFa566460108c10845fd2A88fb27ea662DD6b9b",
      "0xeDad898c77A0dC9167C93bF2bEfd65DbBC0aEF8a",
      "0xeDC611d660504aAB01b13091ea7C755882538892",
      "0xEdE4169D2d3253aE111507227F6f1A27C0d4B760",
      "0xF15ACe93Ba23Dd41a49C410b73549FE6Ca4bf865",
      "0xF1A31f061F824c4c0F144576F0C5ac35Bc0596ED",
      "0xf2469Bc2dE72ACe3BAd8a5c4ef9D96AF34d60af9",
      "0xF2C1cf863107DE2629553eD395216f59646a8Da1",
      "0xF2Cb7A097E75371e601B087cCbcb34074767acC2",
      "0xf471805DC5324632E4280cfa59a1ceb22248DFdF",
      "0xf633cfa510ECc425000BB1d1406F3EDE1e370c0E",
      "0xF8254102dF94eeeA2c81F56E0fD79fab748c7Ea6",
      "0xfb28447E19207de30710E2Bfd09c5EeF319871B6",
      "0xff8bc2383ff0145C73CDa861edea0c4E47E5aed5"
    ]
  }
}
```

### nr_getNFTMeta

#### Returns the NFT meta

NFT metadata is basically the information of the NFT such as name, description, category, etc. The API returns this information by using the contract address, token Id, and token type (BEP721/1155).

The returned metadata can usually be used on NFT marketplace to display the information mentioned above for a particula NFT.

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
                  example: nr_getNFTMeta
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: >-
                    + contractAddress: [string] address of NFT contract
                    
                    + tokenId: [integer or hexadecimal] Id for NFT
                    
                    + tokenType : [string] (optional) "ERC721" or "ERC1155"; specifies type of token to query for
                  items:
                    type: string
                  example:
                    - '0xEA5613EBBBE1E69BF5F05252C215462254F41565'
                    - '0x7C7'
                    - 'ERC721'
```

#### Response

```yaml
responses:
        '200':
          description: A JSON of token meta
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
                      address:
                        type: string
                        example: "0x00663336d9e9d7483e8a82f2454b9a1447323f9f"
                      token_id:
                        type: string
                        example: "0x0000000000000000000000000000000000000000000000000000000000000016"
                      meta_url:
                        type: string
                        example: "https://"
                      meta:
                        type: string
                        example: "{}"
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
  "method": "nr_getNFTMeta",
  "jsonrpc": "2.0",
  "params": [
    "0xEA5613EBBBE1E69BF5F05252C215462254F41565",
    "0x7C7",
    "ERC721"
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "token_address": "0xea5613ebbbe1e69bf5f05252c215462254f41565",
    "token_id": "1991",
    "meta": "{\"name\":\"Standard Green Pepe\",\"description\":\"Standard Green Pepe with Earth\\n\\nNothing is beyond our reach\",\"category\":\"memes\",\"collection_address\":\"0xea5613ebBBE1E69Bf5F05252C215462254F41565\",\"creator\":\"0x3988c52ac9a2f9b2e591e14e173161cec6ce98ff\",\"ifps_image\":\"Qme8HFmv5aM2J1nGwxgQqU1Yt2H7e7zVHbadQxqb4Aqynq\",\"attributes\":[]}",
    "meta_url": "https://ipfs.io/ipfs/QmRzUasL1uyFjT9bbgEq5XaRjRgdUo3Q4K9qfHhEjRsy7A"
  }
}
```

### nr_getNFTCollectionHolders

#### Get Holders info of NFT token for ERC1155/ERC721

This API returns an NFT token holders account address, token Id and the token balance. 

Developers of applications like blockchain explorers, NFT marketplace, and Wallet can utilize the API to get the information mentioned above and display it on their app's UI.

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
                  example: nr_getNFTCollectionHolders
                jsonrpc:
                  type: string
                  example: '2.0'
                params:
                  type: array
                  description: 'contractAddress, tokenType : "ERC721" or "ERC1155" withTokenBalances(optional)'
                  items:
                    type: string
                  example:
                    - "0xC244E2A5c6bbC89cfda2c32Ae0086052c95c3B55"
                    - "ERC1155"
                    - "0x14"
                    - ""
```

#### Response

```yaml
responses:
        '200':
          description: A JSON Array
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
                      pageId:
                        type: string
                        example: "100_342"
                      holderAddresses:
                        type: array
                        items:
                          type: string
                          example:
                            - "0xc49982ec7d1e45baae96f9ea2cb65ac1acae282a"
                            - "0x3988c52ac9a2f9b2e591e14e173161cec6ce98ff"
                      holderAddressesWithBalances:
                        type: array
                        items:
                          type: object
                          properties:
                            ownerAddress:
                              type: string
                              example: "0x000001f568875f378bf6d170b790967fe429c81a"
                            tokenBalances:
                              type: object
                              properties:
                                tokenId:
                                  type: string
                                  example: "9446"
                                balance:
                                  type: string
                                  example: "1"
```

#### Example

CURL request

```shell
curl -X 'POST' \
  'https://apus-swagger.fe.nodereal.cc/nr_getNFTCollectionHolders' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "method": "nr_getNFTCollectionHolders",
  "jsonrpc": "2.0",
  "params": [
    "0xC244E2A5c6bbC89cfda2c32Ae0086052c95c3B55",
    "ERC1155",
    "0x14",
    ""
  ]
}'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "holderAddressesWithBalances": [
      {
        "holderAddress": "0x8e3ef2519aad607100b77f886d1bae4df8df418f",
        "tokenBalances": [
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045f0",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000002"
          },
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045f2",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000005"
          },
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045f5",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000001"
          },
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045f7",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000002"
          }
        ]
      },
      {
        "holderAddress": "0x20bcb29fa20fe7307398a07b681fe5ddf7b509aa",
        "tokenBalances": [
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045f5",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000001"
          }
        ]
      },
      {
        "holderAddress": "0x6e641ac4762f4a90d7dc9b01aa39d6da19f92bc8",
        "tokenBalances": [
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045fc",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000003"
          }
        ]
      },
      {
        "holderAddress": "0x99809bfd4b923f33ec51882ce89c6991086c120b",
        "tokenBalances": [
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045ff",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000004"
          }
        ]
      },
      {
        "holderAddress": "0x891aab34cc082c0c7325c1349a2f9b815a4ad4a6",
        "tokenBalances": [
          {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000004605",
            "balance": "0x000000000000000000000000000000000000000000000000000000000000000a"
          }
        ]
      },
      {
        "holderAddress": "0x30deb35a2b4aa48a3c2ead291ae1bf0a21f71255",
        "tokenBalances": [
          {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000460d",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000001"
          }
        ]
      },
      {
        "holderAddress": "0x903fe2471449b812a282041d46e34aaecb57986f",
        "tokenBalances": [
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045fd",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000013"
          }
        ]
      },
      {
        "holderAddress": "0x58e84d90fd976a183befb36a69cab464bef18cc5",
        "tokenBalances": [
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045fe",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000008"
          },
          {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000004600",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000005"
          },
          {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000004601",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000014"
          },
          {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000004604",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000004"
          },
          {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000460a",
            "balance": "0x000000000000000000000000000000000000000000000000000000000000000a"
          },
          {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000460b",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000001"
          },
          {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000460e",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000062"
          }
        ]
      },
      {
        "holderAddress": "0x780451a32959a96789f99398deb6678d2c438eb4",
        "tokenBalances": [
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045ff",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000001"
          },
          {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000004613",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000064"
          }
        ]
      },
      {
        "holderAddress": "0x729165ed63f9c910e5c5a24ddf594d42b07b7665",
        "tokenBalances": [
          {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000045fd",
            "balance": "0x0000000000000000000000000000000000000000000000000000000000000001"
          }
        ]
      }
    ],
    "pageId": "ai000000-0000-0000-0000-0000RzaDWnMr"
  }
}
```
