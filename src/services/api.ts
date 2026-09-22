const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    console.log(`[API] Fetching: ${url}`);
    
    const fetchConfig: RequestInit = {
      ...config,
      mode: 'cors',
      credentials: 'omit',
      headers: {
        ...config.headers,
      },
    };
    
    const response = await fetch(url, fetchConfig);
    
    console.log(`[API] Response status: ${response.status}`);
    
    // Handle 404, 500 etc
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();
    console.log(`[API] Response:`, data);
    return data;
  } catch (error) {
    console.error(`[API] Error for ${endpoint}:`, error);
    throw error;
  }
}
