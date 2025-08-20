import { useCallback, useState, type FC } from 'react';

import {
  Calendar,
  Views as ScheduleViews,
  dateFnsLocalizer,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import ukUA from 'date-fns/locale/uk';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MOCK_EVENTS } from '../../../mocks';
import type { ScheduleEvent } from '../../../types/common';

const messages = {
  date: 'Дата',
  time: 'Час',
  event: 'Подія',
  allDay: 'Весь день',
  week: 'Тиждень',
  work_week: 'Робочий тиждень',
  day: 'День',
  month: 'Місяць',
  previous: 'Назад',
  next: 'Вперед',
  yesterday: 'Вчора',
  tomorrow: 'Завтра',
  today: 'Сьогодні',
  agenda: 'Порядок денний',
  noEventsInRange: 'Немає подій у цьому діапазоні.',
  showMore: (total: number) => `+${total} ще`,
};

const locales = {
  'uk-UA': ukUA,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

console.log(localizer);

const DnDCalendar = withDragAndDrop(Calendar);

type Props = {
  events: ScheduleEvent[];
};

export const Schedule: FC<Props> = ({ events = MOCK_EVENTS }) => {
  const [myEvents, setMyEvents] = useState(events);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay: event.allDay }];
      });
    },
    [setMyEvents]
  );

  return (
    <>
      <DnDCalendar
        defaultView={ScheduleViews.WEEK}
        events={MOCK_EVENTS}
        localizer={localizer}
        onEventDrop={moveEvent}
        resizable
        culture="uk-UA"
        messages={messages}
        style={{ height: '100vh' }}
      />
    </>
  );
};
