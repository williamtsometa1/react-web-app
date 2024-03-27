import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useLight from '@/Hooks/useLight';
import Image from 'next/image';
import { range } from 'lodash';
import ArkControllProgress from '../ArkControllProgress';
import { useAppExampleContext } from '@/Contexts/AppExampleContext';

function LgControllCard({ isVisible, setVisible, device }: any) {
  const [controlValue, setcontrolValue] = useState(0);
  const { lightIntensity, switchLight } = useLight();
  const { state, dispatch } = useAppExampleContext();
  useEffect(() => {
    lightIntensity(device.id, controlValue);
  }, [controlValue]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Image
            src={'/icons/arrow_back_gray.png'}
            alt={'light'}
            width={24}
            height={24}
            className='mb-4 ml-1'
            onClick={() => {
              setVisible();
            }}
          />
          <div // onTap={() => setVisible()}
            className='select-none rounded-2xl bg-[#61605F] p-2'
            style={{
              filter:
                'drop-shadow(3px 3px 4px #A1998D) drop-shadow(-3px -3px 4px #FFF)',
            }}
          >
            <div
              className='h-[310px] w-[600px] rounded-2xl px-6 py-4'
              style={{
                boxShadow:
                  '3px 3px 4px 0px #494846 inset, -3px -3px 4px 0px rgba(161, 153, 141, 0.40) inset',
              }}
            >
              <div className='flex w-full flex-row justify-between'>
                <div className='flex items-center justify-between'>
                  <Image
                    src={'/imgs/light_light.png'}
                    alt={'light'}
                    width={39}
                    height={36}
                    className='mr-2'
                  />
                  <span className='text-lg font-[600] text-[#EDEAE4]'>
                    {/* {device.name} */} 灯(调节控制器改变亮度)
                  </span>
                </div>
                <Image
                  src={
                    state.light[device.id].status
                      ? '/imgs/switchdevice.png'
                      : '/imgs/switchdeviceoff.png'
                  }
                  alt={''}
                  width={90}
                  height={40}
                  onClick={(e) => {
                    e.stopPropagation();
                    switchLight(device.id);
                  }}
                />
              </div>{' '}
              <div className=' flex h-[65%] w-full justify-center '>
                <div className='flex h-[230px] w-[230px] flex-col'>
                  <ArkControllProgress
                    radius={100}
                    lineWidth={7}
                    color='#A1998D'
                    insideColor='#EDEAE4'
                    dotColor='#FD8900'
                    dotWidth={12}
                    percentageOrg={controlValue}
                    setPrecentage={setcontrolValue}
                  />
                  <div className='-mt-[150px] flex select-none flex-col items-center justify-center text-[#fff]'>
                    <span>{controlValue}%</span>
                    <span>亮度</span>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex justify-center'>
                {[1].map((item) => {
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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LgControllCard;
