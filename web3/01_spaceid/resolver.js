const SID = require('@siddomains/sidjs').default      
const SIDfunctions = require('@siddomains/sidjs')                                                                                                                                                                                
const Web3 = require('web3')                                                                                                                

let sid 

async function main(name) {
  const nodereal = "https://bsc-mainnet.nodereal.io/v1/d3cc77ad94d64c9384e9305b3ca71f22"  
  const provider = new Web3.providers.HttpProvider(nodereal)
  sid = new SID({ provider, sidAddress: SIDfunctions.getSidAddress('56') })

  const address = await sid.name(name).getAddress() // 0x123                                                                                
  console.log("name: %s, address: %s", name, address)                                                                                          

}                                                                                                                                           
main("resolver.bnb")

