import { readCollection, findById } from "./db";
import type { WeddingHall, SdmeItem, Review } from "@/data/mock";

export function getWeddingHalls(): WeddingHall[] {
  return readCollection<WeddingHall>("wedding-halls");
}

export function getWeddingHall(id: string): WeddingHall | undefined {
  return findById<WeddingHall>("wedding-halls", id);
}

export function getCollections(): SdmeItem[] {
  return readCollection<SdmeItem>("collections");
}

export function getReviews(): Review[] {
  return readCollection<Review>("reviews");
}
