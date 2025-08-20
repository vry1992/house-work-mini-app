import {
  type ActionCreator,
  type ActionCreatorsMapObject,
  type AsyncThunk,
} from '@reduxjs/toolkit';

export type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

export type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

export enum StateStatus {
  LOADING,
  SUCCESS,
  ERROR,
}

export type CommonStateType = {
  status: StateStatus;
  error: any;
};
