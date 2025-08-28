const API_URL = import.meta.env.PUBLIC_API_URL;
const ASTRO_URL = import.meta.env.PUBLIC_ASTRO_API_URL;

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res;
}

export async function astroFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${ASTRO_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res;
}