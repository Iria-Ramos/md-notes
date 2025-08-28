const API_URL = import.meta.env.PUBLIC_API_URL;

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res;
}
