import { motion } from 'framer-motion';
import Image from 'next/image';

function SmControllCard({ isVisible, setVisible }: any) {
  return (
    <motion.div
      className=' mr-4 h-[240px] w-[240px] rounded-2xl bg-[#edeae4] p-4'
      style={{
        boxShadow:
          '3.308px 3.308px 4.686px 0px #A1998D, -3.308px -3.308px 4.686px 0px #FFF',
      }}
      onTap={() => setVisible()}
    >
      <Image src={'/imgs/air_purifier.png'} alt={''} width={48} height={48} />
      <p>Air Purifier</p>
      <p>Outdoor AQI: 200, gas detected</p>
      <div className='mt-8'>
        <Image
          src={'/imgs/switchdevice.png'}
          alt={''}
          width={100}
          height={44}
        />
      </div>
    </motion.div>
  );
}

export default SmControllCard;
