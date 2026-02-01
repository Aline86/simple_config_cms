import { Modal } from "./Modal";
import { useState } from "react";
import Image from "next/image";
import { Heart, PlusIcon } from "lucide-react";
import { MediaEditor } from "../contextView/edition/media/Media";
import { MediaObject } from "../../model/bloc/MediaObject";

interface MediaEditorProps<T> {
  socialMedia: T[];
  onChange: (fieldName: string, newValue: any) => void;
  addElement: () => void;
  removeElement: (model: T) => void;
}

export const SocialMediaModal = <T,>({
  socialMedia,
  addElement,
  onChange,
  removeElement,
}: MediaEditorProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="p-10 text-center">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="rounded mb-10 cursor-pointer bg-slate-600 px-4 py-4 text-white text-lg hover:bg-slate-700 transition"
        >
          Gérer les réseaux sociaux affichés sur le site
        </button>

        {socialMedia.map((reseau, id) => {
          return (
            <div key={id} className=" flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200 overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-300 to-slate-400 overflow-hidden">
                    {(reseau as MediaObject)?.image_url !== null ? (
                      <Image
                        className="object-cover"
                        src={(reseau as MediaObject).image_url}
                        alt={(reseau as MediaObject).text_titre}
                        fill
                      />
                    ) : (
                      <></>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors">
                      <Heart className="w-4 h-4 text-slate-700" />
                    </button>
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      Actif
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {(reseau as MediaObject).text_titre}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <Modal open={open} onOpenChange={setOpen}>
          <button
            onClick={addElement}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:bg-slate-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            aria-label="Ajouter une image"
          >
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-90" />
          </button>
          {socialMedia.map((reseau) => {
            return (
              <MediaEditor
                key={(reseau as MediaObject).id}
                socialMedia={reseau as MediaObject}
                onChange={onChange}
                removeElement={removeElement}
              />
            );
          })}
        </Modal>
      </div>
    </div>
  );
};
