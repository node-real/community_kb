import NFTCONTRACT_JSON from 'src/base/contract/BoredPetsNFT.json';
import MARKETPLACE_JSON from 'src/base/contract/Marketplace.json';
import styled from '@emotion/styled';
import { Button, Flex, Input } from '@totejs/uikit';
import useScroll from '../hooks/useScroll';
import React, { useRef } from 'react';
import { useThrottle } from '../hooks/useThrottle';
import { useGlobal } from '../hooks/useGlobal';
import { useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const MARKETPLACE_ADDRESS = '0xf3756EeD238Fd6C4d3492791d45490680A584BE0';
const NFT_CONTRACT_ADDRESS = '0xA650FA311C7b4976Ee08185883D3FC152bFa205F';
const LISTING_FEE = 100000000000000;

const NFTCONTRACT_ABI = NFTCONTRACT_JSON.abi as AbiItem[];
const MARKETPLACE_ABI = MARKETPLACE_JSON.abi as AbiItem[];

async function mintNFT(tokenURI: string) {
  try {
    if (!window.ethereum) {
      console.error('provider not available');
      return;
    }
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(
      NFTCONTRACT_ABI,
      NFT_CONTRACT_ADDRESS,
    );
    console.log('before get accounts');
    const accounts = await web3.eth.getAccounts();
    if (tokenURI) {
      const _nft = await contract.methods
        .mint(tokenURI)
        .send({ from: accounts[0] });
      alert('NFT minted successfully!');
    } else {
      alert('Please enter a valid NFT URI.');
    }
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
}

async function listToken(tokenId: string, price: string) {
  try {
    if (!window.ethereum) {
      console.error('provider not available');
      return;
    }
    const web3 = new Web3(Web3.givenProvider);
    console.log('before get accounts');
    const accounts = await web3.eth.getAccounts();
    console.log('Start to list token ' + NFT_CONTRACT_ADDRESS, tokenId, price);
    const marketplaceContract = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS,
    );
    console.log(marketplaceContract);
    // Call the listNft function in the marketplace contract web3.utils.toWei(price, unit)
    await marketplaceContract.methods
      .listNft(NFT_CONTRACT_ADDRESS, tokenId, price)
      .send({ from: accounts[0], value: LISTING_FEE });
    console.log('Token listed successfully');
  } catch (error) {
    // Display error message or perform any other error handling
    console.error('Error listing token:', error);
  }
}

const Home = () => {
  const [mintInput, setMintInput] = useState('');
  const [tokenID, setTokenID] = useState('');
  const [price, setPrice] = useState('');
  const [mintedNFTs, setMintedNFTs] = useState<any[]>([]);
  const [listedNFTs, setListedNFTs] = useState<any[]>([]);

  const root = useRef(window);
  const state = useGlobal();
  const fn = useThrottle(() => {
    let showSearch = false;
    if (document.documentElement.scrollTop >= 325) {
      showSearch = true;
    } else {
      showSearch = false;
    }
    state.globalDispatch({
      type: 'SEARCH_STATUS',
      showSearch,
    });
  }, 50);

  useScroll(root as unknown as React.RefObject<HTMLDivElement>, fn);

  const handleButtonClickMint = () => {
    const inputValue = mintInput;
    mintNFT(inputValue);
  };

  const handleButtonClickList = () => {
    listToken(tokenID, price);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'tokenIDInput') {
      setTokenID(value);
    } else if (name === 'priceInput') {
      setPrice(value);
    } else if (name === 'mintInput') {
      setMintInput(value);
    }
  };

  const handleDisplayListedNFTs = async () => {
    try {
      await displayListedNFTs();
    } catch (error) {
      console.error('Error displaying listed NFTs:', error);
    }
  };

  const displayMintedNFTs = async () => {
    if (!window.ethereum) {
      console.error('provider not available');
      return;
    }

    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(
      NFTCONTRACT_ABI,
      NFT_CONTRACT_ADDRESS,
    );

    const _mintedNFTs = await contract.methods.getMintedNFTs().call();
    console.log(_mintedNFTs);

    const mintedNFTRows: any[] = [];
    for (let i = 1; i <= Number(_mintedNFTs); i++) {
      const _tokenURI = await contract.methods.tokenURI(i).call();
      console.log('start to fetch', _tokenURI);

      try {
        const response = await fetch(_tokenURI);
        const metadata = await response.json();
        const image = metadata.image;
        const _tokenId = String(i);

        mintedNFTRows.push({
          name: metadata.name,
          description: metadata.description,
          image: <img src={image} alt="NFT image" width="100" height="100" />,
          tokenId: _tokenId,
        });
      } catch (error) {
        console.error(error);
        continue;
      }
    }

    setMintedNFTs(mintedNFTRows);
  };

  const displayListedNFTs = async () => {
    try {
      if (!window.ethereum) {
        console.error('provider not available');
        return;
      }
      const web3 = new Web3(Web3.givenProvider);
      console.log('before get accounts');
      const marketplaceContract = new web3.eth.Contract(
        MARKETPLACE_ABI,
        MARKETPLACE_ADDRESS,
      );
      // Get the number of listed NFTs from the smart contract
      const _NFTs = await marketplaceContract.methods.getListedNfts().call();
      console.log('Listed NFTs:', _NFTs);

      // Create an array to store the listed NFTs data
      const listedNFTsData = [];

      // Loop through the listed NFTs and fetch the data
      for (let i = 0; i < Number(_NFTs); i++) {
        const _listedNFT = await marketplaceContract.methods
          .getNftByIndex(i)
          .call();
        console.log('Listed NFT:', _listedNFT);

        const _nft = await marketplaceContract.methods
          .getNft(_listedNFT[0], _listedNFT[1])
          .call();
        console.log('NFT:', _nft);

        listedNFTsData.push({
          name: _nft[0],
          description: _nft[1],
          image: _nft[3],
          tokenId: _listedNFT[1],
        });
      }

      // Update the state with the fetched data
      setListedNFTs(listedNFTsData);
    } catch (error) {
      console.error('Error displaying listed NFTs:', error);
      setListedNFTs([]);
    }
  };

  return (
    <Container flexDirection="column" alignItems="center">
      <Title>
        Layer 2 solution for BNB Chain <br />
        opBNB NFT Marketplace
      </Title>

      <Button onClick={displayMintedNFTs}>Display Minted NFTs</Button>

      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {mintedNFTs.map((mintedNFT, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '8px',
              border: '1px solid #ccc', // Add border style here
              padding: '16px', // Add padding for spacing
            }}
          >
            <div>{mintedNFT.name}</div>
            <div>{mintedNFT.description}</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {mintedNFT.image}
              <div>Token ID: {mintedNFT.tokenId}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="metadataUrlInput" style={{ marginRight: '6px' }}>
          NFT Metadata JSON URL:
        </label>
        <Input
          id="mintInput"
          name="mintInput"
          placeholder="Enter the NFT Metadata JSON URL"
          onChange={handleInputChange}
        />
        <Button
          onClick={handleButtonClickMint}
          size="lg"
          style={{ marginLeft: '6px', width: 'auto' }}
        >
          Mint NFT
        </Button>
      </div>

      <hr style={{ width: '100%', margin: '16px 0' }} />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="tokenIdInput" style={{ marginRight: '6px' }}>
          Token ID to list:
        </label>
        <Input
          id="tokenIdInput"
          name="tokenIDInput"
          placeholder="Enter the Token ID to list"
          onChange={handleInputChange}
        />
        <Input
          id="priceInput"
          name="priceInput"
          placeholder="Enter the price"
          onChange={handleInputChange}
          style={{ marginLeft: '6px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={handleButtonClickList}
          size="lg"
          style={{ marginTop: '16px', marginRight: '6px' }}
        >
          List NFT
        </Button>
      </div>

      <hr style={{ width: '100%', margin: '16px 0' }} />

      {/* <div>
        <Button onClick={handleDisplayListedNFTs}>Display Listed NFTs</Button>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {listedNFTs.length > 0 &&
            listedNFTs.map((listedNFT, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '8px',
                  border: '1px solid #ccc',
                  padding: '16px',
                }}
              >
                <div>
                  <img src={listedNFT.image} alt="NFT image" />
                </div>
                <div>
                  <div>{listedNFT.name}</div>
                  <div>{listedNFT.description}</div>
                </div>
                <div>Token ID: {listedNFT.tokenId}</div>
              </div>
            ))}
        </div>
      </div> */}
    </Container>
  );
};

export default Home;

const Container = styled(Flex)``;
const Title = styled.h1`
  margin: 60px 0;

  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 70px;

  text-align: center;

  color: #ffffff;
`;
