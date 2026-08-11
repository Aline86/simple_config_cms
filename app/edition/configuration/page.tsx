"use client";

import { ConfigurationObject } from "../../../database/model/Configuration";
import { getConfiguration } from "../../../lib/cache/configuration";
import ConfigurationClient from "./configurationClient";

export default async function Page() {
  const configuration = await getConfiguration();
  if (configuration !== undefined) {
    const confObject = new ConfigurationObject(configuration);
    return <ConfigurationClient initialConfiguration={confObject} />;
  } else {
    return <div>Pages non trouvée</div>;
  }
}
