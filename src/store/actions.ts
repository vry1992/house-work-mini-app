import { createAction } from '@reduxjs/toolkit';
import { useActionCreators } from './hooks';

export const successAction = createAction(
  'success',
  function prepare(message: string, title?: string) {
    return {
      payload: {
        title,
        message,
      },
    };
  }
);

export const errorAction = createAction(
  'error',
  function prepare(message: string, title?: string) {
    return {
      payload: {
        title,
        message,
      },
    };
  }
);

const actions = {
  successAction,
  errorAction,
};

export const useCommonActionCreators = () => {
  return useActionCreators(actions);
};
