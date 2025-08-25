import { api } from '../../../api/api';

export type SaveWorkingHoursPayload = {
  dayOffs?: string[];
  workFrom: string;
  workTo: string;
  minBreakDuration: string;
};

export type EditWorkingHoursPayload = { id: string } & SaveWorkingHoursPayload;

const createWorkingHours = async (payload: SaveWorkingHoursPayload) => {
  await api.post('working-hours/create', payload);
};

const editWorkingHours = async (payload: EditWorkingHoursPayload) => {
  await api.post('working-hours/edit', payload);
};

export const WorkingHoursService = {
  createWorkingHours,
  editWorkingHours,
};
