import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    const promise = props.bookInterview(props.id, interview);
    promise.then(transition(SHOW));
  }

  function remove() {
    transition(DELETING);

    const promise = props.cancelInterview(props.id);
    promise.then(transition(EMPTY));
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
            onSave={(name, interviewer) => save(name, interviewer)}
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
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you want to delete?" 
            onCancel={back}
            onConfirm={remove}
          />
        )}
        {mode === DELETING && <Status message="Deleting" />}
      </div>
    </article>
  );
}