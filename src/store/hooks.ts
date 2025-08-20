import {
  bindActionCreators,
  type ActionCreatorsMapObject,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import type { BoundActions } from './types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useActionCreators = <
  Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
