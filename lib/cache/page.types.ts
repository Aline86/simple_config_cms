// lib/cache/page.types.ts
import { getPageBySlug } from "./page.slug";
import { getPageHeader } from "./page.header";
import { getPageFooter } from "./page.footer";

type PageResult = Awaited<ReturnType<typeof getPageBySlug>>;
type HeaderResult = Awaited<ReturnType<typeof getPageHeader>>;
type FooterResult = Awaited<ReturnType<typeof getPageFooter>>;

export type PageWithRelations = NonNullable<PageResult>;
export type HeaderWithRelations = NonNullable<HeaderResult>;
export type FooterWithRelations = NonNullable<FooterResult>;
