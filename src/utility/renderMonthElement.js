import React from "react";
import moment from "moment";

export const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
  let i;
  let years = [];
  for (i = moment().year(); i >= moment().year() - 30; i--) {
    years.push(
      <option value={i} key={`year-${i}`}>
        {i}
      </option>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <select
          value={month.month()}
          onChange={(e) => onMonthSelect(month, e.target.value)}
        >
          {moment.months().map((label, value) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={month.year()}
          onChange={(e) => onYearSelect(month, e.target.value)}
        >
          {years}
        </select>
      </div>
    </div>
  );
};
