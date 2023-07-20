var BoredPetsNFT = artifacts.require("BoredPetsNFT");
var Marketplace = artifacts.require("Marketplace");


async function logNftLists(marketplace) {
    let listedNfts = await marketplace.getListedNfts();
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];
    let myNfts = await marketplace.getMyNfts({ from: accountAddress });
    let myListedNfts = await marketplace.getMyListedNfts({ from: accountAddress });
  }
  

const main = async (cb) => {
  try {
    //let contractABI = JSON.stringify(BoredPetsNFT.abi);
    const boredPets = await BoredPetsNFT.deployed()
    const marketplace = await Marketplace.deployed()

    console.log('MINT AND LIST NFTs')
    const URI1 = "https://gnfd-testnet-sp-6.bnbchain.org/view/artificial-aesthetics/sunset/sunset.json";
    const URI2 = "https://gnfd-testnet-sp-6.bnbchain.org/view/artificial-aesthetics/bicycle/bicycle.json";
    const URI3 = "https://gnfd-testnet-sp-6.bnbchain.org/view/artificial-aesthetics/sunflower/sunflower.json"
    let listingFee = await marketplace.LISTING_FEE()
    listingFee = listingFee.toString()
    // Mint first and list first NFT
    let txn1 = await boredPets.mint(URI1);
    let tokenId1;
    txn1.logs.forEach((log) => {
    if (log.event === "NFTMinted") {
        console.log(log.args)
        tokenId1 = log.args[0].toNumber();
    }
    });
    await marketplace.listNft(boredPets.address, tokenId1, 1, {value: listingFee})
    await logNftLists(marketplace)

     // Mint second and list second NFT
     let txn2 = await boredPets.mint(URI2);
     let tokenId2;
     txn2.logs.forEach((log) => {
     if (log.event === "NFTMinted") {
         console.log(log.args)
         tokenId2 = log.args[0].toNumber();
     }
     });
     await marketplace.listNft(boredPets.address, tokenId2, 1, {value: listingFee})
     await logNftLists(marketplace)

     // Mint third and list third NFT
     let txn3 = await boredPets.mint(URI3);
     let tokenId3;
     txn3.logs.forEach((log) => {
     if (log.event === "NFTMinted") {
         console.log(log.args)
         tokenId3 = log.args[0].toNumber();
     }
     });
     await marketplace.listNft(boredPets.address, tokenId3, 1, {value: listingFee})
     await logNftLists(marketplace)

    console.log('BUY 1 NFTs')
    await marketplace.buyNft(boredPets.address, tokenId1, {value: 1})
    //await marketplace.buyNft(boredPets.address, tokenId2, {value: 1})
    await logNftLists(marketplace)

    console.log('RESELL 1 NFT')
    await marketplace.resellNft(boredPets.address, tokenId1, 1, {value: listingFee})
    await logNftLists(marketplace)

  } catch(err) {
    console.log('Doh! ', err);
  }
  cb();
}

module.exports = main;