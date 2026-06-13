"use client";

import { BlocObject } from "../../../../database/model/Bloc";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { EditorProps } from "../../../../lib/helpers/globabProps";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import DebugView from "../_commons/DebugView";
import HeadingComponent from "../_commons/HeadingComponent";
import { PictureEditor } from "../grid/image_grid/PictureEditor";

export default function ButtonEdit({
  bloc,
  onChange,
  removeElement,
  onDragStart,
  onDrop,
  isLink,
  show_debug = false,
}: EditorProps) {
  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6 mb-8">
      <HeadingComponent bloc={bloc} onChange={onChange} name={"Bouton"} />
      <FieldRenderer
        fieldName={`blocs.${bloc.bloc_position}.color_background_color`}
        model={bloc as BlocObject}
        setField={onChange}
        label={"Couleur de fond de la carte de redirection"}
      />
      <section
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
              blocNumber={bloc.bloc_position}
              media={media as MediaObject}
              onChange={onChange}
              removeElement={removeElement}
              onDragStart={onDragStart}
              onDrop={onDrop}
              isLink={isLink}
            />
          );
        })}
      </section>

      {/* Debug panel */}
      {show_debug ? <DebugView data={bloc} /> : <></>}
    </section>
  );
}
