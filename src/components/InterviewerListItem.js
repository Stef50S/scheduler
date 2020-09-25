import React from "react";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const classNames = require('classnames');

  let interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  });

  return (
    <li 
    className={interviewerClass}
    selected={props.selected}
    onClick={() => props.setInterviewer(props.id)}>
      <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}