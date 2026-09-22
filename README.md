## Frontend - https://github.com/SOMASEKAR17/voltage-chain-frontend
## Server1 - https://github.com/SOMASEKAR17/voltage-chain-server1
## Server2 - https://github.com/SOMASEKAR17/voltage-chain-server2

# Battery NFT Marketplace – Frontend

## Overview

This is the frontend application for the decentralized battery marketplace.

Users can:
- Register / Login
- Browse listed batteries
- List a battery manually or via OCR
- Connect wallet
- Sign smart contracts
- Track delivery on map
- View battery NFT history

---

## Architecture Flow

1. User registers/login
2. Dashboard → List Battery
3. Upload manually or via OCR
4. Data sent to Express server
5. Voltage verification + ML validation
6. If approved → NFT minted
7. Battery listed on marketplace
8. Smart contract signed during transfer
9. Delivery tracking via map

---

## Setup

### Install
npm install

### Run
npm run dev

---

## Environment Variables

NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ALCHEMY_RPC=
NEXT_PUBLIC_CONTRACT_ADDRESS=

---

## Web3 Integration

- Alchemy RPC
- ethers.js
- Smart contract signing before ownership transfer

---

## Key Pages

/ → Landing  
/shop → All batteries  
/dashboard → User listing dashboard  
/battery/:id → NFT detail page  

---

## Future Improvements

- Real-time socket updates
- Advanced analytics
- Escrow smart contract
