import { fetchAPI } from './api';
import { ApiResponse } from '@/types/api.types';

export interface OCRResult {
  battery_code?: string;
  brand?: string;
  model?: string;
  initial_capacity?: number;
  manufacturing_date?: string;
  chemistry?: string;
  voltage?: number;
  raw_text?: string;
}

export interface OCRResponse extends ApiResponse<OCRResult> {
  message?: string;
}

export const ocrService = {
  scanLabel: async (file: File, userId?: string, batteryId?: string): Promise<OCRResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    if (userId) formData.append('user_id', userId);
    if (batteryId) formData.append('battery_id', batteryId);

    return fetchAPI<OCRResponse>('/ocr/scan-label', {
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type to let browser set it with boundary
      } as any,
    });
  },
};
