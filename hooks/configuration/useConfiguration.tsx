"use server";

import { getConfiguration } from "../../lib/cache/configuration";

export default async function useConfiguration() {
  const configuration = await getConfiguration();

  return { configuration };
}
