'use client';

import RoomModel from '@/components/Model/RoomModel';

import { useState } from 'react';
import { AppMobileProvider } from '@/Contexts/AppExampleContext';
import LgControllCard from '../../components/App/LgLightControllCard';
import SmControllCard from '../../components/App/SmControllCard';
import { useAppExampleContext } from '@/Contexts/AppExampleContext';

function App() {
  const { state, dispatch } = useAppExampleContext();
  const [devices, setdevices] = useState([
    { id: 'light1', name: '灯（点击展示控制面板）', roomName: '书房' },
    // { id: 'light2', name: 'Light 2', roomName: 'Room 2' },
  ]);
  const [lgCardShowing, setlgCardShowing] = useState('');

  const setVisible = (id: string) => {
    if (lgCardShowing !== '') {
      setlgCardShowing('');
    } else {
      setlgCardShowing(id);
    }
  };
  return (
    <AppMobileProvider>
      <div className='h-[100vh] w-full overflow-hidden bg-[#EDEAE4]'>
        <RoomModel />
        <div className='relative -top-[300px] w-full select-none'>
          {lgCardShowing === '' && (
            <div className='flex flex-row justify-center px-20'>
              {devices.map((device) => {
                return (
                  <SmControllCard
                    isVisible={lgCardShowing === device.id}
                    setVisible={() => {
                      setVisible(device.id);
                    }}
                    key={device.id}
                    id={device.id}
                    device={device}
                  />
                );
              })}
            </div>
          )}

          <div className=' -mt-[100px] flex flex-row justify-center px-4'>
            {devices.map((device) => {
              return (
                <LgControllCard
                  isVisible={lgCardShowing === device.id}
                  setVisible={setVisible}
                  key={device.id}
                  device={device}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AppMobileProvider>
  );
}

export default App;
