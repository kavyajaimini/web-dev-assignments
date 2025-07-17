
export default function websocketMock() {
  let listeners = {};
  return {
    on(event, cb) {
      (listeners[event] = listeners[event] || []).push(cb);
    },
    off(event, cb) {
      listeners[event] = (listeners[event]||[]).filter(fn => fn !== cb);
    },
    emit(event, data) {
      (listeners[event]||[]).forEach(fn => fn(data));
    },
    close() {
      listeners = {};
    }
  };
}
