import React, { useRef, useEffect } from 'react';

interface HalfCircleRingProps {
  width: number;
  height: number;
  radius: number;
  ringWidth: number;
  roundedEndRadius: number;
}

const HalfCircleRing: React.FC<HalfCircleRingProps> = ({
  width,
  height,
  radius,
  ringWidth,
  roundedEndRadius,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);

    // Draw outer circle
    ctx.lineWidth = ringWidth;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw inner circle to create the ring effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - ringWidth, Math.PI, 0, false);
    ctx.stroke();

    // Draw rounded ends
    ctx.beginPath();
    ctx.arc(
      centerX - radius + ringWidth,
      centerY,
      roundedEndRadius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = '#000';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
      centerX + radius - ringWidth,
      centerY,
      roundedEndRadius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [radius, ringWidth, roundedEndRadius]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default HalfCircleRing;
