import { NextRequest } from "next/server";
import { getPagesData } from "../../../lib/helpers/api/pages.data";

export async function GET(request: NextRequest) {
 
  const pages = await getPagesData(request);
  console.log("pages", pages);

  return pages;
}