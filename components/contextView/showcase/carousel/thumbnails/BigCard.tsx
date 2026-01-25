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
  isLeft,
}: any) {
  if (transitionFinished) {
    return (
      <div
        style={{
          backgroundImage: `url(${color})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: `${width}px`,
          height: `${height}px`,
          flexShrink: 0,
          marginRight: `${gap}px`,
          transition: "transform 0.4s ease-in-out",
          transform: `translateX(${isLeft ? 15 + transX : transX - 15}px)`,

          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        ref={cardRef}
      />
    );
  } else {
    return (
      <div
        onClick={updateCard}
        ref={cardRef}
        data-value={index}
        style={{
          backgroundImage: `url(${color.image_image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: `${width}px`,
          height: `${height}px`,
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
