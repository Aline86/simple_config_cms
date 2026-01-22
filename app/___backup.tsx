"use client";

import { useEffect, useState } from "react";

import ContainerTest from "@/components/contextView/showcase/ContainerTest";
import { updateObjectBySetter } from "@/lib/utils/functions";
import { MediaObject } from "@/model/bloc/TestMediaObject";

export default function Home() {
  const [media, setMedia] = useState<MediaObject>(
    new MediaObject({
      id: crypto,
      bloc_id: 2,
      titre: "Titre test",
      image_lien: "fefe",
      position_image: 0,
      image_url: "",
    }),
  );

  const updateMediaObject = (fieldName: string, newValue: any) => {
    const newObj = updateObjectBySetter(media, fieldName as string, newValue);
    setMedia(newObj.data);
  };
  useEffect(() => {
    console.log("media", media);
  }, [media]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <ContainerTest mediaObject={media} onChange={updateMediaObject} />
      {/* Debug panel pour voir l'état global */}
      <div className="mx-auto max-w-2xl mt-6 p-6">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-2 text-slate-900">
            État global (Home component)
          </h3>
          <pre className="text-xs overflow-auto bg-slate-50 p-3 rounded">
            {JSON.stringify(media, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
