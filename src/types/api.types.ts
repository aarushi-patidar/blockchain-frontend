export interface Battery {
  id: string;
  battery_code: string;
  brand: string;
  initial_capacity?: number;
  current_capacity?: number;
  manufacture_year?: number;
  charging_cycles?: number;
  nft_token_id?: string;
  minted: boolean;
  created_at?: string; // Date string
}

export interface ListingImage {
  id: string;
  image_url: string;
  image_type: 'gallery' | 'label';
  position: number;
}

export interface Listing {
  id: string;
  battery_id: string;
  battery_code?: string;
  brand: string;
  price: number;
  predicted_voltage?: number;
  user_voltage?: number;
  health_score?: number;
  status: 'draft' | 'active' | 'sold';
  ai_verified: boolean;
  images?: ListingImage[];
  created_at?: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface MintBatteryPayload {
  battery_code: string;
  owner_wallet: string;
  cid: string;
  health_score: number;
}

export interface ListBatteryPayload {
    battery_code: string;
    brand: string;
    initial_capacity: number;
    current_capacity: number;
    manufacture_year: number;
    charging_cycles?: number;
    owner_wallet: string;
    questionnaire?: any; // Define properly if needed
}

export interface ListBatteryResponseData {
    battery_id: string;
    battery_code: string;
    health_score: number;
    predicted_voltage: number;
    current_voltage: number;
    nft_token_id?: string;
    is_new_nft: boolean;
    listing_url: string;
}
