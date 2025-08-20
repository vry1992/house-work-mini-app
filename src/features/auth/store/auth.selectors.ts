import { useAppSelector } from '../../../store/hooks';
import { type RootState } from '../../../store/store';

const authSelector = (store: RootState) => store.auth;

export const useAuthSelectors = () => {
  const selectors = useAppSelector(authSelector);

  return selectors;
};
