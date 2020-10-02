import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all);
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const promise = axios.put(`/api/appointments/${id}`, appointment);

    return promise.then(setState({ ...state, appointments }));
  }

  function cancelInterview(id) {
    console.log(id);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const promise = axios.delete(`/api/appointments/${id}`, appointment);

    return promise.then(setState({ ...state, appointments }));
  }

  return (
    <main className="layout">
      <section className="sidebar">
        {<>
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </>}
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appointment => {
          const interview = getInterview(state, appointment.interview)
          const interviewers = getInterviewersForDay(state, state.day);
          return <Appointment 
          key={appointment.id}
          {...appointment}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}/>
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
