import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
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

  return {
    state,
    setDay: (day) => {
      setState({ ...state, day });
    },
    bookInterview: (id, interview) => {
      console.log(id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const appointmentDay = findDayOfAppointment(state, id);
      const days = state.days;
      const day = days[appointmentDay];
    
      const promise = axios.put(`/api/appointments/${id}`, appointment);
    
      return promise.then(() => {
        day.spots -= 1;
        setState({ ...state, appointments, days });
      });
    },
    cancelInterview: (id) => {
      console.log(id);
      const appointments = state.appointments;
      const appointment = appointments[id];

      const appointmentDay = findDayOfAppointment(state, id);
      const days = state.days;
      const day = days[appointmentDay];
    
      const promise = axios.delete(`/api/appointments/${id}`, appointment);
    
      return promise.then(() => {
        appointment.interview = null;
        day.spots += 1;
        setState({ ...state, appointments, days });
      });
    }
  }
}

function findDayOfAppointment(state, id) {
  const currentDay = state.days.find(day => day.appointments.includes(id));

  console.log("Current day index:", state.days.indexOf(currentDay));
  return state.days.indexOf(currentDay);
}