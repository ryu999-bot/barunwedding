export async function fetchCollection<T>(collection: string): Promise<T[]> {
  const res = await fetch(`/api/data/${collection}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function fetchItem<T>(
  collection: string,
  id: string
): Promise<T> {
  const res = await fetch(`/api/data/${collection}/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export async function saveItem<T>(
  collection: string,
  item: T
): Promise<T> {
  const res = await fetch(`/api/data/${collection}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to save");
  return res.json();
}

export async function updateItem<T>(
  collection: string,
  id: string,
  item: T
): Promise<T> {
  const res = await fetch(`/api/data/${collection}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
}

export async function deleteItem(
  collection: string,
  id: string
): Promise<void> {
  const res = await fetch(`/api/data/${collection}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete");
}

export async function uploadImage(
  file: File,
  filename?: string
): Promise<{ url: string; name: string; size: number }> {
  const formData = new FormData();
  formData.append("file", file);
  if (filename) formData.append("filename", filename);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function deleteImage(filename: string): Promise<void> {
  const res = await fetch("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename }),
  });
  if (!res.ok) throw new Error("Delete failed");
}
