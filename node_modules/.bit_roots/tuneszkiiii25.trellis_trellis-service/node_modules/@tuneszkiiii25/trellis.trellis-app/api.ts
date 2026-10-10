const BASE = `${process.env.BACKEND_URL || ''}/trellis-service`;

/**
 * Calls the trellis service.
 * @param path - path under the service, e.g. "/projects"
 * @param init - fetch options
 */
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${res.status})`);
  }
  return res.status === 204 ? (undefined as T) : res.json();
}

/**
 * Public URL of an uploaded picture.
 * @param id - image id
 */
export const imageUrl = (id?: string): string | undefined => (id ? `${BASE}/images/${id}` : undefined);

/** Scales an image file down in the browser and returns it as a data URL. */
function shrink(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || maxSize;
      const h = img.naturalHeight || maxSize;
      const scale = Math.min(1, maxSize / Math.max(w, h));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/webp', 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read that image'));
    };
    img.src = url;
  });
}

/**
 * Uploads a picture (resized first) and returns its id.
 * @param file - image chosen by the user
 * @param maxSize - longest side in px after resizing
 */
export async function uploadImage(file: File, maxSize: number): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file');
  const dataUrl = await shrink(file, maxSize);
  const { id } = await request<{ id: string }>('/images', { method: 'POST', body: JSON.stringify({ dataUrl }) });
  return id;
}
