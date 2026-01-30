import { MediaObject } from "@/model/bloc/MediaObject";
import { useEffect, useState } from "react";
import BigCard from "./BigCard";
import Card from "./Card";

export default function CarouselContainer({
  medias,
  transitionFinished,
  cardWidth,
  updateCardRef,
  cardRef,
  updateTransitionState,
  updatemedias,
  width,
  gap,
  height,
  setIsClic,
  setCardValue,
  updateCardEnd,
  clic,
  cardValue,
  cardNumber,
  isSm,
}: any) {
  const [trigger, setTrigger] = useState(0);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);

  const [moveBigCard, setMoveBigCard] = useState(0);

  function updateCard(e: React.MouseEvent<HTMLDivElement>) {
    const rawIndex = Number(e.currentTarget.dataset.value);

    const centerIndex = cardNumber;
    const delta = centerIndex - rawIndex;
    const DAMPING = 0.95;
    if (delta !== 0) {
      const shiftCount = Math.abs(delta);
      const bigCardSize = cardWidth * 1.5 + gap;

      setCardValue(shiftCount);
      setIsClic(true);
      setIsLeft(delta > 0);

      setMove(delta * (cardWidth + gap));
      setMoveBigCard(delta * bigCardSize * DAMPING);

      setTrigger((prev) => prev + 1);
      updateTransitionState(true);
    }
  }

  function updateTransitionLeft() {
    const newmedias = [...medias];
    const popItem = newmedias.pop();
    if (popItem !== undefined) {
      newmedias.unshift(popItem);
      updatemedias(newmedias);
    }
  }

  function updateTransitionRight() {
    const newmedias = [...medias];
    const shiftItem = newmedias.shift();
    if (shiftItem !== undefined) {
      newmedias.push(shiftItem);
      updatemedias(newmedias);
    }
  }

  function moveLeft() {
    setMove(-(cardWidth + gap));
    setIsLeft(true);
    setTrigger((prev) => prev + 1);
    updateTransitionState(true);
    setMoveBigCard(-(cardWidth * 1.5 + gap * 1.5));
  }

  function moveRight() {
    setMove(cardWidth + gap);
    setIsLeft(false);
    setTrigger((prev) => prev + 1);
    updateTransitionState(true);
    setMoveBigCard(cardWidth * 1.5 + gap * 1.5);
  }

  useEffect(() => {
    updateCardRef();
  }, [width, height]);
  useEffect(() => {
    if (trigger === 0) return;
    if (!isLeft) {
      updateTransitionLeft();
    } else {
      updateTransitionRight();
    }
  }, [trigger]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: `${height * 1.5}px`,
          width: width * 1.5 + "px",
          margin: "0 auto",
          position: "relative",
          marginBottom: `${gap}px`,
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            width: `${cardWidth * 1.5}px`,
            height: `${height * 2}px`,
            margin: "0 auto",

            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              transform: `translateX(${-((cardWidth * 1.5 + gap) * cardNumber)}px)`,
            }}
          >
            {medias.map((value: MediaObject, index: number) => (
              <BigCard
                key={index}
                index={index}
                color={value}
                cardRef={index === 0 ? cardRef : null}
                transitionFinished={transitionFinished}
                transX={moveBigCard}
                width={cardWidth * 1.5}
                gap={gap}
                height={height * 1.5}
                updateCard={updateCard}
                isLeft={isLeft}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={moveRight}
          disabled={transitionFinished}
          style={{
            padding: !isSm ? "5px 10px" : "10px 20px",
            marginRight: `${gap}px`,
            cursor: transitionFinished ? "not-allowed" : "pointer",
            opacity: transitionFinished ? 0.5 : 1,
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "18px",
          }}
        >
          ←
        </button>

        <div
          style={{
            overflow: "hidden",
            width: `${width * 5 + gap * 2}px`,
            height: `${height}px`,
            position: "relative",
          }}
          onTransitionEnd={() => {
            if (clic && cardValue > 0) updateCardEnd();
            //setMove(0);
            updateTransitionState(false);
          }}
        >
          <div
            style={{
              display: "flex",
              transform: `translateX(${-((cardWidth + gap) * cardNumber)}px)`,
            }}
          >
            {medias.map((value: MediaObject, index: number) => (
              <Card
                key={index}
                index={index}
                color={value}
                cardRef={index === 0 ? cardRef : null}
                transitionFinished={transitionFinished}
                transX={move}
                width={width}
                gap={gap}
                height={height}
                updateCard={updateCard}
              />
            ))}
          </div>
        </div>

        <button
          onClick={moveLeft}
          disabled={transitionFinished}
          style={{
            padding: !isSm ? "5px 10px" : "10px 20px",
            marginLeft: `${gap}px`,
            cursor: transitionFinished ? "not-allowed" : "pointer",
            opacity: transitionFinished ? 0.5 : 1,
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "18px",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
