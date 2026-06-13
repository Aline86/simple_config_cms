"use client";

import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { EditorProps } from "../../../../lib/helpers/globabProps";
import DebugView from "../_commons/DebugView";
import HeadingComponent from "../_commons/HeadingComponent";
import { VideoEditor } from "./VideoEditor";

export default function VideoEdit({
  bloc,
  onChange,
  removeElement,
  onDragStart,
  onDrop,
  isLink,
  show_debug = false,
}: EditorProps) {
  return (
    <section className="mx-auto min-w-2xl max-w-2xl space-y-6 p-6 mb-8">
      <HeadingComponent bloc={bloc} onChange={onChange} name={"Vidéo"} />
      <div
        className={
          bloc.image_medias.length === 1
            ? "grid grid-cols-1 "
            : "grid grid-cols-2 gap-6"
        }
      >
        {bloc.image_medias.map((media) => {
          return (
            <VideoEditor
              key={(media as MediaObject).id}
              media={media as MediaObject}
              onChange={onChange}
              removeElement={removeElement}
              onDragStart={onDragStart}
              onDrop={onDrop}
              isLink={isLink}
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
