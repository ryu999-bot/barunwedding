import fs from "fs";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

const ALLOWED_COLLECTIONS = [
  "wedding-halls",
  "collections",
  "reviews",
  "checklist",
  "events",
  "partnerships",
  "consultations",
  "banners",
  "members",
];

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(collection: string) {
  if (!ALLOWED_COLLECTIONS.includes(collection)) {
    throw new Error(`허용되지 않는 컬렉션입니다: ${collection}`);
  }
  return path.join(DATA_DIR, `${collection}.json`);
}

export function readCollection<T>(collection: string): T[] {
  ensureDir();
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function writeCollection<T>(collection: string, data: T[]) {
  ensureDir();
  const filePath = getFilePath(collection);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function findById<T extends { id: string }>(
  collection: string,
  id: string
): T | undefined {
  const items = readCollection<T>(collection);
  return items.find((item) => item.id === id);
}

export function upsert<T extends { id: string }>(
  collection: string,
  item: T
): T {
  const items = readCollection<T>(collection);
  const index = items.findIndex((i) => i.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.push(item);
  }
  writeCollection(collection, items);
  return item;
}

export function remove<T extends { id: string }>(
  collection: string,
  id: string
): boolean {
  const items = readCollection<T>(collection);
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  writeCollection(collection, filtered);
  return true;
}
