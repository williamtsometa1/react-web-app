import cloneDeep from 'lodash/cloneDeep';
import { useAppExampleContext } from '@/Contexts/AppExampleContext';

const useLight = () => {
  const { state, dispatch } = useAppExampleContext();

  const switchLight = (
    id: string,
    status?: boolean,
    intensity: number = 30
  ) => {
    const newLight = cloneDeep(state.light);
    if (!newLight[id]) return;
    const stat: boolean = status ?? !newLight[id].status;
    newLight[id].status = stat;
    newLight[id].intensity = stat ? intensity : 0;
    dispatch({
      type: 'setLight',
      payload: newLight,
    });
  };

  const lightIntensity = (id: string, intensity: number = 0) => {
    console.log('intensity', intensity);
    if (intensity === 0) {
      switchLight(id, false);
      return;
    }
    const newLight = cloneDeep(state.light);
    console.log('newLight', newLight[id], id, newLight);
    if (!newLight[id]) {
      return;
    }

    switchLight(id, true, intensity >= 100 ? 100 : intensity);
  };
  return {
    switchLight,
    lightIntensity,
    light: state.light,
  };
};

export default useLight;
