"use client";

import { BlocObject } from "../../../../database/model/Bloc";
import VideoView from "../../showcase/video/VideoView";
import VideoEdit from "./VideoEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";
import useUpdateUI from "../../../../hooks/editor/useUpdateUI";

interface VideoContextEditionProps {
  bloc: BlocObject;
  onChange: (fieldName: string, value: unknown) => void;
}

const VideoContextEdition: React.FC<VideoContextEditionProps> = ({
  bloc,
  onChange,
}: VideoContextEditionProps) => {
  const { handleRemove, handleAdd, onDrop, onDragStart } = useUpdateUI({
    bloc,
    onChange,
  });

  return (
    <EditionDoubleView
      EditComponent={
        <VideoEdit
          bloc={bloc}
          onChange={onChange}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      }
      ViewComponent={<VideoView bloc={bloc} />}
    />
  );
};
export default VideoContextEdition;
