import { getSessionToken } from "./sessionToken";

// Define the structure for the API options
type ApiOptions = Omit<RequestInit, 'body'> & {
  body?: Record<string, unknown> | BodyInit;
};

const BASE_URL = import.meta.env.VITE_API_URL as string;

const api = async <T>(path: string, options: ApiOptions = {}): Promise<T> => {
  const headers = new Headers(options.headers);

  // Add the Authorization header if it's not already set
  if (!headers.has('Authorization')) {
    // TODO: token bearer
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  if (!headers.has('X-Session-Token')) {
    const token = getSessionToken()!;
    
    headers.set('X-Session-Token', token);
  }

  // Prepare the final options
  const fetchOptions: RequestInit = {
    method: options.method,
    headers,
    mode: options.mode,
    cache: options.cache,
    credentials: options.credentials,
    redirect: options.redirect,
    referrerPolicy: options.referrerPolicy,
    // Add other properties as needed
  };

  // Handle body
  if (options.body) {
    if (typeof options.body === 'object' && !(options.body instanceof Blob) && !(options.body instanceof FormData) && !(options.body instanceof URLSearchParams)) {
      fetchOptions.body = JSON.stringify(options.body);
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
    } else {
      fetchOptions.body = options.body as BodyInit;
    }
  }

  // Ensure the path is correctly appended to the base URL
  const finalUrl = `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  try {
    const response = await fetch(finalUrl, fetchOptions);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return the JSON response
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default api;
