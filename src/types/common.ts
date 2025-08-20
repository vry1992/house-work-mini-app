import type { Event } from 'react-big-calendar';

export type ScheduleEvent = {
  id: string;
  desc?: string;
} & Event;
