// types/page-augmentation.d.ts
import { PageObject } from "@/model/Page";

declare module "@/model/Page" {
  interface PageObject {
    _tmp?: string;
  }
}
