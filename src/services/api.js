const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Generic request helper 
 */
async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json().catch(() => ({}));
}

/**
 * Register a user
 */
export function registerUser(data) {
  return request("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Track avatar generation event
 */
export function trackGeneration(data) {
  return request("/api/generate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Track download event
 */
export function trackDownload(data) {
  return request("/api/download", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get admin statistics
 */
export function getStats() {
  return request("/api/stats", {
    method: "GET",
  });
}