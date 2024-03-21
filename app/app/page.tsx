'use client';

import RoomModel from '@/components/Model/RoomModel';

import { useState } from 'react';
import { AppMobileProvider } from '@/Contexts/AppExampleContext';
import LgControllCard from '../../components/App/LgLightControllCard';
import SmControllCard from '../../components/App/SmControllCard';
import { useAppExampleContext } from '@/Contexts/AppExampleContext';

function App() {
  const { state, dispatch } = useAppExampleContext();
  const [devices, setdevices] = useState([{ id: 'light1' }, { id: 'light2' }]);
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
      <div className='w-full'>
        <RoomModel />

        {lgCardShowing === '' && (
          <div className='mt-10 flex flex-row justify-center px-20'>
            {devices.map((device) => {
              return (
                <SmControllCard
                  isVisible={lgCardShowing === device.id}
                  setVisible={() => {
                    setVisible(device.id);
                  }}
                  key={device.id}
                />
              );
            })}
          </div>
        )}

        <div className=' mt-10 flex flex-row justify-center px-20'>
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
    </AppMobileProvider>
  );
}

export default App;
