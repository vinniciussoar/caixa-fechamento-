"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type Blob = {
  className: string;
  animationClass: string;
  parallax: number;
  delay: number;
};

const blobs: Blob[] = [
  {
    className: "left-[-10%] top-[-15%] h-[55vw] w-[55vw] bg-deep-2/70",
    animationClass: "animate-blob-a",
    parallax: 18,
    delay: 0,
  },
  {
    className: "right-[-15%] top-[5%] h-[48vw] w-[48vw] bg-serenity/40",
    animationClass: "animate-blob-b",
    parallax: -26,
    delay: 0.4,
  },
  {
    className: "left-[10%] bottom-[-20%] h-[42vw] w-[42vw] bg-gold/25",
    animationClass: "animate-blob-c",
    parallax: 14,
    delay: 0.8,
  },
  {
    className: "right-[5%] bottom-[-10%] h-[36vw] w-[36vw] bg-serenity-light/15",
    animationClass: "animate-blob-a",
    parallax: -16,
    delay: 1.2,
  },
];

function ParallaxBlob({
  blob,
  springX,
  springY,
}: {
  blob: Blob;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const x = useTransform(springX, (v) => v * blob.parallax);
  const y = useTransform(springY, (v) => v * blob.parallax);

  return (
    <motion.div
      className={`absolute blur-3xl ${blob.animationClass} ${blob.className}`}
      style={{ x, y, animationDelay: `${blob.delay}s` }}
    />
  );
}

export function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const { scrollYProgress } = useScroll();
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-0" style={{ y: driftY }}>
        {blobs.map((blob, index) => (
          <ParallaxBlob key={index} blob={blob} springX={springX} springY={springY} />
        ))}
      </motion.div>
      <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink" />
      <div className="ambient-glow absolute inset-0" />
    </div>
  );
}
