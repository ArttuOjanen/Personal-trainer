import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function Calendar() {

    const [training, setTraining] = useState([]);

    useEffect(() => {
        fetchTrainings();
     }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    }

    function renderEventContent(params) {
        return (
          <>
            <b>{params.timeText}</b>
            <i>{params.event.extendedProps.activity + " " + "with" + " " + params.event.extendedProps.customer.firstname + " " + params.event.extendedProps.customer.lastname}</i>
          </>
        )
      }

    return(
        <div>
            <FullCalendar
             plugins={[ dayGridPlugin, timeGridPlugin ]}
             initialView="dayGridMonth"
             events={training}
             headerToolbar = {{
              start: 'today prev,next',
              center: 'title',   
              end: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            eventContent={renderEventContent}
            />
        </div>
    );
}

export default Calendar;