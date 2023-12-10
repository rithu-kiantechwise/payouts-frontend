import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const LeaveCalendar = ({ events, onSelectEvent }) => {

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {};

    if (event.status === 'approved') {
      style.backgroundColor = 'green';
    } else if (event.status === 'rejected') {
      style.backgroundColor = 'red';
    } else {
      style.backgroundColor = 'orange';
    }

    return {
      style
    };
  };

  return (
    <div className='mt-10'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        titleAccessor="reason"
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default LeaveCalendar;