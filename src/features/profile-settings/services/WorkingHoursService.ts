import { api } from '../../../api/api';

type SaveWorkingHoursPayload = {
  dayOff?: string;
  startWorkFrom: string;
  startWorkTo: string;
  minBreakDuration: string;
};

const createWorkingHours = async (payload: SaveWorkingHoursPayload) => {
  await api.post('working-hours/create', payload);
};

export const WorkingHoursService = {
  createWorkingHours,
};
