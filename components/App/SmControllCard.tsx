import { motion } from 'framer-motion';
import Image from 'next/image';
import useLight from '@/Hooks/useLight';
import { useAppExampleContext } from '@/Contexts/AppExampleContext';

function SmControllCard({ isVisible, setVisible, id, device }: any) {
  const { switchLight } = useLight();
  const { state, dispatch } = useAppExampleContext();
  return (
    <motion.div
      className='mr-4 h-[220px] w-[220px] rounded-2xl bg-[#edeae4] px-6 py-8'
      style={{
        boxShadow:
          '3.308px 3.308px 4.686px 0px #A1998D, -3.308px -3.308px 4.686px 0px #FFF',
      }}
      onClick={() => setVisible()}
    >
      <Image
        src={'/imgs/light_dark.png'}
        alt={''}
        width={42}
        height={42}
        className='mb-4'
      />
      <p>{device.name}</p>
      <p>{device.roomName}</p>
      <div className='mt-5'>
        <Image
          src={
            state.light[id].status
              ? '/imgs/switchdevice.png'
              : '/imgs/switchdeviceoff.png'
          }
          alt={''}
          width={80}
          height={32}
          onClick={(e) => {
            e.stopPropagation();
            switchLight(id);
          }}
        />
      </div>
    </motion.div>
  );
}

export default SmControllCard;
