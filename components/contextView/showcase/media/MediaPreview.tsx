"use client";

import { ExternalLink } from "lucide-react";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { Card } from "../../../ui/card";

type MediaPreviewProps = {
  media: MediaObject;
  isLink?: boolean;
};

export function MediaPreview({ media, isLink }: MediaPreviewProps) {
  const hasImage = Boolean(media.image_url);
  const hasLink = Boolean(media.text_image_lien);

  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6 mb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Visualisation du Media Object
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Aperçu en direct de vos modifications
        </p>
      </div>

      <Card className="overflow-hidden">
        {/* Image */}
        <div className="relative aspect-video  dark:bg-slate-800">
          {hasImage ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              {media.image_url}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              Aucune image
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="space-y-2 p-4">
          {media.text_titre && (
            <h3 className="text-lg font-semibold leading-tight text-slate-900 dark:text-slate-50">
              {media.text_titre}
            </h3>
          )}

          {hasLink && (
            <a
              title="Voir le lien"
              href={media.text_image_lien!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-slate-600 hover:underline dark:text-slate-400"
            >
              Voir le lien
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {!media.text_titre && !hasLink && (
            <p className="text-sm text-slate-500">Aucun contenu à afficher</p>
          )}
        </div>
      </Card>

      {/* Debug panel */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-200 dark:bg-slate-900">
        <h3 className="text-sm font-semibold mb-2 text-slate-900 dark:text-slate-50">
          Props reçues (MediaPreview)
        </h3>
        <pre className="text-xs overflow-auto text-slate-900 dark:text-slate-50">
          {JSON.stringify(media, null, 2)}
        </pre>
      </div>
    </section>
  );
}
