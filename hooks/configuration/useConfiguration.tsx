"use client";

import { useEffect, useState } from "react";
import { ConfigurationObject } from "../../database/model/Configuration";
import getConfiguration from "../../app/edition/configuration/callConfiguration";

export default function useConfiguration() {
  const [configuration, setConfiguration] =
    useState<ConfigurationObject | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await getConfiguration();

        if (raw !== null && raw !== undefined) {
          setConfiguration(raw.configuration);
        }
      } catch (e) {
        console.error("[getConfiguration] échec:", e);
      }
    })();
  }, []);

  return { configuration };
}
