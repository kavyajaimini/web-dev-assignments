
const auditLogger = store => next => action => {
  if (!action.type.startsWith('audit/') && /add|update|remove|login|logout|switchTenant|queueOffline|flushOffline/i.test(action.type)) {
    store.dispatch({ type: 'audit/log', payload: {
      action: action.type,
      user: store.getState().user?.id,
      meta: action.payload
    }});
  }
  return next(action);
};

export default auditLogger;
