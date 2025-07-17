import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { notify, setOnlineStatus } from '../redux/uiSlice';

export default function useOnlineStatus() {
  const dispatch = useDispatch();

  useEffect(() => {
    const update = () => {
      const isOnline = navigator.onLine;
      dispatch(setOnlineStatus(isOnline));
      dispatch(
        notify({
          message: isOnline
            ? 'You are back online ✅'
            : 'You are offline ❌',
          type: isOnline ? 'success' : 'error',
        })
      );
    };

    update(); 
    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, [dispatch]);
}
