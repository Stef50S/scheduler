import React from "react";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const classNames = require('classnames');

  let dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li
    className={dayClass}
    selected={props.selected}
    onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

const formatSpots = function(spots) {
  let numSpots = "";

  if(spots === 0) {
    numSpots = "no spots remaining";
  } else if (spots === 1) {
    numSpots = "1 spot remaining";
  } else {
    numSpots = spots + " spots remaining";
  }

  return numSpots;
}