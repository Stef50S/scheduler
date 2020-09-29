export function getAppointmentsForDay(state, day) {
  const appointments = []; // Store results here
  const availableDays = state.days; // All days saved in state

  if(availableDays.length === 0) {
    return appointments; // Return empty array
  }

  const dayObj = availableDays.find(currentDay => currentDay.name === day);

  if(!dayObj) { // If day provided is not found
    return appointments; 
  }

  const dayAppointments = dayObj.appointments;

  for(let appointmentID of dayAppointments) {
    appointments.push(state.appointments[appointmentID]);
  }

  return appointments;
}

export function getInterview(state, interview) {
  const resultingInterview = {}; // Store result here

  if(!interview) { // No interview booked
    return null;
  }

  const interviewerID = interview.interviewer; // Find the booked interviewer

  resultingInterview["student"] = interview.student;
  resultingInterview["interviewer"] = { // Get interviewer info from state
    id: interviewerID,
    name: state.interviewers[interviewerID].name,
    avatar: state.interviewers[interviewerID].avatar
  };

  return resultingInterview;
}
