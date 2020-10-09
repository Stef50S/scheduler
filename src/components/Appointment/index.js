import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    console.log("name, interviewer", name, interviewer);
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    setTimeout(() => { 
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true))
    }, 500);
  }

  function remove() {
    transition(DELETING, true);

    setTimeout(() => { 
      props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true))
    }, 500);
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      <div>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === EDIT && (
          <Form 
            interviewers={props.interviewers}
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === ERROR_SAVE && (
          <Error 
            message="Could not save appointment."
            onClose={back}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you want to delete?" 
            onCancel={back}
            onConfirm={remove}
          />
        )}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === ERROR_DELETE && (
          <Error 
            message="Could not delete appointment."
            onClose={back}
          />
        )}
      </div>
    </article>
  );
}