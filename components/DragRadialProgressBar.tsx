import { useDraggable } from '@/Hooks/useDraggable';
import * as React from 'react';
import { useEffect } from 'react';

export const RadialProgressBar = ({ initialAngle, onChange }: any) => {
  const [draggbleRef, dx, dy, angle] = useDraggable({
    initialAngle,
  });

  useEffect(() => {
    onChange(Math.round(angle * 100));
  }, [angle]);

  return (
    <div className='relative'>
      <div className='radial-progress-bar'>
        <div className='radial-progress-bar__half radial-progress-bar__half--1' />
        <div
          className='radial-progress-bar__half radial-progress-bar__half--2'
          style={{
            background: angle > 0.5 ? '#EDEAE4' : 'inherit',
            transform: `rotate(${angle > 0.5 ? 360 * angle - 180 : 360 * angle}deg)`,
          }}
        />

        <div className='radial-progress-bar__overlay' />

        <div className='radial-progress-bar__circle'>
          <div
            className='draggable'
            ref={draggbleRef}
            style={{
              transform: `translate(${dx}px, ${dy}px)`,
              zIndex: 9999,
            }}
          />
          {Math.round(angle * 100)}%
        </div>
      </div>
      <div className='absolute -mt-[49px] h-[50px] w-full bg-[#61605F]'></div>
    </div>
  );
};
