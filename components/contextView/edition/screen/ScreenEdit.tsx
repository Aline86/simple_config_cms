"use client";

import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { EditorProps } from "../../../../lib/helpers/globabProps";
import DebugView from "../_commons/DebugView";
import HeadingComponent from "../_commons/HeadingComponent";
import { PictureEditor } from "../grid/image_grid/PictureEditor";

export default function ScreenEdit({
  bloc,
  onChange,

  removeElement,
  onDragStart,
  onDrop,

  show_debug = false,
}: Readonly<EditorProps>) {
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
      {show_debug ? <DebugView data={bloc} /> : <></>}
    </section>
  );
}
