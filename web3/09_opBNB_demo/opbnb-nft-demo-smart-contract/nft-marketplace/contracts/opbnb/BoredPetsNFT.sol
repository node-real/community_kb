// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BoredPetsNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter tokenIds;
  address marketplaceContract;
  event NFTMinted(uint256);

  constructor(address _marketplaceContract) ERC721("Bored Pets Yacht Club", "BPYC") {
    marketplaceContract = _marketplaceContract;
  }

  function mint(string memory _tokenURI) public {
    tokenIds.increment();
    uint256 newTokenId = tokenIds.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, _tokenURI);
    setApprovalForAll(marketplaceContract, true);
    emit NFTMinted(newTokenId);
  }

  function getMintedNFTs() public view returns (uint256)  {
    return tokenIds.current();
  }
}
