import type { CommonStateType } from '../../../store/types';

export type AppUserType = {
  id: string;
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  photoUrl?: string;
  workingHours?: WorkingHours;
};

export type LoginReponse = {
  user: AppUserType;
  token: { access_token: string };
};

export type AuthState = {
  isAuthenticated: boolean;
  user: AppUserType | null;
  token: null | {
    access_token: string;
  };
} & CommonStateType;

export type WorkingHours = {
  id: string;
  startWorkFrom: string;
  startWorkTo: string;
  minBreakDuration: number;
  dayOffs: DayOff[];
};

export type DayOff = {
  id: string;
  day: number;
};
