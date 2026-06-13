"use client";

import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import DebugView from "../_commons/DebugView";
import HeadingMediaComponent from "../_commons/HeadingMediaComponent";

interface MediaEditorProps {
  socialMedia: MediaObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  removeElement: (socialMedia: MediaObject) => void;
  isLink?: boolean;
  show_debug?: boolean;
}
export function MediaEditor({ ...props }: MediaEditorProps) {
  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6">
      <HeadingMediaComponent />

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <div
          className="w-full flex justify-end items-center"
          onClick={() => props.removeElement(props.socialMedia)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="space-y-6">
          <FieldRenderer
            label="Nom du réseau social"
            fieldName={`reseaux.${props.socialMedia.number_position_image}.text_titre`}
            model={props.socialMedia as MediaObject}
            setField={props.onChange}
          />
          <FieldRenderer
            label="Lien du réseau social"
            fieldName={`reseaux.${props.socialMedia.number_position_image}.text_image_lien`}
            model={props.socialMedia as MediaObject}
            setField={props.onChange}
          />
          <FieldRenderer
            label="Image associée au réseau social"
            fieldName={`reseaux.${props.socialMedia.number_position_image}.image_url`}
            model={props.socialMedia}
            setField={props.onChange}
          />
        </div>
      </div>

      {/* Debug panel */}
      {props.show_debug ? <DebugView data={props.socialMedia} /> : <></>}
    </section>
  );
}
