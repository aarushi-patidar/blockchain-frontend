
import { ListBatteryPayload, ApiResponse, ListBatteryResponseData } from '@/types/api.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const batteryService = {
  listBattery: async (payload: ListBatteryPayload): Promise<ApiResponse<ListBatteryResponseData>> => {
    try {
      const response = await fetch(`${API_URL}/battery/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || data.message || 'Failed to list battery',
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  },

  // Keeping other methods as standalone exports or we can move them here later if needed
  // For now, focusing on fixing the immediate error in Dashboard
};
