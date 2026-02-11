import ButtonEdit from "../../components/contextView/edition/button/ButtonEdit";
import CarouselEdit from "../../components/contextView/edition/carousel/CarouselEdit";
import TextPicturesContextEdition from "../../components/contextView/edition/editor/TextPicturesContextEdition";
import { PictureEditor } from "../../components/contextView/edition/grid/image_grid/PictureEditor";
import PicturesLinkEdit from "../../components/contextView/edition/grid/image_group/PicturesLinkEdit";
import ScreenEdit from "../../components/contextView/edition/screen/ScreenEdit";
import VideoEdit from "../../components/contextView/edition/video/VideoEdit";
import ButtonView from "../../components/contextView/showcase/button/ButtonView";
import CarouselAutoView from "../../components/contextView/showcase/carousel/automatic/CarouselAutoView";
import CarouselSimple from "../../components/contextView/showcase/carousel/simple/Carousel";
import CarouselThumbnailsView from "../../components/contextView/showcase/carousel/thumbnails/CarouselThumbnailsView";
import TextView from "../../components/contextView/showcase/editor/TextView";
import PicturesLinkView from "../../components/contextView/showcase/grid/picturesLink/PicturesLinkView";
import PicturesGridView from "../../components/contextView/showcase/grid/picturesView/PicturesGridView";
import ScreenView from "../../components/contextView/showcase/screen/ScreenView";
import VideoView from "../../components/contextView/showcase/video/VideoView";
import { BlocObject } from "../../database/model/Bloc";
import { MediaObject } from "../../database/model/bloc/MediaObject";

type MediaEditorProps<T extends MediaObject> = {
  media: MediaObject;
  blocNumber: number;
  onChange: (fieldName: string, newValue: unknown) => void;
  removeElement: (media: T) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  context?: string;
  isLink?: boolean;
  show_debug?: boolean;
};
type BlocEditionProps = {
  bloc: BlocObject;
  onChange: (fieldName: string, value: unknown) => void;
};
type BlocFrontProps = {
  bloc: BlocObject;
};
type BlocComponent = React.FC<BlocEditionProps | MediaEditorProps<MediaObject>>;
type BlocFrontComponent = React.FC<BlocFrontProps>;

type SubGroupRenderType = {
  [key: string]: {
    [key: string]: BlocComponent | boolean;
  };
};
type FrontRenderType = {
  [key: string]: { [key: string]: BlocFrontComponent | null };
};

export const blocksToRender: SubGroupRenderType = {
  CAROUSEL: {
    is_custom: false,
    classique: CarouselEdit,
    miniatures: CarouselEdit,
    automatique: CarouselEdit,
  },
  TEXTE: { is_custom: true, texte: TextPicturesContextEdition },
  IMAGE_GROUPE: {
    is_custom: false,
    image_group: PicturesLinkEdit,
    grid: PicturesLinkEdit,
  },
  BOUTON: { is_custom: false, bouton: ButtonEdit },
  SCREEN: { is_custom: false, screen: ScreenEdit },
  VIDEO: { is_custom: false, video: VideoEdit },
};

export const blocksFrontToRender: FrontRenderType = {
  CAROUSEL: {
    automatique: CarouselAutoView,
    miniatures: CarouselThumbnailsView,
    classique: CarouselSimple,
  },
  TEXTE: { texte: TextView },
  IMAGE_GROUPE: { image_group: PicturesLinkView, grid: PicturesGridView },
  BOUTON: { bouton: ButtonView },
  SCREEN: { screen: ScreenView },
  VIDEO: { video: VideoView },
};
