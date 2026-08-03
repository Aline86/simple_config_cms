import ButtonEdit from "../../components/contextView/edition/button/ButtonEdit";
import CalendarEdit from "../../components/contextView/edition/calendar/CalendarEdit";
import CarouselEdit from "../../components/contextView/edition/carousel/CarouselEdit";
import TextPicturesContextEdition from "../../components/contextView/edition/editor/TextPicturesContextEdition";
import FooterEdit from "../../components/contextView/edition/footer/FooterEdit";
import PicturesLinkEdit from "../../components/contextView/edition/grid/image_group/PicturesLinkEdit";
import HeaderEdit from "../../components/contextView/edition/header/HeaderEdit";
import ScreenEdit from "../../components/contextView/edition/screen/ScreenEdit";
import VideoEdit from "../../components/contextView/edition/video/VideoEdit";
import ButtonView from "../../components/contextView/showcase/button/ButtonView";
import CalendarView from "../../components/contextView/showcase/calendar/CalendarView";
import CarouselAutoView from "../../components/contextView/showcase/carousel/automatic/CarouselAutoView";
import CarouselSimple from "../../components/contextView/showcase/carousel/simple/Carousel";
import CarouselThumbnailsView from "../../components/contextView/showcase/carousel/thumbnails/CarouselThumbnailsView";
import TextView from "../../components/contextView/showcase/editor/TextView";
import FooterView from "../../components/contextView/showcase/footer/FooterView";
import PicturesLinkView from "../../components/contextView/showcase/grid/picturesLink/PicturesLinkView";
import PicturesGridView from "../../components/contextView/showcase/grid/picturesView/PicturesGridView";
import HeaderView from "../../components/contextView/showcase/header/HeaderView";
import ScreenView from "../../components/contextView/showcase/screen/ScreenView";
import VideoView from "../../components/contextView/showcase/video/VideoView";
import { BlocObject } from "../../database/model/Bloc";
import { FooterObject } from "../../database/model/bloc/Footer";
import { HeaderObject } from "../../database/model/bloc/Header";

// props blocs traditionnels
type BlocEditionProps = {
  bloc: BlocObject | HeaderObject | FooterObject;
  onChange: (fieldName: string, value: unknown) => void;
};

type BlocFrontProps = {
  bloc: BlocObject | HeaderObject | FooterObject;
  editing?: boolean;
};

type BlocComponent = React.FC<BlocEditionProps>;
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
  // retrocompatibility line meant to be rethdrawn in the future (to delete , grid: PicturesGridView)
  IMAGE_GROUPE: {
    is_custom: false,
    image_group: PicturesLinkEdit,

    grid: PicturesLinkEdit,
  },
  IMAGE_GRILLE: {
    is_custom: false,
    grid: PicturesLinkEdit,
  },
  BOUTON: { is_custom: false, bouton: ButtonEdit },
  SCREEN: { is_custom: false, screen: ScreenEdit },
  VIDEO: { is_custom: false, video: VideoEdit },
  HEADER: { is_custom: false, header: HeaderEdit },
  FOOTER: { is_custom: false, footer: FooterEdit },
  CALENDAR: { is_custom: false, calendar: CalendarEdit },
};

export const blocksFrontToRender: FrontRenderType = {
  CAROUSEL: {
    automatique: CarouselAutoView,
    miniatures: CarouselThumbnailsView,
    classique: CarouselSimple,
  },
  TEXTE: { texte: TextView },
  HEADER: { header: HeaderView },
  FOOTER: { footer: FooterView },
  // retrocompatibility line meant to be rethdrawn in the future (to delete , grid: PicturesGridView)
  IMAGE_GROUPE: { image_group: PicturesLinkView, grid: PicturesGridView },
  IMAGE_GRILLE: { grid: PicturesGridView },
  BOUTON: { bouton: ButtonView },
  SCREEN: { screen: ScreenView },
  VIDEO: { video: VideoView },
  CALENDAR: { calendar: CalendarView },
};
