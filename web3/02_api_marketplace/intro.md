# NodeReal API Marketplace is coming!

## What is API marketplace

NodeReal API Marketplace is a open platform that amis to promote the collaboration of web3 builder community. It is a platform you can find most relavant API bundles that can boost your development of web3 applications, so you do not need to reinvent the wheel. Any developer can publish their APIs to the platform. 

1. Developers can call the APIs directly, no need to setup their own node service to query data, call smart contract functions or make transactions.
2. Developers can call the high-level APIs instead of using raw standard APIs.
3. Developers can sell their APIs through API marketplace.

## Category of APIs 

There are three categoris of APIs that are released on the platform. 

| Category              | Definition                                                   |
| --------------------- | ------------------------------------------------------------ |
| NodeReal Offical APIs | The APIs that is developed by NodeReal, the stability and performance of these APIs are strictly tested and optimized. |
| NodeReal Parnter APIs | The APIs that are developed by NodeReal partners. These APIs are tested by NodeReal partners and have been certified by NodeReal. |
| Community APIs        | APIs are released by community developers.                   |

*Note: all APIs are powered by NodeReal Meganode to have the best performance and reliability.* 

## What is available 

### API architecture

All NodeReal official APIs in the marketplace are strictly tested and verified by NodeReal. Similar to the standard API, all API bundle are JSON-RPC APIs, that supports both https and websockets. 

<img src="images/API Architecture.png" alt="image-20220831222047493" style="zoom:25%;" />



### NFT APIs for BNB Chain 

NFT APIs are the high level APIs that targets to simplify the NFT development. We understand query and aggreate NFT APIs are complex and slow, therefore we provide the following NFT APIs to help you build your NFT applications. For example, if you need to know all the holders of a NFT collection on BNB Chain, you can just call the API of nr_getNFTCollectionHolders with parameters of the NFT collection address, the NFT type(currently support ERC721 & ERC1155), the holders information will be returned. To explore other NFT APIs, you can just visit our online [API doc](https://docs.nodereal.io/nodereal/meganode/api-docs/enhanced-api/nft-api) for more info.

- nr_getNFTCollectionHolders
- nr_getNFTHolders
- nr_getNFTHoldings
- nr_getNFTInventory
- nr_getNFTMeta
- nr_getTokenBalance1155
- nr_getTokenBalance721
- nr_getTokenMeta
- nr_getTotalSupply1155
- nr_getTotalSupply721

### Fungible Token APIs for BNB Chain

Fungible Token APIs are used to query the meta data of tokens of ERC/BEP 20. These APIs are easy to use to query balance, holders, supply, and etc. NodeReal will keep increasing new APIs for normal fungible tokens. The [API doc](https://docs.nodereal.io/nodereal/meganode/api-docs/enhanced-api/fungible-tokens-api) of Fungible token API includes the detail definition of each API.

- nr_getTokenBalance20
- nr_getTokenHolders
- nr_getTokenHoldings
- nr_getTokenMeta
- nr_getTotalSupply20

### Debug APIs for BNBChain/ETH

Most node service providers do not provide the debug APIs for developers because of resource limit and scalability issue. NodeReal provides the debug API for both BNB Chain and Ethereum to help developers to trace the EVM execution steps. 

- debug_traceBlockByHash
- debug_traceBlockByNumber
- debug_traceCall
- debug_traceTransaction
- eth_getDiffAccounts (BNB Chain Only)
- eth_getDiffAccountsWithScope (BNB Chain Only)

### Transcation Pool APIs for BNB Chain 

Through Transaction Pool APIs, you can query all pending and queued transactions in the transaction pool. 

- txpool_content
- txpool_inspect
- txpool_status

### Transaction Receipts APIs for BNB Chain/ETH

Through transactions recipts APIs, you can get the transaction receipts details by block hash and block number. For example, you can query the gasfee used or refund info details.

- nr_getTransactionReceiptsByBlockHash
- nr_getTransactionReceiptsByBlockNumber

### Platform APIs for Platform for BNB Chain/ETH

Through APIs for platform, you can query the health status of Meganode service. It is helpful if you depend on more than one node service, for example you run your own service node. You can configure the API though load balancer to route your API traffic. 

- nr_health

## More APIs are on the way

We are working together with the web3 builders community to provide more and more APIs through API marketplace, please keep tuned with us.