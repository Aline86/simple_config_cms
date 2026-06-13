"use client";

import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { EditorProps } from "../../../../lib/helpers/globabProps";
import HeadingComponent from "../_commons/HeadingComponent";
import { PictureEditor } from "../grid/image_grid/PictureEditor";

export default function ScreenEdit({
  bloc,
  onChange,

  removeElement,
  onDragStart,
  onDrop,

  show_debug = false,
}: EditorProps) {
  return (
    <section className="mx-auto w-full min-w-[44vw] space-y-6 p-6 mb-8">
      <HeadingComponent bloc={bloc} onChange={onChange} name={"Ecran"} />
      <div
        className={
          bloc.image_medias.length === 1
            ? "grid grid-cols-1 "
            : "grid grid-cols-2 gap-6"
        }
      >
        {bloc.image_medias.map((media) => {
          return (
            <PictureEditor
              key={(media as MediaObject).id}
              media={media as MediaObject}
              onChange={onChange}
              removeElement={removeElement}
              onDragStart={onDragStart}
              onDrop={onDrop}
              isLink={false}
              blocNumber={bloc.bloc_position}
            />
          );
        })}
      </div>
      {/* Debug panel */}
      {show_debug ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-200 dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-2">
            Props reçues (HeaderEdit)
          </h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(bloc, null, 2)}
          </pre>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
