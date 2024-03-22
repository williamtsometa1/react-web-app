import React, { useState, useRef, useEffect } from 'react';

interface SemiCircleProgressBarProps {
  diameter: number;
  strokeWidth: number;
  progressColor: string;
  backgroundColor: string;
}

const SemiCircleProgressBar: React.FC<SemiCircleProgressBarProps> = ({
  diameter,
  strokeWidth,
  progressColor,
  backgroundColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = diameter / 2 - strokeWidth / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = backgroundColor;
    ctx.stroke();

    // Draw progress arc
    const startAngle = Math.PI;
    const endAngle = Math.PI + (progress / 100) * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = progressColor;
    ctx.stroke();
  }, [progress, diameter, strokeWidth, progressColor, backgroundColor]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const dx = x - centerX;
      const dy = y - centerY;

      const angle = Math.atan2(dy, dx);
      let newProgress = (angle / Math.PI) * 100;
      if (newProgress < 0) {
        newProgress += 200;
      }
      if (newProgress > 100) {
        newProgress -= 200;
      }
      setProgress(newProgress);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      width={diameter}
      height={diameter / 2}
      onMouseDown={handleMouseDown}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default SemiCircleProgressBar;
