import { fetchAPI } from './api';
import { ApiResponse } from '@/types/api.types';

export interface PredictionResponse {
  health_status: string;
  soh_percentage: number;
  confidence: number;
  recommendation: string;
}

export const predictionService = {
  getPredictionHealth: async (): Promise<ApiResponse<{ status: string }>> => {
    return fetchAPI<ApiResponse<{ status: string }>>('/predict/health');
  },

  getHealthStatus: async (soh: number): Promise<ApiResponse<PredictionResponse>> => {
    return fetchAPI<ApiResponse<PredictionResponse>>(`/predict/health-status/${soh}`);
  },
};
