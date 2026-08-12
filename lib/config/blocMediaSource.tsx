export type MediaCollection =
  | { kind: "blocMedias" } 
  | { kind: "articleImages"; index: number } 
  | { kind: "reseaux" }; 

export const DEFAULT_BLOC_COLLECTION: MediaCollection = { kind: "blocMedias" };

export const BLOC_MEDIA_SOURCE: Record<string, MediaCollection> = {
  TEXTE: { kind: "articleImages", index: 0 },
};

export function collectionForBlocType(type: string): MediaCollection {
  return BLOC_MEDIA_SOURCE[type] ?? DEFAULT_BLOC_COLLECTION;
}
