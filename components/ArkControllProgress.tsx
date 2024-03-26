import React, { useRef, useEffect, useState } from 'react';
import ArkControllProgressDrawer from './ArkControllProgressDrawer';
interface CircleDrawerProps {
  radius: number;
  lineWidth: number;
  color: string;
  insideColor: string;
  dotColor: string;
  dotWidth: number;
  percentageOrg: number;
  setPrecentage: Function;
}

const ArkControllProgress: React.FC<CircleDrawerProps> = ({
  radius,
  lineWidth,
  color,
  insideColor,
  dotColor,
  dotWidth,
  percentageOrg = 10,
  setPrecentage = () => {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const [percentage, setpercentage] = useState(0);

  useEffect(() => {
    if (canvasRef.current) {
      const circleDrawer = new ArkControllProgressDrawer(
        canvasRef.current,
        radius,
        lineWidth,
        color,
        insideColor,
        dotColor,
        dotWidth,
        percentageOrg,
        setPrecentage
      );

      return () => {
        // Clean up resources when component unmounts
        // For example: circleDrawer.dispose();
      };
    }
  }, [radius, lineWidth, color, insideColor, dotColor, dotWidth]);

  return <canvas ref={canvasRef} />;
};

export default ArkControllProgress;
