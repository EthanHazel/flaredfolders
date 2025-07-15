import Image from "next/image";
import { useRef } from "react";

export default function Carousel() {
  const images = [
    "apple",
    "blender",
    "case",
    "cpu",
    "discord",
    "ghost",
    "gift",
    "github",
    "image",
    "leaf",
    "pen",
    "signal",
    "tor",
  ];

  const extendedImages = [...images, ...images, ...images];
  const containerRef = useRef(null);

  return (
    <div id="home-carousel" ref={containerRef}>
      <div className="gradient"></div>
      <div className="inner">
        {extendedImages.map((image, index) => (
          <Image
            key={`${image}-${index}`}
            src={`/home/carousel/${image}.png`}
            alt={image}
            width={64}
            height={64}
          />
        ))}
      </div>
    </div>
  );
}
