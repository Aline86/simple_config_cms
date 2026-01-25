import { useEffect, useRef, useState } from "react";
import { MediaObject } from "@/model/bloc/MediaObject";
import { BlocObject } from "@/model/Bloc";
import CarouselContainer from "./CarouselContainer";
import { useIsSmScreen } from "@/hooks/screenSize/useIsSmScreen";

export default function CarouselThumbnailsView({
  width = 300,
  height = 200,
  gap = 20,
  cardNumber = 5,
  bloc,
}: {
  width: number;
  height: number;
  gap: number;
  cardNumber: number;
  bloc: BlocObject;
}) {
  const [colors, setColors] = useState<MediaObject[]>([
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

  function updateCardEnd() {
    if (colors.length === cardNumber * 3 && cardValue > 0) {
      const copy = [...colors];
      const res = copy.splice(0, cardValue + 1);
      setColors(copy.concat(res));
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

  function updateColors(newColors: MediaObject[]) {
    setColors([...newColors]);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl text-center font-bold text-slate-800 mb-6">
        {bloc.text_titre}
      </h2>
      {colors && (
        <CarouselContainer
          width={!isSm ? width * 0.5 : width}
          height={!isSm ? height * 0.5 : height}
          gap={gap}
          updateColors={updateColors}
          colors={colors}
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
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <h3 className="mb-2 text-sm font-semibold">
            Props reçues (HeaderEdit)
          </h3>
          <h2 className="mb-2 text-sm font-semibold">
            Nb d&apos;images : {colors.length}
          </h2>
          <pre className="max-h-64 overflow-auto text-xs">
            {JSON.stringify(colors, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}
