"use client";

import useConfiguration from "../../../hooks/configuration/useConfiguration";
import ConfigurationClient from "./configurationClient";

export default function Page() {
  const { configuration } = useConfiguration();
  if (configuration !== undefined) {
    return <ConfigurationClient initialConfiguration={configuration} />;
  } else {
    return <div>Pages non trouvée</div>;
  }
}
