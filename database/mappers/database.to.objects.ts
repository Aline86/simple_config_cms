// database/mappers/toObjects.ts
import { PageObject } from "../model/Page";
import { HeaderObject } from "../model/bloc/Header";
import { FooterObject } from "../model/bloc/Footer";
import { MediaObject } from "../model/bloc/MediaObject";

type Row = Record<string, unknown>;

function toMedia(row: Row | null | undefined): MediaObject | undefined {
  if (!row) return undefined;
  return new MediaObject(row);
}

export function mapHeader(row: Row, mode: "view" | "edition") {
  return new HeaderObject(
    {
      ...row,
      logo: toMedia(row.logo as Row),
      favicon: toMedia(row.favicon as Row),
      reseaux: ((row.reseaux as Row[]) ?? []).map((r) => new MediaObject(r)),
    } as never,
    mode,
  );
}

export function mapFooter(row: Row, mode: "view" | "edition") {
  return new FooterObject({ ...row }, mode);
}

export function mapPage(row: Row, mode: "view" | "edition") {
  return new PageObject(row, mode);
}
