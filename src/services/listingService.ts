import { fetchAPI } from './api';
import { Listing, ApiResponse } from '@/types/api.types';

export const listingService = {
  getListings: async (): Promise<ApiResponse<Listing[]>> => {
    return fetchAPI<ApiResponse<Listing[]>>('/listings');
  },

  getListingById: async (id: string): Promise<ApiResponse<Listing>> => {
    return fetchAPI<ApiResponse<Listing>>(`/listings/${id}`);
  },

  buyListing: async (id: string, buyer_wallet: string): Promise<ApiResponse<{ txHash: string }>> => {
    return fetchAPI<ApiResponse<{ txHash: string }>>(`/listings/${id}/buy`, {
      method: 'POST',
      body: JSON.stringify({ buyer_wallet }),
    });
  },
};
