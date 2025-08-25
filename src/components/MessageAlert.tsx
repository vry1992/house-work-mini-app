import { message } from 'antd';
import { useEffect } from 'react';
import { errorAction, successAction } from '../store/actions';
import { listenerMiddleware } from '../store/listener-middleware';

export const MessageAlert = () => {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const unsubscribeSuccess = listenerMiddleware.startListening({
      actionCreator: successAction,
      effect: (action) => {
        messageApi.open({
          type: 'success',
          content: action.payload.message,
        });
      },
    });

    const unsubscribeError = listenerMiddleware.startListening({
      actionCreator: errorAction,
      effect: (action) => {
        messageApi.open({
          type: 'error',
          content: action.payload.message,
        });
      },
    });

    return () => {
      unsubscribeSuccess();
      unsubscribeError();
    };
  }, []);

  return <>{contextHolder}</>;
};
