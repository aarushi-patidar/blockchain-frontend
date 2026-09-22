import { fetchAPI } from './api';
import { MintBatteryPayload, ApiResponse } from '@/types/api.types';

export const nftService = {
  mintBatteryNFT: async (data: MintBatteryPayload): Promise<ApiResponse<{ tokenId: string, txHash: string }>> => {
    return fetchAPI<ApiResponse<{ tokenId: string, txHash: string }>>('/nft/mint', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateBatteryMetadata: async (tokenId: string, cid: string): Promise<ApiResponse<{ tokenId: string, txHash: string }>> => {
    return fetchAPI<ApiResponse<{ tokenId: string, txHash: string }>>('/nft/update-metadata', {
      method: 'POST',
      body: JSON.stringify({ tokenId, cid }),
    });
  },

  transferBatteryNFT: async (tokenId: string, from: string, to: string): Promise<ApiResponse<{ tokenId: string, txHash: string }>> => {
    return fetchAPI<ApiResponse<{ tokenId: string, txHash: string }>>('/nft/transfer', {
      method: 'POST',
      body: JSON.stringify({ tokenId, from, to }),
    });
  },

  burnBatteryNFT: async (tokenId: string): Promise<ApiResponse<{ tokenId: string, txHash: string }>> => {
    return fetchAPI<ApiResponse<{ tokenId: string, txHash: string }>>('/nft/burn', {
      method: 'POST',
      body: JSON.stringify({ tokenId }),
    });
  },

  getBatteryOnChain: async (tokenId: string): Promise<ApiResponse<any>> => {
    return fetchAPI<ApiResponse<any>>(`/nft/${tokenId}`);
  },
};
