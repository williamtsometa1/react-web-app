import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useLight from '@/Hooks/useLight';
import Image from 'next/image';
import { range } from 'lodash';
import { RadialProgressBar } from '../DragRadialProgressBar';
import HalfCircleRing from '../Ring';

function LgControllCard({ isVisible, setVisible, device }: any) {
  const [controlValue, setcontrolValue] = useState(0);
  const { lightIntensity, light } = useLight();
  useEffect(() => {
    lightIntensity(device.id, controlValue);
  }, [controlValue]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          // onTap={() => setVisible()}
          className='rounded-2xl bg-[#61605F] p-2'
          style={{
            filter:
              'drop-shadow(3px 3px 4px #A1998D) drop-shadow(-3px -3px 4px #FFF)',
          }}
        >
          <motion.div
            className='h-[390px] w-[680px] rounded-2xl px-6 py-4'
            style={{
              boxShadow:
                '3px 3px 4px 0px #494846 inset, -3px -3px 4px 0px rgba(161, 153, 141, 0.40) inset',
            }}
          >
            <div className='flex w-full flex-row justify-between'>
              <div className='flex items-center justify-between'>
                <Image
                  src={'/icons/aq_indoor.png'}
                  alt={'light'}
                  width={39}
                  height={36}
                  className='mr-2'
                />
                <span className='text-lg font-[600] text-[#EDEAE4]'>
                  {device.id}
                </span>
              </div>
              {light[device.id]?.status ? (
                <Image
                  src={'/imgs/switchdevice.png'}
                  alt={''}
                  width={100}
                  height={44}
                />
              ) : (
                <Image
                  src={'/imgs/switchdevice.png'}
                  alt={''}
                  width={100}
                  height={44}
                />
              )}
            </div>{' '}
            <div className='mt-4 flex h-[65%] w-full justify-center '>
              <div className='flex h-[230px] w-[230px] flex-row justify-center'>
                <RadialProgressBar initialAngle={1} />
                {/* <HalfCircleRing
                  width={400}
                  height={200}
                  radius={80}
                  ringWidth={20}
                  roundedEndRadius={10}
                /> */}
                {/* <div className='flex flex-col items-center justify-center bg-blue-400'>
                  <span>65%</span>
                  <span>Brightness</span>
                </div> */}
              </div>
            </div>
            <div className='mt-4 flex justify-center'>
              {range(1, 5).map((item) => {
                return (
                  <Image
                    key={item}
                    src={`/icons/button${item}.png`}
                    width={48}
                    height={48}
                    alt=''
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LgControllCard;
