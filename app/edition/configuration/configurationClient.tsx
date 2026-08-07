"use client";

import { useCallback, useEffect, useState } from "react";
import ConfigurationEdit from "../../../components/contextView/edition/configuration/ConfigurationEdit";
import { ConfigurationObject } from "../../../database/model/Configuration";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import { useRouter } from "next/navigation";



export default function ConfigurationClient({
  initialConfiguration,
}: {
  initialConfiguration: ConfigurationObject | null;
}) {
  const [configuration, setConfiguration] = useState(
    () => new ConfigurationObject(initialConfiguration ?? {}),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setConfiguration(new ConfigurationObject(initialConfiguration ?? {}));
  }, [initialConfiguration]);

  const handleEdit = useCallback((fieldName: string, newValue: unknown) => {
    setConfiguration(
      (prev) => new ConfigurationObject({ ...prev, [fieldName]: newValue }),
    );
  }, []);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      if (!configuration.validateAll()) {
        throw new Error("Certains champs sont invalides.");
      }

      const res = await fetch("/api/edition/configuration", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: configuration }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Erreur lors de l'enregistrement");
      }

      setConfiguration(new ConfigurationObject(result.configuration));
      setMessage("Configuration enregistrée.");
      setHasSucceeded(true);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'enregistrement",
      );
      setHasSucceeded(false);
    } finally {
      setShowErrorMessage(true);
      setIsSaving(false);
    }
  };

  return (
    <body className="space-y-6 ">
      <main className="space-y-6 p-24">
        <button type="button" onClick={() => router.back()}>
          Retour
        </button>
        <h2 className="text-2xl font-bold">Configuration</h2>

        {showErrorMessage && (
          <ErrorMessage
            message={message}
            setShowErrorMessage={setShowErrorMessage}
            errorMessage={showErrorMessage}
            hasSucceeded={hasSucceeded}
          />
        )}

        <ConfigurationEdit
          onChange={handleEdit}
          bloc={configuration}
          show_debug={false}
        />

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSaving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </main>
    </body>
  );
}
