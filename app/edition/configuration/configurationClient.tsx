"use client";

import { useCallback, useEffect, useState } from "react";
import ConfigurationEdit from "../../../components/contextView/edition/configuration/ConfigurationEdit";
import { ConfigurationObject } from "../../../database/model/Configuration";
import ErrorMessage from "../../../components/ui/ErrorMessage";

import NavBarEdition from "../../../components/ui/NavBarEdition";

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

  useEffect(() => {
    setConfiguration(new ConfigurationObject(initialConfiguration ?? {}));
  }, [initialConfiguration]);

  const handleEdit = useCallback((fieldName: string, newValue: unknown) => {
    setConfiguration(
      (prev) => new ConfigurationObject({ ...prev, [fieldName]: newValue }),
    );
  }, []);
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };
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
        <h2 className="text-2xl font-bold">Configuration</h2>

        {showErrorMessage && (
          <ErrorMessage
            message={message}
            setShowErrorMessage={setShowErrorMessage}
            errorMessage={showErrorMessage}
            hasSucceeded={hasSucceeded}
          />
        )}
        <NavBarEdition
          labelAdd="Ajouter un bloc"
          returnButton={true}
          logout={logout}
          handleAdd={undefined}
          setDraggableEnabled={undefined}
          handleSavePages={handleSave}
        />
        <ConfigurationEdit
          onChange={handleEdit}
          bloc={configuration}
          show_debug={false}
        />
      </main>
    </body>
  );
}
