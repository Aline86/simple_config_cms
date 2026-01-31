import ButtonContextEdition from "../components/contextView/edition/button/ButtonContextEdition";
import CarouselsAutoContextEdition from "../components/contextView/edition/carousel/automatic/CarouselsAutoContextEdition";
import CarouselContextEdition from "../components/contextView/edition/carousel/CarouselContextEdition";
import CarouselsSimpleContextEdition from "../components/contextView/edition/carousel/simple/CarouselsSimpleContextEdition";
import CarouselThumbnailsContextEdition from "../components/contextView/edition/carousel/thumbnails/CarouselThumbnailsContextEdition";
import TextPicturesContextEdition from "../components/contextView/edition/editor/TextPicturesContextEdition";
import ImageGridContextEdition from "../components/contextView/edition/grid/image_grid/ImageGridContextEdition";
import ImageGroupContextEdition from "../components/contextView/edition/grid/image_group/ImageGroupContextEdition";
import PictureGroupContextEdition from "../components/contextView/edition/grid/PictureGroupContextEdition";
import ScreenContextEdition from "../components/contextView/edition/screen/ScreenContextEdition";
import VideoContextEdition from "../components/contextView/edition/video/VideoContextEdition";
import ButtonView from "../components/contextView/showcase/button/ButtonView";
import CarouselAutoView from "../components/contextView/showcase/carousel/automatic/CarouselAutoView";
import CarouselSimple from "../components/contextView/showcase/carousel/simple/Carousel";
import CarouselThumbnailsView from "../components/contextView/showcase/carousel/thumbnails/CarouselThumbnailsView";
import TextView from "../components/contextView/showcase/editor/TextView";
import PicturesLinkView from "../components/contextView/showcase/grid/picturesLink/PicturesLinkView";
import PicturesGridView from "../components/contextView/showcase/grid/picturesView/PicturesGridView";
import ScreenView from "../components/contextView/showcase/screen/ScreenView";
import VideoView from "../components/contextView/showcase/video/VideoView";
import { BlocObject } from "../model/Bloc";
import { TypeBloc } from "../model/Page";

type BlocEditionProps = {
  bloc: BlocObject;
  onChange: (updatedBloc: BlocObject) => void;
};
type BlocFrontProps = {
  bloc: BlocObject;
};
type BlocComponent = React.FC<BlocEditionProps>;
type BlocFrontComponent = React.FC<BlocFrontProps>;
type BlockRendererMap = {
  [key in TypeBloc]: {
    backend: BlocComponent | null;
  };
};
type SubGroupRenderType = {
  [key: string]: {
    backend: BlocComponent | null;
  };
};
type FrontRenderType = {
  [key: string]: { [key: string]: BlocFrontComponent | null };
};

export const blocksToRender: BlockRendererMap = {
  CAROUSEL: {
    backend: CarouselContextEdition,
  },
  TEXTE: { backend: TextPicturesContextEdition },
  IMAGE_GROUPE: { backend: PictureGroupContextEdition },
  BOUTON: { backend: ButtonContextEdition },
  SCREEN: { backend: ScreenContextEdition },
  VIDEO: { backend: VideoContextEdition },
};
export const carouselToRender: SubGroupRenderType = {
  classique: { backend: CarouselsSimpleContextEdition },
  miniatures: { backend: CarouselThumbnailsContextEdition },
  automatique: { backend: CarouselsAutoContextEdition },
};
export const pictureGroupToRender: SubGroupRenderType = {
  image_group: { backend: ImageGroupContextEdition },
  grid: { backend: ImageGridContextEdition },
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
