import { useState, useRef, useEffect } from "react";
import { useIsSmScreen } from "../../../../../hooks/screenSize/useIsSmScreen";
import { BlocObject } from "../../../../../model/Bloc";
import { MediaObject } from "../../../../../model/bloc/MediaObject";
import CarouselContainer from "./CarouselContainer";

export default function CarouselThumbnailsView({ bloc }: { bloc: BlocObject }) {
  const [medias, setMedias] = useState<MediaObject[]>([
    ...bloc.image_medias,
    ...bloc.image_medias,
    ...bloc.image_medias,
  ]);

  const debug = false;
  const [transitionFinished, setTransitionFinished] = useState(false);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [clic, setIsClic] = useState(false);
  const [cardValue, setCardValue] = useState(0);
  const isSm = useIsSmScreen();
  const cardNumber = bloc.image_medias.length;
  const width = bloc.number_width ?? 150;
  const height = bloc.number_height ?? 150;
  const gap = bloc.number_gap ?? 30;

  function updateCardEnd() {
    if (medias.length === cardNumber * 3 && cardValue > 0) {
      const copy = [...medias];
      const res = copy.splice(0, cardValue + 1);
      setMedias(copy.concat(res));
      setIsClic(false);
      setCardValue(cardValue + 1);
    }
  }

  function updateCardRef() {
    const w = cardRef.current?.clientWidth;
    if (w) setCardWidth(w);
  }

  function updateTransitionState(state: boolean) {
    setTransitionFinished(state);
  }

  function updatemedias(newmedias: MediaObject[]) {
    setMedias([...newmedias]);
  }
  useEffect(() => {
    updatemedias([
      ...bloc.image_medias,
      ...bloc.image_medias,
      ...bloc.image_medias,
    ]);
  }, [cardNumber, bloc]);
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl text-center font-bold text-slate-800 mb-6">
        {bloc.text_titre}
      </h2>
      {medias && (
        <CarouselContainer
          width={!isSm ? width * 0.5 : width}
          height={!isSm ? height * 0.5 : height}
          gap={gap}
          updatemedias={updatemedias}
          medias={medias}
          transitionFinished={transitionFinished}
          updateTransitionState={updateTransitionState}
          cardWidth={cardWidth}
          updateCardRef={updateCardRef}
          cardRef={cardRef}
          setIsClic={setIsClic}
          setCardValue={setCardValue}
          updateCardEnd={updateCardEnd}
          clic={clic}
          cardValue={cardValue}
          cardNumber={cardNumber}
          isSm={isSm}
        />
      )}

      {debug && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800 dark:border-slate-200 dark:bg-slate-900 dark:text-slate-200">
          <h3 className="mb-2 text-sm font-semibold">
            Props reçues (HeaderEdit)
          </h3>
          <h2 className="mb-2 text-sm font-semibold">
            Nb d'images : {medias.length}
          </h2>
          <pre className="max-h-64 overflow-auto text-xs">
            {JSON.stringify(medias, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}
