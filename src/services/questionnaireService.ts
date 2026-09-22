import { fetchAPI } from './api';
import { ApiResponse } from '@/types/api.types';

export interface QuestionnairePayload {
  listing_id: string;
  [key: string]: any;
}

export const questionnaireService = {
  createQuestionnaire: async (listingId: string, data: any): Promise<ApiResponse<any>> => {
    return fetchAPI<ApiResponse<any>>(`/questionnaire/${listingId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getQuestionnaire: async (listingId: string): Promise<ApiResponse<any>> => {
    return fetchAPI<ApiResponse<any>>(`/questionnaire/${listingId}`);
  },
};
