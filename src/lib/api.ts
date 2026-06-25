// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ab-leadership-backend.vercel.app";



export interface ResponseWrapper<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Perform a GET request using the native Fetch API.
 * Preserves Next.js caching features (e.g., next: { revalidate: 60 }).
 * 
 * @param endpoint The API endpoint (e.g., '/v1/api/app/homepage/settings')
 * @param init Additional fetch options
 */
export async function get<T = unknown>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  const json: ResponseWrapper<T> = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.error || `Request failed with status ${response.status}`);
  }

  // If there's no data field but the request was successful, return the whole json
  // Wait, our backend always wraps in { success, data }.
  return json.data as T;
}

/**
 * Perform a POST request using the native Fetch API.
 */
export async function post<T = unknown>(endpoint: string, body?: unknown, init?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init,
  });

  const json: ResponseWrapper<T> = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.error || `Request failed with status ${response.status}`);
  }

  return json.data as T;
}
