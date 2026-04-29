export default function Card({
  color,
  cardRef,
  transitionFinished,
  transX,
  width,
  height,
  updateCard,
  index,
  gap,
  isSm,
}: any) {
  if (transitionFinished) {
    return (
      <div
        className={isSm ? `max-w-[360px]` : ""}
        style={{
          backgroundImage: `url(${color})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: `${width * 2}px`,
          height: `${height * 2}px`,
          flexShrink: 0,
          marginRight: `${gap}px`,
          transition: "transform 0.4s ease-in-out",
          transform: `translateX(${transX}px)`,

          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        ref={cardRef}
      />
    );
  } else {
    return (
      <div
        className={isSm ? `max-w-[360px]` : ""}
        onClick={updateCard}
        ref={cardRef}
        data-value={index}
        style={{
          backgroundImage: `url(${color.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: `${width * 2}px`,
          height: `${height * 2}px`,
          marginRight: `${gap}px`,
          flexShrink: 0,
          cursor: "pointer",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      />
    );
  }
}
