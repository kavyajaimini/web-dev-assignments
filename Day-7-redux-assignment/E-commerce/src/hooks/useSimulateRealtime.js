import { useEffect } from 'react';
import websocketMock from '../utils/websocketMock';
import { useDispatch } from 'react-redux';

export default function useSimulateRealtime() {
  const dispatch = useDispatch();
  useEffect(() => {
    const ws = websocketMock();
    const interval = setInterval(() => {
      const id = Math.floor(Math.random() * 10000) + 1;
      const stock = Math.floor(Math.random() * 1000);
      ws.emit('product-update', { id, stock });
    }, 2000);
    ws.on('product-update', data => {
      dispatch({ type: 'products/updateStock', payload: data });
    });
    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, [dispatch]);
}
