import { BlocObject } from "../../database/model/Bloc";
import { MediaObject } from "../../database/model/bloc/MediaObject";

export interface EditorProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (button: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  isLink: boolean;
  show_debug?: boolean;
}
